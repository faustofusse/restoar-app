// React
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
// Componentes (React)
import ListaMesas from './src/components/ListaMesas/ListaMesas';
import NavBar from './src/components/NavBar/NavBar';
import EditarMesa from './src/components/EditarMesa/EditarMesa';
// Redux
import { connect } from 'react-redux';
// Importo las acciones a utilizar (Redux)
import { addMesa, selectMesa, deselectMesa, addProducto } from './src/store/actions/index';

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <NavBar nombre={this.props.nombre} />
        <ListaMesas mesas={this.props.mesas}
          onMesaSeleccionada={this.props.onSelectMesa} />
        <EditarMesa mesa={this.props.mesaSeleccionada}
          terminar={this.props.onDeselectMesa} 
          productos={[{id:0, numero:1},{id:1, numero:1},{id:2, numero:1},{id:3, numero:1},{id:4, numero:4},{id:5, numero:4},{id:6, numero:7}]}
          onAddProducto={(numero)=>console.log('add producto '+numero)}
          onRemoveProducto={(numero)=>console.log('remove producto '+numero)}/>
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

const mapStateToProps = state => {
  // Aca van los elementos del state que voy a utilizar en la App (Redux)
  // Van a ser accesibles como propiedades de App
  // state.mesas hace referencia al reducer que lo configure en rootReducer en configureStore.js
  return {
    nombre: state.mesas.nombre,
    mesas: state.mesas.mesas,
    mesaSeleccionada: state.mesas.mesaSeleccionada
  };
}

const mapDispatchToProps = dispatch => {
  // Declaro que acciones voy a usar (Redux)
  return {
    onSelectMesa: (numero) => dispatch(selectMesa(numero)),
    onDeselectMesa: () => dispatch(deselectMesa()),
    onAddMesa: (numero) => dispatch(addMesa(numero)),
    onAddProducto: (numero) => dispatch(addProducto(numero))
  };
}

// Esto conecta a App con Redux:
export default connect(mapStateToProps, mapDispatchToProps)(App);