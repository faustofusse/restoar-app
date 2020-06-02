import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert, Vibration } from 'react-native';
import { connect } from 'react-redux';
import OrdersList from '../../components/Restaurant/Lists/OrdersList';
import { FloatingAction } from 'react-native-floating-action';
import { DARK_PRIMARY, ACCENT, FONT_COLOR_WHITE } from '../../styles/colors';
import { getOrdersByRestaurant } from '../../services/api';
import { setOrders } from '../../redux/actions';
import { socket } from '../../services/socket';

const { width: WIDTH } = Dimensions.get('window')

class Orders extends Component {

  constructor(props) {
    super(props);
    this.state = { table: props.navigation.getParam('table') }
    if (!this.state.table) this.retrieveOrders();
    this.newOrder = this.newOrder.bind(this);
    this.changeTableState = this.changeTableState.bind(this);
    this.closeTable = this.closeTable.bind(this);
    this.didFocus = this.props.navigation.addListener('didFocus', this.onFocus);
    this.didBlur = this.props.navigation.addListener('didBlur', this.onBlur);
  }

  componentWillUnmount(){ this.onBlur(); this.didFocus.remove(); this.didBlur.remove(); }

  async onFocus() {
    if (socket.listeners('new-order').length <= 1) socket.on('new-order', (order)=>Vibration.vibrate());
  }

  async onBlur() {
    let listeners = socket.listeners('new-order');
    if (listeners.length >= 2) socket.off('new-order', listeners[listeners.length-1]);
  }

  async retrieveOrders() {
    let orders = await getOrdersByRestaurant(this.props.restaurant._id);
    this.props.onSetOrders(orders);
  } 

  async newOrder() {
    this.props.navigation.navigate('Products', { 
      table: this.state.table._id, order: null, 
    });
  }

  async changeTableState(state) {
    let table = this.state.table;
    table.state = state;
    socket.emit('edit-table', table);
  }

  async orderDone(order) {
    console.log('Order done!', order.number)
  }

  async closeTable() {
    Alert.alert('Close table?', 'you sure bruh?', [
      { text: 'Cancel', style: 'cancel', onPress: () => console.log('Cancel Pressed'), },
      { text: 'OK', onPress: () => this.changeTableState(this.props.restaurant.orders.filter(o=>o.table===this.state.table._id).length === 0 ? 'OPEN' : 'CLOSED') }
      ], {cancelable: true});
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.restaurant.orders.filter(o => this.state.table === undefined ? true : o.table===this.state.table._id).length <= 0 ?
          (<Text style={{marginBottom: 50, textAlign: 'center'}}>No hay pedidos.</Text>) :
          (<OrdersList orders={ this.props.restaurants.find(r=>r._id===this.props.active).orders.filter(o => this.state.table === undefined ? true : o.table===this.state.table._id) } 
            navigation={this.props.navigation} orderDone={this.orderDone} 
            showButton={this.state.table === undefined} />)}

        { this.state.table !== undefined && this.state.table.state === 'OPEN' ? (
          <TouchableOpacity style={[styles.occupateTable, {}]} onPress={() => this.changeTableState('BUSY')} >
            <Text style={styles.occupateTableText}>OCUPAR MESA</Text>
          </TouchableOpacity>
        ) : null}

        <FloatingAction visible={this.state.table !== undefined && this.state.table.state === 'BUSY'}
          iconWidth={30} iconHeight={30}
          position={'left'}
          actions={actions2} overrideWithAction
          distanceToEdge={15} color={DARK_PRIMARY}
          onPressItem={this.closeTable}
        />

        <FloatingAction visible={this.state.table !== undefined && this.state.table.state === 'BUSY'}
          iconWidth={30} iconHeight={30}
          actions={actions} overrideWithAction
          distanceToEdge={15} color={ACCENT}
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

const actions2 = [{
  text: 'Nuevo Pedido3',
  icon: require('../../assets/check-white.png'),
  name: 'bt_closeTable',
  position: 1
}];

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch"
  },
  bottomContainer: {
    backgroundColor: '#000',
    position: 'absolute',
    width: '100%',
    // height: 30,
    display: "flex",
    justifyContent:'center',
    alignItems: 'stretch',
    bottom: 5
  },
  occupateTable: {
    position: "absolute",
    left: '5%',
    width: '90%',
    padding: 7,
    paddingLeft: 20,
    backgroundColor: ACCENT,
    bottom: 15,
    marginBottom: 8,
    borderRadius: 15,
    // borderBottomRightRadius: 15,
    // borderTopRightRadius: 15,
    display: "flex",
    justifyContent: "center",
    // ios
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    // android (Android +5.0)
    elevation: 2,
    // zIndex: -2
  },
  occupateTableText: {
    fontSize: 18,
    color: FONT_COLOR_WHITE,
    textAlign: 'center'
  }
});

const mapStateToProps = state => {
  return {
    restaurants: state.restaurants.restaurants,
    active: state.restaurants.active,
    restaurant: state.restaurants.restaurants.find(r=>r._id===state.restaurants.active),
    user: state.user
  };
}

const mapDispatchToProps = dispatch => {
  return {
      onSetOrders: (id, orders) => dispatch(setOrders(id, orders)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
