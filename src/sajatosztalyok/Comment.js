import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
const IP = require('./Ipcim')



const Comment = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch(`${IP.ipcim}Comment`);
      const json = await response.json();
      setData(json);
      // alert(JSON.stringify(json))
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const commentmegjelen = (nev, szoveg) => {
    Alert.alert(
      `${nev}`,
      `${szoveg}`,
      [
        {
          text: 'Vissza',
          style: 'aa'
        },
      ],
    )
  }

  return (

    <View style={{ padding: 24, marginTop: -18 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <View key={item.Comment_id}>
              <TouchableOpacity onPress={() => commentmegjelen(item.Comment_nev, item.Comment_szoveg)}>
                <View style={{ borderWidth: 1, borderColor: 'green', borderRadius: 7, marginBottom: 8 }} >

                  <Text style={{ padding: 3, margin: 6, fontSize: 24, textAlign: 'left' }}>{item.Comment_nev} <Text style={{ fontSize: 12, color: 'grey' }}>közzétéve: {item.Comment_ido.split('T')[0]}</Text></Text>

                  <Text style={{ textAlign: 'center', fontSize: 17 }}>{item.Comment_szoveg}</Text>

                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      )}


      <TouchableOpacity style={{ textAlign: 'center', backgroundColor: "#06c995", width: 175, height: 45, padding: 8, marginLeft: 86, borderRadius: 5 }} >
        <Text style={{ color: "black", textAlign: "center", fontSize: 18 }}>Hozzászólás</Text>
      </TouchableOpacity>
    </View>

  );
};

export default Comment;