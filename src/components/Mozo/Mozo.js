// React
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
// Componentes (React)
import ListaMesas from './ListaMesas/ListaMesas';
import NavBar from './NavBar/NavBar';
import EditarMesa from './EditarMesa/EditarMesa';
// Redux
import { connect } from 'react-redux';
// Importo las acciones a utilizar (Redux)
import { addMesa, selectMesa, deselectMesa, addProducto } from '../../store/actions/index';

class Mozo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // Todos los productos disponibles
      productosTotales: [],
      // Productos de la mesa seleccionada
      productosActuales: [],
    };
    this.handleOnSelectMesa = this.handleOnSelectMesa.bind(this);
    this.getProductosTotales();
  }

  getProductosTotales = () => {
    let productos = [];
    let menu = {};
    menu = this.props.menu;

    // while (Object.getOwnPropertyNames(subobjeto)){
    //   console.o
    // }
    this.state.productosTotales = [{ id: 0, nombre: 'Coca-Cola', cantidad: 2 }, { id: 1, nombre: 'Milanga', cantidad: 23 }, { id: 2, nombre: 'Papas fritas', cantidad: 3 }, { id: 3, nombre: 'Pepsi', cantidad: 6 }, { id: 4, nombre: 'Helado', cantidad: 1 }, { id: 5, nombre: 'Ensalada de frutas', cantidad: 2 }];
  }

  handleOnSelectMesa = (numero) => {
    // let mesa = this.props.mesas.find((value, index, array) => {
    //   return value.numero === this.props.mesaSeleccionada;
    // });
    this.setState({ productosActuales: [{ id: 0, nombre: 'Coca-Cola', cantidad: 2 }, { id: 1, nombre: 'Milanga', cantidad: 23 }, { id: 2, nombre: 'Papas fritas', cantidad: 3 }, { id: 3, nombre: 'Pepsi', cantidad: 6 }, { id: 4, nombre: 'Helado', cantidad: 1 }, { id: 5, nombre: 'Ensalada de frutas', cantidad: 2 }] });
    this.props.onSelectMesa(numero);
  }

  render() {
    return (
      <View style={styles.container}>
        <NavBar nombre={this.props.nombre} />
        <ListaMesas mesas={this.props.mesas}
          onMesaSeleccionada={this.handleOnSelectMesa} />
        <EditarMesa mesa={this.props.mesaSeleccionada}
          terminar={this.props.onDeselectMesa}
          productos={this.state.productosActuales}
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
    menu: state.mozo.menu,
    nombre: state.mozo.nombre,
    mesas: state.mozo.mesas,
    mesaSeleccionada: state.mozo.mesaSeleccionada
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
export default connect(mapStateToProps, mapDispatchToProps)(Mozo);