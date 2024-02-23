// import React, { useEffect, useState } from 'react';
// import { ActivityIndicator, FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';


// const IP = require('./Ipcim')

// const App = () => {
//     const [isLoading, setLoading] = useState(true);
//     const [data, setData] = useState([]);

//     const getMovies = async () => {
//         try {
//             const response = await fetch(IP.ipcim + 'Comment');
//             const json = await response.json();
//             setData(json);
//         } catch (error) {
//             console.error(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         getMovies();
//     }, []);

//     const torles = (szam) => {
//         //alert(szam)
//         const biztos = window.confirm("Biztosan ki szeretnéd törölni?")
//         if (biztos) {
//             var bemenet = {
//                 bevitel1: szam
//             }

//             fetch(IP.ipcim + "TorlesComment", {
//                 method: "DELETE",
//                 body: JSON.stringify(bemenet),
//                 headers: { "Content-type": "application/json; charset=UTF-8" }
//             }

//             )
//                 .then(x => x.text())
//                 .then(y => {
//                     alert(y)
//                     getMovies()
//                 });
//         }





//     }


//     return (
//         <View style={{ flex: 1, padding: 24 }}>
//             {isLoading ? (
//                 <ActivityIndicator />
//             ) : (
//                 <FlatList
//                     data={data}
//                     keyExtractor={({ Comment_id }) => Comment_id}
//                     renderItem={({ item }) => (
//                         <View>
//                             <Text style={{textAlign:'center', fontSize:25, color:'grey',textDecorationLine:'underline'  }}>
//                                 {item.Comment_nev}: 
//                             </Text>
//                             <Text style={{textAlign:'center'}}>
//                                 {item.Comment_szoveg}
//                             </Text>

//                             <TouchableOpacity
//                                 style={{ backgroundColor: 'red', width: 125, borderRadius: 10, marginLeft: 'auto', marginRight: 'auto' }}
//                                 onPress={() => torles(item.Comment_id)}
//                             >
//                                 <Text style={{ color: "white", fontWeight: "bold", fontSize: 25, textAlign: 'center' }}  >Törlés</Text>
//                             </TouchableOpacity>
//                             <View style={{ marginTop: 15, marginBottom: 20, borderColor: 'gray', borderWidth: 1 }}></View>

//                         </View>
//                     )}
//                 />
//             )}


//         </View>
//     );
// };

// const styles = StyleSheet.create({

//     kekgomb: {
//         alignItems: "center",
//         backgroundColor: "blue",
//         padding: 10,
//         width: 300,
//         marginLeft: "auto",
//         marginRight: "auto",
//     },
//     keresgomb: {
//         alignItems: "center",
//         backgroundColor: "#0d3f8f",
//         padding: 10,
//         width: 400,
//         marginLeft: "auto",
//         marginRight: "auto",
//         marginBottom: 30
//     }
// });
// export default App;

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Nav, Navbar, NavDropdown } from "react-bootstrap";



const IP = require('./Ipcim')




const torles_Comment = ({ navigation }) => {
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

    const torles = (szam) => {
        //alert(szam)
        const biztos = window.confirm("Biztosan ki szeretnéd törölni?")
        if (biztos) {
            var bemenet = {
                bevitel1: szam
            }
            fetch(IP.ipcim + "TorlesComment", {
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

    const commentAtiras = () => {
        //alert(szam)
        
            var bemenet = {
                bevitel1: szoveg,
                bevitel2:selectedCommentid,
            }
            fetch(IP.ipcim + "commentAtir", {
                method: "POST",
                body: JSON.stringify(bemenet),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            }

            )
                .then(x => x.text())
                .then(y => {
                    window.location.reload(false);
                });
        
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
                                    <TouchableOpacity
                                        style={{ backgroundColor: 'red', width: 125, borderRadius: 10, marginLeft: 'auto', marginRight: 'auto' }}
                                        onPress={() => torles(item.Comment_id)}
                                    >
                                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 25, textAlign: 'center' }}  >Törlés</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => szerkesztes(item.Comment_id)}><Text style={{color:'blue',textDecorationLine:'underline'}}>Szerkesztés</Text></TouchableOpacity>
                                    {selectedComment && item.Comment_id === selectedCommentid && (
                                        <View>
                                            <TextInput
                                                style={{height:125}}
                                                value={szoveg}
                                                onChangeText={(text) => setSzoveg(text)}
                                                multiline={true}
                                            />
                                            <TouchableOpacity
                                        style={{ backgroundColor: 'green', width: 150, borderRadius: 10, marginLeft: 'auto' ,marginRight:'auto'}}
                                        onPress={() => commentAtiras()}
                                    >
                                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 25, textAlign: 'center' }}  >Szerkesztés</Text>
                                    </TouchableOpacity>

                                        </View>
                                    )}
                                </View>
                            </View>
                        )}
                    />
                )}

            </View>
        );
    };
    export default torles_Comment;