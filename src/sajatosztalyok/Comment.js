import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Nav, Navbar, NavDropdown } from "react-bootstrap";



const IP = require('./Ipcim')




const Comment = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [nev, setNev] = useState('');
  const [szoveg, setSzoveg] = useState('');
  const [selectedComment, setSelectedComment] = useState(null);
  const [selectedCommentid, setSelectedCommentid] = useState('');

  const szerkesztes = (id) => {
    const selected = data.find(item => item.Comment_id === id);
    setSelectedComment(selected);
    setSzoveg(selected.Comment_szoveg)
    setSelectedCommentid(id)
  };



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
      {selectedComment === null && isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <View key={item.Comment_id}>
              <View style={{ borderWidth: 1, borderColor: 'green', borderRadius: 7, marginBottom: 8 }}>
                <Text style={{ padding: 3, margin: 6, fontSize: 24, textAlign: 'left' }}>{item.Comment_nev} <Text style={{ fontSize: 12, color: 'grey' }}>közzétéve: {item.Comment_ido.split('T')[0]}</Text></Text>
                <Text style={{ textAlign: 'center', fontSize: 17 }}>{item.Comment_szoveg}</Text>
                
              </View>
            </View>
          )}
        />
      )}

    </View>
  );
};
export default Comment;