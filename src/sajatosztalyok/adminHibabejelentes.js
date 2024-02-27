import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Nav, Navbar, NavDropdown } from "react-bootstrap";



const IP = require('./Ipcim')




const adminHibabejelntes = ({ navigation }) => {
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
            const response = await fetch(`${IP.ipcim}adminhibajelentes`);
            const json = await response.json();
            setData(json);
            //alert(JSON.stringify(json))
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
            fetch(IP.ipcim + "TorlesHibabejelentes", {
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

            <View style={{ padding: 24, marginTop: -18 }}>
                {isLoading ? (
                    <ActivityIndicator />
                ) : (
                    <FlatList
                        data={data}
                        keyExtractor={({ id }) => id}
                        renderItem={({ item }) => (
                            <View key={item.hibabejelentes_id}>
                                <View style={{ borderWidth: 1, borderColor: 'green', borderRadius: 7, marginBottom: 8 }}>
                                    <Text style={{ padding: 3, margin: 6, fontSize: 24, textAlign: 'left' }}>{item.hibabejelentes_nev} <Text style={{ fontSize: 12, color: 'grey' }}>közzétéve: {item.hibabejelentes_datum.split('T')[0]}</Text></Text>
                                    <Text style={{ textAlign: 'center', fontSize: 17 }}>{item.hibabejelentes_szoveg}</Text>
                                    <TouchableOpacity
                                        style={{ backgroundColor: 'red', width: 125, borderRadius: 10, marginLeft: 'auto', marginRight: 'auto' }}
                                        onPress={() => torles(item.hibabejelentes_id)}
                                    >
                                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 25, textAlign: 'center' }}  >Törlés</Text>
                                    </TouchableOpacity>
                                    
                                </View>
                            </View>
                        )}
                    />
                )}

            </View>
        );
    };
    export default adminHibabejelntes;