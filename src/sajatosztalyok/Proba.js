import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, TouchableOpacity, Image } from 'react-native';

const IP = require('./Ipcim')

const App = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getMovies = async () => {
        try {
            const response = await fetch(IP.ipcim + 'PcJatekok');
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMovies();
    }, []);

    return (
        <View style={{ padding: 24, marginTop: -18 }}>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={({ id }) => id}
                    renderItem={({ item }) => (
                        <View key={item.jatekok_id}>
                            <TouchableOpacity >
                                <View style={{ borderWidth: 1, borderColor: 'green', borderRadius: 7, marginBottom: 8 }} >

                                    <Text style={{ padding: 3, margin: 6, fontSize: 24, textAlign: 'left' }}>{item.jatekok_nev} <Text style={{ fontSize: 12, color: 'grey' }}></Text></Text>
                                    <Image source={{ uri: `http://nodejs2.dszcbaross.edu.hu:22003/${item.jatekok_kep}` }} style={{ width: 180, height: 180, marginLeft: 'auto', marginRight: 'auto', borderRadius: 10 }} />
                                    <Text style={{ textAlign: 'center', fontSize: 17 }}>{item.jatekok_ar}FT</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}


        </View>
    );
};

export default App;