import React, { Component } from "react";
import { View, Text, Alert } from "react-native";
import { connect } from "react-redux";
import OrdersList from "../../components/Waiter/Lists/OrdersList";
import { connectSocket } from '../../services/socket';

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = { orders: [] };
    this.socket = connectSocket(props.userId, props.active);
    this.setOrders();
    this.getProductsInfo();
    this.newOrder = this.newOrder.bind(this);
    this.socket.on('new-order', this.newOrder);
    console.log(this.state.orders);
  }

  async newOrder(order) {
    console.log(order)
    let orders = this.state.orders;
    orders.unshift(order);
    this.setState({orders});
    this.getProductsInfo();
  }

  async setOrders() {
    let restaurant = this.props.restaurants.restaurants.find(
      r => r._id === this.props.restaurants.active
    );
    let tables = restaurant.tables;
    let orders = [];
    for (let i = 0; i < tables.length; i++)
      if (tables[i].orders) orders = orders.concat(tables[i].orders);
    this.state.orders = orders;
  }

  async getProductsInfo() {
    let restaurant = this.props.restaurants.restaurants.find(
      r => r._id === this.props.restaurants.active
    );
    let products = restaurant.menu.products;
    let orders = this.state.orders;
    for (let i = 0; i < orders.length; i++) {
      for (let j = 0; j < orders[i].products.length; j++) {
        product = products.find(p => p._id === orders[i].products[j]._id);
        orders[i].products[j].name = product.name;
      }
    }
  }

  render() {
    return (
      <View>
        {this.state.orders.length <= 0 ? (
          <Text>No hay pedidos.</Text>
        ) : (
          <OrdersList
            orders={this.state.orders}
            navigation={this.props.navigation}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user._id,
    restaurants: state.restaurants,
    active: state.restaurants.active,
  };
};

export default connect(mapStateToProps, null)(Orders);
