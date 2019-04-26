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
      agregadosTotales: [],
      // Productos de la mesa seleccionada
      productosActuales: [],
      agregadosActuales: [],
    };
    this.handleOnSelectMesa = this.handleOnSelectMesa.bind(this);
    this.handleOnDeselectMesa = this.handleOnDeselectMesa.bind(this);
    this.getProductosTotales();
  }

  getProductosTotales = () => {
    // Esta funcion extrae todos los productos del objeto menu, que esta en el estado de Redux
    let isObjeto = objeto => !Array.isArray(objeto),
      productos = [],
      agregados = [],
      objetos = [];
    objetos.push(this.props.menu);
    while (objetos.length > 0 && isObjeto(objetos[0])) {
      let valores = Object.values(objetos[0]);
      for (var i = 0; i < valores.length; i++)
        if (isObjeto(valores[i])) 
          objetos.push(valores[i]);
         else 
          for (var j = 0; j<valores[i].length; j++)
            if (valores[i][j].agregado)
              agregados.push(valores[i][j]);
            else
              productos.push(valores[i][j]);
      objetos.shift();
    }
    console.log("Productos totales:"); console.log(productos);
    console.log("Agregados totales:"); console.log(agregados);
    this.state.productosTotales = productos;
    this.state.agregadosTotales = agregados;
  }

  getProductosActuales = (numeroMesa) => {
    // Esta funcion toma los productos de una mesa y los coloca en el state de esta clase
    let productos = [];
    let numeros = this.props.mesas.find((value, index) => {
      return value.numero === numeroMesa;
    }).productos;
    for (var i = 0; i < numeros.length; i++) {
      let producto = this.state.productosTotales.find(value => {
        return value.id === numeros[i];
      });
      console.log(producto);
    }
    return [{ id: 0, nombre: 'Coca-Cola', cantidad: 2 }, { id: 1, nombre: 'Milanga', cantidad: 23 }, { id: 2, nombre: 'Papas fritas', cantidad: 3 }, { id: 3, nombre: 'Pepsi', cantidad: 6 }, { id: 4, nombre: 'Helado', cantidad: 1 }, { id: 5, nombre: 'Ensalada de frutas', cantidad: 2 }];
  }

  handleOnSelectMesa = (numero) => {
    this.setState({ productosActuales: this.getProductosActuales(numero) });
    this.props.onSelectMesa(numero);
  }

  handleOnDeselectMesa = () => {
    this.setState({ productosActuales: null });
    this.props.onDeselectMesa();
  }

  render() {
    return (
      <View style={styles.container}>
        <NavBar nombre={this.props.nombre} />
        <ListaMesas mesas={this.props.mesas}
          onMesaSeleccionada={this.handleOnSelectMesa} />
        <EditarMesa mesa={this.props.mesaSeleccionada}
          terminar={this.handleOnDeselectMesa}
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