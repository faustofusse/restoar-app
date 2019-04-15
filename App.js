import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import ListaMesas from './src/components/ListaMesas/ListaMesas';
import NavBar from './src/components/NavBar/NavBar';
import EditarMesa from './src/components/EditarMesa/EditarMesa';

export default class App extends Component {

  state = {
    mesas: [{ key: 1, numero: 1 }, { key: 2, numero: 2 }, { key: 3, numero: 3 }, { key: 4, numero: 4 }, { key: 5, numero: 5 }, { key: 6, numero: 6 }, { key: 7, numero: 7 }, { key: 8, numero: 8 }],
    mesaSeleccionada: null
  }

  mesaSeleccionadaHandler = numero => {
    let mesa = null;
    if (numero !== this.state.mesaSeleccionada) mesa = numero;
    this.setState({ mesaSeleccionada: mesa });
  }

  render() {
    const nombre = 'Fausto Fusse';
    return (
      <View style={styles.container}>
        <NavBar nombre={nombre} />
        <ListaMesas mesas={this.state.mesas}
          onMesaSeleccionada={this.mesaSeleccionadaHandler} />
        <EditarMesa mesa={this.state.mesaSeleccionada}
          terminar={() => this.setState({ mesaSeleccionada: null })} />
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
    width: "100%"
  }
});