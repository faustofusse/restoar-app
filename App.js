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
    getProductos = () => {
      const productos = [{ id: 0, nombre: 'Coca-Cola', cantidad: 2 }, { id: 1, nombre: 'Milanga', cantidad: 23 }, { id: 2, nombre: 'Papas fritas', cantidad: 3 }, { id: 3, nombre: 'Pepsi', cantidad: 6 }, { id: 4, nombre: 'Helado', cantidad: 1 }, { id: 5, nombre: 'Ensalada de frutas', cantidad: 2 }]
      return productos;
    }
    return (
      <View style={styles.container}>
        <NavBar nombre={this.props.nombre} />
        <ListaMesas mesas={this.props.mesas}
          onMesaSeleccionada={this.props.onSelectMesa} />
        <EditarMesa mesa={this.props.mesaSeleccionada}
          terminar={this.props.onDeselectMesa}
          productos={getProductos()}
          onAddProducto={(numero) => console.log('add producto ' + numero)}
          onRemoveProducto={(numero) => console.log('remove producto ' + numero)} />
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