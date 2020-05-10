import React, { Component } from "react";
// Components
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import ProductsList from "../../components/Waiter/Lists/ProductsList";
import InputModal from "../../components/Waiter/Modals/InputModal";
// Styles
import { DARK_PRIMARY, ACCENT, FONT_COLOR_WHITE } from "../../styles/colors";
// Redux
import { connect } from "react-redux";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: this.props.navigation.getParam("order"),
      menu: this.props.restaurants.find(r => r._id === this.props.active).menu,
      category: null,
      addProductInput: false
    };
    this.socket = this.props.navigation.getParam("socket");
    if (this.state.order === null)
      this.state.order = { products: [], state: "NEW" };
    this.state.order.restaurant = this.props.active;
    this.acceptInput = this.acceptInput.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
    this.sendOrder = this.sendOrder.bind(this);
  }

  acceptInput(text) {
    console.log("Add product with code: " + text);
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
      number: this.props.navigation.getParam("number"),
    }
    if (this.state.order.products.length == 0) return;
    let products = [];
    for (let i = 0; i<this.state.order.products.length; i++)
      products.push({_id: this.state.order.products[i]._id, quantity: this.state.order.products[i].quantity})
    newOrder.products = products;
    this.socket.emit('new-order', newOrder);
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <ProductsList
          products={this.state.order.products}
          onAddProduct={this.addProduct}
          onRemoveProduct={this.removeProduct}
        />

        <InputModal
          visible={this.state.addProductInput}
          close={() => {
            console.log("close");
            this.setState({ addProductInput: false });
          }}
          accept={this.acceptInput}
          title={"Agregar Producto"}
        />

        <TouchableOpacity
          disabled={this.props.navigation.getParam("order") !== null}
          style={styles.sendOrder} onPress={this.sendOrder}
        >
          <Text style={styles.sendOrderText}>ENVIAR PEDIDO</Text>
        </TouchableOpacity>

        <FloatingAction
          visible={this.props.navigation.getParam("order") === null}
          iconWidth={30}
          iconHeight={30}
          actions={actions}
          overrideWithAction
          distanceToEdge={15}
          color={DARK_PRIMARY}
          onPressItem={() => this.setState({ addProductInput: true })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%"
  },
  sendOrder: {
    position: "absolute",
    width: "80%",
    padding: 7,
    paddingLeft: 20,
    backgroundColor: ACCENT,
    left: 15,
    bottom: 15,
    marginBottom: 8,
    borderRadius: 15,
    display: "flex",
    justifyContent: "center"
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

export default connect(mapStateToProps, null)(Products);
// export default Products;
