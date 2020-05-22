import React, { Component } from "react";
// Components
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import ProductsList from "../../components/Restaurant/Lists/ProductsList";
import InputModal from "../../components/Restaurant/Modals/InputModal";
// Styles
import { DARK_PRIMARY, ACCENT, FONT_COLOR_WHITE } from "../../styles/colors";
// Redux
import { connect } from "react-redux";
import { socket } from '../../services/socket';
import { addOrder } from "../../redux/actions";

const { width: WIDTH } = Dimensions.get('window')

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: this.props.navigation.getParam("order"),
      menu: this.props.restaurants.find(r => r._id === this.props.active).menu,
      category: null, addProductInput: false
    };
    if (this.state.order === null) this.state.order = { products: [], state: "NEW" };
    this.state.order.restaurant = this.props.active;
    this.acceptInput = this.acceptInput.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
    this.sendOrder = this.sendOrder.bind(this);
  }

  acceptInput(text) {
    let products = [].concat(this.state.order.products);
    for (let i = 0; i < this.state.menu.products.length; i++) {
      let product = this.state.menu.products[i];
      if (parseInt(product.code) === parseInt(text)) {
        let repeated = products.find(p => p._id === product._id);
        product.quantity = 1;
        if (repeated) repeated.quantity++;
        else products.push(this.state.menu.products[i]);
        break;
      }
    }
    let order = this.state.order;
    order.products = products;
    this.setState({ order });
  }

  addProduct(id) {
    let products = [].concat(this.state.order.products);
    for (let i = 0; i < products.length; i++)
      if (products[i]._id === id) products[i].quantity++;
    let order = this.state.order;
    order.products = products;
    this.setState({ order });
  }

  removeProduct(id) {
    let order = this.state.order;
    order.products.map(p => {
      if (p._id === id) p.quantity--;
    });
    order.products = order.products.filter(p => p.quantity > 0);
    this.setState({ order });
  }

  sendOrder(){
    let newOrder = {
      restaurant: this.props.active, waiter: this.props.user._id,
      historyStatus: [{type: 'NEW'}],
      table: this.props.navigation.getParam("table"),
    }
    if (this.state.order.products.length == 0) return;
    let products = [];
    for (let i = 0; i<this.state.order.products.length; i++)
      products.push({_id: this.state.order.products[i]._id, quantity: this.state.order.products[i].quantity})
    newOrder.products = products;
    socket.emit('new-order', newOrder);
    // this.props.onAddOrder(this.props.active, newOrder);
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.order.products.length > 0 ? (
          <ProductsList
          products={this.state.order.products}
          onAddProduct={this.addProduct}
          onRemoveProduct={this.removeProduct}
        />
        ) : (<Text style={{marginBottom: 50, textAlign: 'center'}}>No hay productos.</Text>)}
        

        <InputModal
          visible={this.state.addProductInput}
          close={() => this.setState({ addProductInput: false })}
          accept={this.acceptInput}
          title={"Agregar Producto"}
        />

        {(this.props.navigation.getParam("order") == null) ? (
          <TouchableOpacity style={styles.sendOrder} onPress={this.sendOrder} >
            <Text style={styles.sendOrderText}>ENVIAR PEDIDO</Text>
            
          </TouchableOpacity>
        ) : null}
          <FloatingAction
              visible={this.props.navigation.getParam("order") === null}
              iconWidth={30}  iconHeight={30} actions={actions}
              overrideWithAction distanceToEdge={15} color={DARK_PRIMARY}
              onPressItem={() => this.setState({ addProductInput: true })}
            />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch"
  },
  sendOrder: {
    position: "absolute",
    width: WIDTH - 80,
    padding: 7,
    paddingLeft: 20,
    backgroundColor: ACCENT,
    // left: 15,
    bottom: 15,
    marginBottom: 8,
    // borderRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    display: "flex",
    justifyContent: "center",
    // ios
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    // android (Android +5.0)
    elevation: 2,
  },
  sendOrderText: {
    fontSize: 18,
    color: FONT_COLOR_WHITE
  }
});

const actions = [
  {
    text: "Agregar Producto",
    icon: require("../../assets/add-white.png"),
    name: "bt_newProduct",
    position: 1
  }
];

const mapStateToProps = state => {
  return {
    restaurants: state.restaurants.restaurants,
    active: state.restaurants.active,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
      onAddOrder: (id, orders) => dispatch(addOrder(id, orders)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
