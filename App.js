/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';

import Mesa from './src/components/Mesa/Mesa';

export default class App extends Component {

  state = {
    mesas:[{key: 1, numero: 1},{key: 2, numero: 2},{key: 3, numero: 3},{key: 4, numero: 4},{key: 5, numero: 5},{key: 6, numero: 6},{key: 7, numero: 7},{key: 8, numero: 8}],
    value:'Hola'
  }

  inputChangedText = (newText) => {
    this.setState({
      value:newText
    })
  }

  render() {
    const nombre = 'Fausto Fusse';
    return (
      <View style={styles.container}>
        <View style={styles.navbar}> 
            <Text style={styles.nombre}>.</Text>
            <Text style={styles.nombre}>{nombre}</Text>
        </View> 
        <FlatList style={styles.mesas}
          contentContainerStyle={{alignItems:'center'}}
          data={this.state.mesas}
          renderItem={(info) => (
            <Mesa numero={info.item.numero}></Mesa>
          )} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    width:"100%"
  },
  navbar: {
    //height: "20%",
    width:"100%",
    backgroundColor: '#b71c1c',
    padding: 20,
    flexDirection:'row',
    justifyContent:'space-around',
    // ios
    shadowOffset: {width: 0, height: 13}, 
    shadowOpacity: 0.3,
    shadowRadius: 6,
    // android (Android +5.0)
    elevation: 5,
  },
  mesas:{
    width:"100%",
    padding: 10
  },
  nombre:{
    color:'#fff',
    fontSize: 30
  }
});