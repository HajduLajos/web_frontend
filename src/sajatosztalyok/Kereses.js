import React from 'react';
import { StyleSheet, FlatList, ActivityIndicator, Text, View, Image, TouchableOpacity, TextInput } from 'react-native-web';

const IP = require('./Ipcim')

export default class FetchExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      szo: "",
      dataSource: []

    }
  }

  szavazat = (szam) => {
    //alert(szam)
    var bemenet = {
      bevitel1: szam
    }

    fetch(IP.ipcim + "szavazatfelvitel", {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    }

    )
      .then(x => x.text())
      .then(y => alert(y));

  }


  componentDidMount() {
    return fetch(IP.ipcim + 'PcJatekok')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function () {

        });

      })
      .catch((error) => {
        console.error(error);
      });
  }

  keres = () => {
    //alert("hello")
    var bemenet = {
      bevitel1: this.state.szo
    }

    fetch(IP.ipcim + "keres", {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    }

    )
      .then(x => x.json())
      .then(y => {
        //alert(JSON.stringify(y))
        this.setState({ dataSource: y })
      }
      );
  }


  render() {

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }
    else
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          {/*--------------------------------------------------------- Találatok */}
          <FlatList
            data={this.state.dataSource}
            renderItem={({ item }) =>

              <View >
                <Text style={{ color: "brown", fontSize: 20, textAlign: "center", marginTop: 15, marginBottom: 5 }}   >{item.jatekok_nev} </Text>
                <Image source={{ uri: `http://nodejs2.dszcbaross.edu.hu:22003/${item.jatekok_kep}` }} style={{ width: 300, height: 300, marginLeft: "auto", marginRight: "auto" }} />

                <TouchableOpacity
                  style={styles.kekgomb}
                  onPress={async () => this.szavazat(item.jatekok_id)}
                >
                  <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}  >Erre szavazok</Text>
                </TouchableOpacity>
              </View>

            }


            keyExtractor={({ jatekok_id }, index) => jatekok_id}
          />
        </View>
      );
  }
}

const styles = StyleSheet.create({

  kekgomb: {
    alignItems: "center",
    backgroundColor: "blue",
    padding: 10,
    width: 300,
    marginLeft: "auto",
    marginRight: "auto",
  }

});