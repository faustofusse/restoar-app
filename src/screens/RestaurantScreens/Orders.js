import React, { Component } from 'react';
import { View, Text, ToastAndroid, Alert } from 'react-native';
import { connect } from 'react-redux';
import OrdersList from '../../components/Waiter/Lists/OrdersList';
import { FloatingAction } from 'react-native-floating-action';
import { DARK_PRIMARY } from '../../styles/colors';
import { getOrdersByRestaurant } from '../../services/api';
import { setOrders } from '../../redux/actions';

class Orders extends Component {

  constructor(props) {
    super(props);
    this.state = { table: props.navigation.getParam('table') }
    if (!this.state.table) this.retrieveOrders();
    this.retrieveOrders = this.retrieveOrders.bind(this);
    this.newOrder = this.newOrder.bind(this);
  }

  async retrieveOrders() {
    let restaurant = this.props.restaurants.find( r => r._id === this.props.active);
    let orders = await getOrdersByRestaurant(restaurant._id);
    this.props.onSetOrders(orders);
  } 

  async newOrder() {
    this.props.navigation.navigate('Products', { 
      table: this.state.table._id, order: null, 
    });
  }

  render() {
    return (
      <View>
        {this.props.restaurants.find(r => r._id === this.props.active).orders.filter(o => this.state.table === undefined ? true : o.table===this.state.table._id).length <= 0 ?
          (<Text style={{height: '100%'}}>No hay pedidos.</Text>) :
          (<OrdersList orders={ this.props.restaurants.find(r => r._id === this.props.active).orders.filter(o => this.state.table === undefined ? true : o.table===this.state.table._id) } navigation={this.props.navigation} />)}

        <FloatingAction visible={this.state.table !== undefined}
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
    restaurants: state.restaurants.restaurants,
    active: state.restaurants.active,
    user: state.user
  };
}

const mapDispatchToProps = dispatch => {
  return {
      onSetOrders: (id, orders) => dispatch(setOrders(id, orders)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
