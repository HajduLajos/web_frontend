import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

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
        <View style={{ flex: 1, padding: 24 }}>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={({ jatekok_id }) => jatekok_id}
                    renderItem={({ item }) => (
                        <Text>
                            Név:{item.jatekok_nev} Ár:{item.jatekok_ar}
                        </Text>
                    )}
                />
            )}
        </View>
    );
};

export default App;