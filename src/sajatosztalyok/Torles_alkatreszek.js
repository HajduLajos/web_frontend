import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, TouchableOpacity, Image } from 'react-native';

const IP = require('./Ipcim')

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const letoltPcAdatok = async () => {

    try {
      const response = await fetch(`${IP.ipcim}osszesAlkatresz`);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const frissit = (y) => {
    alert(y)
    letoltPcAdatok()
  }

  const torlespcadat = (id) => {
    var bemenet = {
      bevitel1: id
    }

    fetch(IP.ipcim + "Alkatresztorles", {
      method: "DELETE",
      body: JSON.stringify(bemenet),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    }

    )
      .then(x => x.text())
      .then(y => frissit(y));
  }

  const torles = (id) => {
    //alert(id)
    const biztos = window.confirm("Biztosan törölni szeretnéd az adatot?")
    if (biztos) {
      torlespcadat(id)
    }

  }

  useEffect(() => {
    letoltPcAdatok();

  }, []);

  return (
    <View style={{ flex: 1, padding: -24 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ alkatresz_id }) => alkatresz_id}
          renderItem={({ item }) => (
            <View>
              <Text style={{ textAlign: 'center', fontSize: 25 }}>
                {item.alkatresz_info}
              </Text>
              <Image source={{ uri: `http://nodejs2.dszcbaross.edu.hu:22003/${item.alkatresz_kep}` }} style={{ width: 135, height: 135, marginLeft: 'auto', marginRight: 'auto', borderRadius: 10 }} />

              <TouchableOpacity
                style={{ backgroundColor: 'red', width: 125, borderRadius: 10, marginLeft: 'auto', marginRight: 'auto' }}
                onPress={() => torles(item.alkatresz_id)}
              >
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 25, textAlign: 'center' }}  >Törlés</Text>
              </TouchableOpacity>

              <View style={{ marginTop: 15, marginBottom: 20, borderColor: 'gray', borderWidth: 1 }}></View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default App;