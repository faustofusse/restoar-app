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
import { addMesa, selectMesa, deselectMesa, addProducto, removeProducto, setMenu } from '../../actions/index';

class Mozo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      url: 'http://restoar.com.ar/api/',
      menu: null,
      productosActuales: [],
      agregarProducto: false, agregarMesa: false,
      inputAgregarMesa: ''
    };
    this.handleOnSelectMesa = this.handleOnSelectMesa.bind(this);
    this.handleOnDeselectMesa = this.handleOnDeselectMesa.bind(this);
    this.handleOnAddProducto = this.handleOnAddProducto.bind(this);
    this.handleOnRemoveProducto = this.handleOnRemoveProducto.bind(this);
    this.actualizarProductosActuales = this.actualizarProductosActuales.bind(this);
  }

  componentDidMount = () => this.setMenu();

  async setMenu() {
    this.setState({ loading: true })
    return await fetch(this.state.url + 'menu')
      .then(res => res.json())
      .catch(error => console.error('Error: ', error))
      .then(res => {
        let menu = {
          agregados: res.agregados,
          categorias: res.categorias,
          opciones: res.opciones,
          productos: res.productos,
        }
        this.setState({ menu: menu, loading: false });
        this.props.onSetMenu(menu);
      });
  }

  getProductosActuales = (mesa) => {
    let productos = [],
      IDs = this.props.mesas.find((value) => value._id === mesa).productos;
    console.log(IDs);
    for (var i = 0; i < IDs.length; i++) {
      let producto = this.state.menu.productos.find((value) => value._id === IDs[i]._id);
      producto.agregado = IDs[i].agregado;
      producto.agregadoNombre = IDs[i].agregado === null ? null : this.props.menu.opciones.find(value => value._id === IDs[i].agregado).nombre;
      delete producto.codigo; delete producto.categoria;
      if (productos.indexOf(producto) === -1) {
        producto.cantidad = 1;
        productos.push(producto);
      } else { productos[productos.indexOf(producto)].cantidad++; }
    }
    return productos;
  }

  handleOnSelectMesa = (id) => {
    this.setState({ productosActuales: this.getProductosActuales(id) });
    this.props.onSelectMesa(id);
  }

  handleOnDeselectMesa = () => {
    this.setState({ productosActuales: null });
    this.props.onDeselectMesa();
  }

  handleOnAddProducto = (producto) => {
    let productoFinal = typeof producto === "object" ? producto : this.getProductoById(producto);
    this.props.onAddProducto(productoFinal);
    this.actualizarProductosActuales();
  }

  handleOnRemoveProducto = (id) => {
    this.props.onRemoveProducto(this.getProductoById(id));
    this.actualizarProductosActuales();
  }

  actualizarProductosActuales = () => this.setState({ productosActuales: this.getProductosActuales(this.props.mesaSeleccionada) });

  getProductoById = (id) => {
    let productoActual = this.state.productosActuales.find(value => value._id === id);
    console.log(productoActual);
    return {
      _id: productoActual._id,
      agregado: productoActual.agregado
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading ?
          <ActivityIndicator size="large" color="ff0000" />
          : <View style={{ width: "100%" }}>
            <View style={styles.mesas}>
              <FlatList data={this.props.mesas}
                keyExtractor={item => item._id}
                renderItem={(info) => (
                  <Mesa numero={info.item.numero}
                    onPress={() => this.handleOnSelectMesa(info.item._id)}>
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
    onSetMenu: (menu) => dispatch(setMenu(menu)),
    onSelectMesa: (numero) => dispatch(selectMesa(numero)),
    onDeselectMesa: () => dispatch(deselectMesa()),
    onAddMesa: (numero) => dispatch(addMesa(numero)),
    onAddProducto: (producto) => dispatch(addProducto(producto)),
    onRemoveProducto: (producto) => dispatch(removeProducto(producto))
  };
}

// Esto conecta a App con Redux, y la exporta:
export default connect(mapStateToProps, mapDispatchToProps)(Mozo);