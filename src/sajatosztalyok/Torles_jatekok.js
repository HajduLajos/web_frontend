import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';


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

    const torles = (szam) => {
        //alert(szam)
        const biztos = window.confirm("Biztosan ki szeretnéd törölni?")
        if (biztos) {
            var bemenet = {
                bevitel1: szam
            }

            fetch(IP.ipcim + "TorlesJatekok", {
                method: "DELETE",
                body: JSON.stringify(bemenet),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            }

            )
                .then(x => x.text())
                .then(y => {
                    alert(y)
                    getMovies()
                });
        }





    }


    return (
        <View style={{ flex: 1, padding: 24 }}>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={({ jatekok_id }) => jatekok_id}
                    renderItem={({ item }) => (
                        <View>
                            <Text>
                                Név:{item.jatekok_nev} Ár:{item.jatekok_ar}
                            </Text>

                            <TouchableOpacity
                                style={styles.kekgomb}
                                onPress={async () => torles(item.jatekok_id)}
                            >
                                <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>Törlés</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}


        </View>
    );
};

const styles = StyleSheet.create({

    kekgomb: {
        alignItems: "center",
        backgroundColor: "blue",
        padding: 10,
        width: 300,
        marginLeft: "auto",
        marginRight: "auto",
    },
    keresgomb: {
        alignItems: "center",
        backgroundColor: "#0d3f8f",
        padding: 10,
        width: 400,
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 30
    }
});
export default App;