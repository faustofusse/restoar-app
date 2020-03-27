import React, { Component } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, Text } from 'react-native';
import { connect } from 'react-redux';
import OrdersList from '../../components/Waiter/Lists/OrdersList';
import { FloatingAction } from 'react-native-floating-action';
import { DARK_PRIMARY } from '../../styles/colors';

class Orders extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      tableId: this.props.navigation.getParam('id')
    }
    this.setOrders = this.setOrders.bind(this);
    this.setOrders();
    console.log(this.state);
  }

  async setOrders() {
    let restaurant = this.props.restaurants.restaurants.find(r => r._id === this.props.restaurants.active);
    let table = restaurant.tables.find(t => t._id === this.state.tableId);
    let orders = table.orders === undefined || table.orders === null ? [] : table.orders;
    this.state.orders = orders;
  }

  render() {
    return (
      <View>
        {this.state.orders.length <= 0 ?
          (<Text>No hay pedidos.</Text>) :
          (<OrdersList orders={this.state.orders} navigation={this.props.navigation} />)}

        <FloatingAction
          iconWidth={30} iconHeight={30}
          actions={actions} overrideWithAction
          distanceToEdge={15} color={DARK_PRIMARY}
          onPressItem={() => this.props.navigation.navigate('Products', { table: this.state.tableId, order: null })}
        />
      </View>
    )
  }
}

const actions = [{
  text: 'Nuevo Pedido',
  icon: require('../../assets/add-white.png'),
  name: 'bt_newOrder',
  position: 1
}];

const mapStateToProps = state => {
  return {
    restaurants: state.restaurants,
    active: state.restaurants.active,
    user: state.user
  };
}

export default connect(mapStateToProps, null)(Orders);