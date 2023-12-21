import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View, StyleSheet} from 'react-native';

type Human = {
  id: string;
  name: string;
  email: string;
  gender: string;
  status: string;
};

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Human[]>([]);

  const getHuman = async () => {
    try {
      const response = await fetch('https://gorest.co.in/public/v2/users');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHuman();
  }, []);

  return (
    <View style={{flex: 1, padding: 24}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({id}) => id}
          renderItem={({item}) => (
            <View style={styles.box}>
              <Text style={styles.text}>
              ИД - {item.id},
              </Text>
              <Text style={styles.text}>
              ФИО - {item.name}🎄, 
              </Text>
              <Text style={styles.text}>
              Email - {item.email}, 
              </Text>
              <Text style={styles.text}>
              Гендер - {item.gender}, 
              </Text>
              <Text style={styles.text}>
              Статус - {item.status}🎁
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  box:{
   borderRightWidth:1,
   borderBottomWidth:1.8,
   borderColor:'darkblue',
   padding:8,
  },
  text:{
    flexWrap:'wrap',
  }
})
export default App;