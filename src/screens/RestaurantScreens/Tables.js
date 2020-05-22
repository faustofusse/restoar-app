import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { BACKGROUND } from '../../styles/colors';
import { connect } from 'react-redux';
import { setRestaurants, setTables, updateRestaurant, setOrders } from '../../redux/actions/index';
import TablesList from '../../components/Restaurant/Lists/TablesList';
import { getOrdersByRestaurant } from '../../services/api';

class Tables extends Component {

    constructor(props) {
        super(props);
        this.state = { loading: false };
        this.selectTable = this.selectTable.bind(this);
        this.updateOrders = this.updateOrders.bind(this);
    }

    async componentDidMount() {
        await this.updateOrders();
    }

    async updateOrders() {
        let orders = await getOrdersByRestaurant(this.props.restaurant._id);
        this.props.onSetOrders(this.props.active, orders.reverse());
    }

    async selectTable(id) {
        let table = this.props.restaurant.tables.find(t => t._id === id);
        this.props.navigation.navigate('Orders', { id, table, code: table.code });
    }

    render() {
        return (
            <View style={styles.container} >
                {
                    this.state.loading ?
                        <ActivityIndicator size="large" color="ff0000" />
                        :
                        <View style={{ width: "100%", height: "100%" }}>
                            {this.props.restaurant.tables.length === 0 ?
                                <View><Text>El restaurante no tiene mesas</Text></View>
                                :
                                <TablesList tables={this.props.restaurants.find(r=>r._id===this.props.active).tables} selectTable={this.selectTable} />
                            }
                        </View>
                }
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
    tables: {
        width: "100%",
        height: "100%",
        padding: 10
    }
});

const mapStateToProps = state => {
    return {
        restaurants: state.restaurants.restaurants,
        active: state.restaurants.active,
        restaurant: state.restaurants.restaurants.find(r=>r._id===state.restaurants.active),
        user: state.user,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onSetOrders: (id, orders) => dispatch(setOrders(id, orders)),
        onSetMenu: (menu) => dispatch(setMenu(menu)),
        onSetRestaurants: (restaurants) => dispatch(setRestaurants(restaurants)),
        onSetTables: (id, tables) => dispatch(setTables(id, tables)),
        onUpdateRestaurant: (restaurant) => dispatch(updateRestaurant(restaurant))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tables);