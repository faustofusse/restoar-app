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
          for (var j = 0; j < valores[i].length; j++)
            if (valores[i][j].agregado)
              agregados.push(valores[i][j]);
            else
              productos.push(valores[i][j]);
      objetos.shift();
    }
    this.state.productosTotales = productos;
    this.state.agregadosTotales = agregados;
  }

  getProductosActuales = (numeroMesa) => {
    // Esta funcion toma los productos de una mesa y los coloca en el state de esta clase
    let productos = [];
    let numeros = this.props.mesas.find((value, index) => value.numero === numeroMesa).productos;
    for (var i = 0; i < numeros.length; i++) {
      let producto = this.state.productosTotales.find(value => value.id === numeros[i].id);
      producto.agregados = [];
      if (numeros[i].add.length) {
        for (var j = 0; j < numeros[i].add.length; j++) {
          let agregado = this.state.agregadosTotales.find(value => value.id === numeros[i].add[j]);
          delete agregado.productos;
          delete agregado.agregado;
          producto.agregados.push(agregado);
        }
      }
      if (productos.includes(producto)) {
        productos[productos.indexOf(producto)].cantidad++;
      } else {
        producto.cantidad = 1;
        productos.push(producto);
      }
    }
    return productos;
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