import React, { Component } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, Text } from 'react-native';
import { BACKGROUND, BLUE, DARK_PRIMARY } from '../../styles/colors';
import { connect } from 'react-redux';
import { setRestaurants, setTables, updateRestaurant, setOrders } from '../../redux/actions/index';
import TablesList from '../../components/Waiter/Lists/TablesList';
import { getOrdersByRestaurant } from '../../services/api';

const statesOrder = ['CLOSED', 'RESERVED', 'BUSY', 'OPEN'];

class Tables extends Component {

    constructor(props) {
        super(props);
        this.state = { restaurant: { name: '', _id: '', tables: []  }, loading: false };
        this.selectTable = this.selectTable.bind(this);
        this.updateOrders = this.updateOrders.bind(this);
    }

    async componentDidMount() {
        await this.getRestaurant();
        await this.updateOrders();
        console.log(this.state.restaurant.tables)
    }

    async getRestaurant() {
        let restaurants = this.props.restaurants.restaurants;
        for (let i = 0; i < restaurants.length; i++) {
            if (this.props.restaurants.active === restaurants[i]._id) {
                let r = restaurants[i]
                delete r.address
                if (!r.tables) r.tables = []
                r.tables.sort((a, b) => (statesOrder.indexOf(a.state) - statesOrder.indexOf(b.state)))
                await this.setState({ restaurant: r })
            }
        }
    }

    async updateOrders() {
        // let tables = this.state.restaurant.tables;
        // for (let i = 0; i<tables.length; i++) tables[i].orders = []
        let orders = await getOrdersByRestaurant(this.state.restaurant._id);
        this.props.onSetOrders(this.props.active, orders.reverse());
    }

    async selectTable(id) {
        let table = this.state.restaurant.tables.find(t => t._id === id);
        this.props.navigation.navigate('Orders', { 
            id, table, socket: this.socket, code: table.code 
        });
    }

    render() {
        return (
            <View style={styles.container} >
                {
                    this.state.loading ?
                        <ActivityIndicator size="large" color="ff0000" />
                        :
                        <View style={{ width: "100%", height: "100%" }}>
                            {this.state.restaurant.tables.length === 0 ?
                                <View><Text>El restaurante no tiene mesas</Text></View>
                                :
                                <TablesList tables={this.state.restaurant.tables} selectTable={this.selectTable} />
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
        restaurants: state.restaurants,
        active: state.restaurants.active,
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