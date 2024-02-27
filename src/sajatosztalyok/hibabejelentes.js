
import React, {useEffect, useState } from 'react';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Link , useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const IP = require('./Ipcim')

const Hibabejelentes = ({  }) => {
    const history = useHistory();

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var datum = year + '-' + month + '-' + date;
    const [nev, setNev] = useState('');
    const [szoveg, setSzoveg] = useState('');

    useEffect(() => {
        
    }, [datum],)
//hibajelentes
    const bejelentes=()=>{
        if(szoveg!="" && nev!=""){
            var bemenet = {
                bevitel1: nev,
                bevitel2:szoveg,
                bevitel3:datum,
            }
            fetch(IP.ipcim + "hibajelentes", {
                method: "POST",
                body: JSON.stringify(bemenet),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            }

            )
                .then(x => x.text())
                .then(y => {
                    alert(y)
                    history.push('/');
                    
                });
        }
        else{
            alert("Kérem az összes mezőt töltse ki!")
        }
    }



    return (

        <View style={{ padding: 24, marginTop: -18 }}>
            <Text style={{ color: 'grey' }}>Név:</Text>
            <TextInput
                style={{ height: 30, backgroundColor: "#e0eeff" }}
                value={nev}
                onChangeText={(text) => setNev(text)}
                multiline={false}
            />

            <Text style={{ color: 'grey' }}>Hibabejelentés szövege:</Text>
            <TextInput
                style={{ height: 175 ,backgroundColor:'#e0eeff'}}
                value={szoveg}
                onChangeText={(text) => setSzoveg(text)}
                multiline={true}
            />
            <TouchableOpacity
                style={{ backgroundColor: 'green', width: 200,height:50, borderRadius: 10, marginLeft: 'auto', marginRight: 'auto' }}
                onPress={() => bejelentes()}
            >
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 25, textAlign: 'center',marginTop:'2%' }}  >Hibabejelentés</Text>
            </TouchableOpacity>



        </View>
    );
};
export default Hibabejelentes;