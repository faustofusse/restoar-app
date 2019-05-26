// React
import React, { Component } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
// Componentes (React)
import EditarMesa from './EditarMesa/EditarMesa';
import Mesa from './Mesa/Mesa';
import { FloatingAction } from 'react-native-floating-action';
import InputModal from './InputModal/InputModal';
// Resources
import { BACKGROUND, BLUE, DARK_PRIMARY } from '../../resources/colors';
// Redux
import { connect } from 'react-redux';
// Importo las acciones a utilizar (Redux)
import { addMesa, selectMesa, deselectMesa, addProducto, removeProducto } from '../../actions/index';

class Mozo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loadingProductos: false,
      loadingAgregados: false,
      loadingOpciones: false,
      loadingCategorias: false,
      url: 'http://restoar.com.ar/api/',
      productos: [], agregados: [], opciones: [],
      productosActuales: [],
      agregarProducto: false, agregarMesa: false,
      inputAgregarMesa: ''
    };

    this.handleOnSelectMesa = this.handleOnSelectMesa.bind(this);
    this.handleOnDeselectMesa = this.handleOnDeselectMesa.bind(this);
    this.handleOnAddProducto = this.handleOnAddProducto.bind(this);
    this.handleOnRemoveProducto = this.handleOnRemoveProducto.bind(this);
    // this.setProductosTotales(this.getMenu());
    
  }

  componentDidMount = () => {
    this.getProductos();
    this.getAgregados();
    this.getCategorias();
    this.getOpciones();
  }

  getMenu = () => {

    return this.props.menu;
  }

  async getProductos() {
    this.setState({
      loadingProductos: true
    });
    return await fetch(this.state.url + 'productos')
      .then(res => res.json())
      .catch(error => console.error('Error: ', error))
      .then(res => {
        this.setState({
          productos: res.productos,
          loadingProductos: false
        });
      });
  }

  async getCategorias() {
    this.setState({ loadingCategorias: true })
    return await fetch(this.state.url + 'categorias')
      .then(res => res.json())
      .catch(error => console.error('Error: ', error))
      .then(res => {
        console.log(res.categorias);
        this.setState({
          categorias: res.categorias,
          loadingCategorias: false
        });
      });
  }

  async getOpciones() {
    this.setState({ loadingOpciones: true })
    return await fetch(this.state.url + 'opciones')
      .then(res => res.json())
      .catch(error => console.error('Error: ', error))
      .then(res => {
        console.log(res.opciones);
        this.setState({
          opciones: res.opciones,
          loadingOpciones: false
        });
      });
  }

  async getAgregados() {
    this.setState({ loadingAgregados: true })
    return await fetch(this.state.url + 'agregados')
      .then(res => res.json())
      .catch(error => console.error('Error: ', error))
      .then(res => {
        console.log(res.agregados);
        this.setState({
          agregados: res.agregados,
          // loading: false
          loadingAgregados: false
        });
      });
  }

  setProductosTotales = (menu) => {
    let productos = [],
      agregados = Object.values(menu["Agregados"]),
      opciones = Object.values(menu["Opciones"]),
      tipos = Object.keys(menu);
    for (var b = 0; b < tipos.length; b++) {
      if (tipos[b] === "Opciones" || tipos[b] === "Agregados") continue;
      let valores = Object.values(menu[tipos[b]]);
      let nombres = Object.keys(menu[tipos[b]]);
      for (var i = 0; i < valores.length; i++)
        for (var j = 0; j < valores[i].length; j++)
          productos.push(valores[i][j]);
    }
    this.state.productos = productos;
    this.state.agregados = agregados;
    this.state.opciones = opciones;
  }

  getProductosActuales = (mesa) => {
    let productos = [],
      IDs = this.props.mesas.find((value) => value.numero === mesa).productos;
    for (var i = 0; i < IDs.length; i++) {
      let producto = this.state.productos.find((value) => value._id === IDs[i]._id);
      for (var j = 0; j < IDs[i].agregados.length; j++)
        producto.agregados.push({
          _id: IDs[i].agregados[j],
          nombre: this.state.opciones.find((value) => value._id === IDs[i].agregados[j]).nombre
        });
      delete producto.codigo;
      producto.cantidad = 1;
      if (productos.indexOf(producto) === -1)
        productos.push(producto);
      else
        productos[productos.indexOf(producto)].cantidad++;
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
      agregados.push(productoActual.agregados[i].codigo);
    return {
      id: productoActual.codigo,
      agregados: agregados
    }
  }

  render() {
    return (
      <View style={styles.container}>
         {this.state.loadingProductos && this.state.loadingAgregados && this.state.loadingCategorias && this.state.loadingOpciones? 
          <ActivityIndicator size="large" color="ff0000" />
         : <View style={{width:"100%"}}>
        <View style={styles.mesas}>
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

        <InputModal visible={this.state.agregarMesa} titulo={"Agregar Mesa"}
          cerrar={() => this.setState({ agregarMesa: false })}
          aceptar={() => this.props.onAddMesa(this.state.inputAgregarMesa)}
          onChangeText={(value) => this.setState({ inputAgregarMesa: value })} />

        <FloatingAction
          actions={[{
            text: 'Agregar Mesa',
            icon: require('../../assets/plus-solid.svg'),
            name: 'bt_addMesa',
            position: 1
          }]}
          overrideWithAction distanceToEdge={15} color={DARK_PRIMARY}
          onPressItem={() => this.setState({ agregarMesa: true })}
        />
        </View>}
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
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  mesas: {
    width: "100%",
    padding: 10
  }
});

// const actions = [{
//   text: 'Accessibility',
//   icon: require('../../assets/plus-solid.svg'),
//   name: 'bt_accessibility',
//   position: 2
// }, {
//   text: 'Language',
//   icon: require('../../assets/plus-solid.svg'),
//   name: 'bt_language',
//   position: 1
// }, {
//   text: 'Location',
//   icon: require('../../assets/plus-solid.svg'),
//   name: 'bt_room',
//   position: 3
// }, {
//   text: 'Video',
//   icon: require('../../assets/plus-solid.svg'),
//   name: 'bt_videocam',
//   position: 4
// }];

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
  // state.mozo hace referencia al reducer que lo configure en rootReducer en configureStore.js
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