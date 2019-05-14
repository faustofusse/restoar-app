// React
import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
// Componentes (React)
import NavBar from './NavBar/NavBar';
import EditarMesa from './EditarMesa/EditarMesa';
import Mesa from './Mesa/Mesa';
// Resources
import { BACKGROUND, BLUE } from '../../resources/colors';
import imagen from '../../assets/pinguino.jpg'
// Redux
import { connect } from 'react-redux';
// Importo las acciones a utilizar (Redux)
import { addMesa, selectMesa, deselectMesa, addProducto, removeProducto } from '../../actions/index';
import Opciones from './Opciones/Opciones';

class Mozo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // Todos los productos disponibles
      productosTotales: [],
      agregadosTotales: [],
      // Productos de la mesa seleccionada
      productosActuales: [],
      agregarProducto: false,
      opciones: false
    };
    this.handleOnSelectMesa = this.handleOnSelectMesa.bind(this);
    this.handleOnDeselectMesa = this.handleOnDeselectMesa.bind(this);
    this.handleOnAddProducto = this.handleOnAddProducto.bind(this);
    this.handleOnRemoveProducto = this.handleOnRemoveProducto.bind(this);
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
    // Esta funcion devuelve los productos de la mesa seleccionada
    let productos = [];
    let numeros = this.props.mesas.find((value, index) => value.numero === numeroMesa).productos;
    for (var i = 0; i < numeros.length; i++) {
      let agregados = numeros[i].add,
        id = numeros[i].id,
        index = productos.findIndex(value => value.id === id && agregados.esIgualA(value.agregados));
      if (index !== -1) { productos[index].cantidad++; continue; }
      let producto = {
        key: i,
        id: id,
        nombre: this.state.productosTotales.find(value => value.id === id).nombre,
        agregados: agregados,
        cantidad: 1
      }
      productos.push(producto);
    }
    productos.setAgregados(this.state.agregadosTotales);
    productos.sort((a, b) => { return a.id - b.id });
    console.log(productos);
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

  handleOnAddProducto = (producto) => {
    let productoFinal = typeof producto === "object" ? producto : this.getProductoFromKey(producto);
    this.props.onAddProducto(productoFinal);
    this.setState({ productosActuales: this.getProductosActuales(this.props.mesaSeleccionada) });
  }

  handleOnRemoveProducto = (key) => {
    this.props.onRemoveProducto(this.getProductoFromKey(key));
    this.setState({ productosActuales: this.getProductosActuales(this.props.mesaSeleccionada) });
  }

  getProductoFromKey = (key) => {
    let productoActual = this.state.productosActuales.find(value => value.key === key);
    let agregados = [];
    for (var i = 0; i < productoActual.agregados.length; i++)
      agregados.push(productoActual.agregados[i].id);
    return {
      id: productoActual.id,
      add: agregados
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {/*<NavBar imagen={imagen} titulo={this.props.nombre} />*/}
        <View style={styles.mesas}>
          {/* <Button title='Opciones' onPress={() => this.setState({ opciones: true })} /> */}
          <FlatList data={this.props.mesas}
            keyExtractor={item => item.numero.toString()}
            renderItem={(info) => (
              <Mesa numero={info.item.numero}
                onPress={() => this.handleOnSelectMesa(info.item.numero)}>
              </Mesa>
            )} />
        </View>
        <EditarMesa mesa={this.props.mesaSeleccionada}
          terminar={this.handleOnDeselectMesa}
          productos={this.state.productosActuales}
          onAddProducto={this.handleOnAddProducto}
          onRemoveProducto={this.handleOnRemoveProducto}
          agregarProductoModal={this.state.agregarProducto}
          cambiarModalAgregarProducto={(value) => this.setState({ agregarProducto: value })} />
        {/* <Opciones visible={this.state.opciones} cerrar={() => this.setState({ opciones: false })}
          titulo="Opciones" items={[{
            id: 0, titulo: "Perfil", icono: 'plus', funcion: () => alert("Perfil")},{
            id: 1, titulo: "Tema", icono: null, funcion: () => alert("Perfil")},{
            id: 2, titulo: "Baston", icono: null, funcion: () => alert("Perfil")},{
            id: 3, titulo: "Asincronico", icono: null, funcion: () => alert("Perfil")},{
            id: 4, titulo: "Hola", icono: null, funcion: () => alert("Perfil")},{
            id: 5, titulo: "Logout", icono: null, funcion: () => alert("Perfil")
          }]} /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: BACKGROUND,
    width: "100%"
  },
  mesas: {
    width: "100%",
    padding: 10
  }
});

Array.prototype.esIgualA = function (array) {
  if (array.length !== this.length) return false;
  array.sort(); this.sort();
  for (var i = 0; i < this.length; i++)
    if (this[i] !== array[i]) return false;
  return true;
}

Array.prototype.setAgregados = function (objetos) {
  for (var i = 0; i < this.length; i++) {
    let agregados = [];
    for (var j = 0; j < this[i].agregados.length; j++)
      agregados.push({
        id: this[i].agregados[j],
        nombre: objetos.find(value => value.id === this[i].agregados[j]).nombre
      });
    this[i].agregados = agregados;
  }
}

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
    onAddProducto: (producto) => dispatch(addProducto(producto)),
    onRemoveProducto: (producto) => dispatch(removeProducto(producto))
  };
}

// Esto conecta a App con Redux, y la exporta:
export default connect(mapStateToProps, mapDispatchToProps)(Mozo);