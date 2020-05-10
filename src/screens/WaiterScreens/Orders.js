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
      table: this.props.navigation.getParam('table'),
      socket: this.props.navigation.getParam('socket')
    }
    this.newOrder = this.newOrder.bind(this);
  }

  async getNextNumber(orders) {
    let mayor = 1;
    for (let i = 0; i<orders.length; i++)
      if (orders[i].number > mayor)
        mayor = orders[i].number;
    return mayor + 1;
  }

  async newOrder() {
    let number = await this.getNextNumber(this.state.table.orders);
    this.props.navigation.navigate('Products', { 
      table: this.state.table._id, order: null, 
      socket:this.state.socket, number
    });
  }

  render() {
    return (
      <View>
        {this.state.table.orders.length <= 0 ?
          (<Text style={{height: '100%'}}>No hay pedidos.</Text>) :
          (<OrdersList orders={this.state.table.orders.reverse()} navigation={this.props.navigation} />)}

        <FloatingAction
          iconWidth={30} iconHeight={30}
          actions={actions} overrideWithAction
          distanceToEdge={15} color={DARK_PRIMARY}
          onPressItem={this.newOrder}
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
