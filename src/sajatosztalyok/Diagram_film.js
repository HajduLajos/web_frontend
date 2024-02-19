import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import Plot from 'react-plotly.js';

const IP = require('./Ipcim')

const App = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [datacim, setDatacim] = useState([]);
    const [datadarabszam, setDatadarabszam] = useState([]);

    const getMovies = async () => {
        try {
            const response = await fetch(IP.ipcim + 'Diagram');
            const json = await response.json();
            setData(json);
            for (let elem of json) {
                datacim.push(elem.jatekok_nev)
                datadarabszam.push(elem.darabszam)
            }
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
            <Plot
                data={[

                    {
                        type: 'bar',
                        x: datacim,
                        y: datadarabszam
                    },
                ]}
                layout={{ width: 1200, height: 500, title: 'Játékokra való szavazás' }}
            />

            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={({ jatekok_id }) => jatekok_id}
                    renderItem={({ item }) => (
                        <Text>
                            {/* {item.jatekok_nev}: {item.darabszam} */}
                        </Text>
                    )}
                />
            )}
        </View>
    );
};

export default App;