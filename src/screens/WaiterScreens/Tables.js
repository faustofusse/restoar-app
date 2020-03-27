import React, { Component } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, Text } from 'react-native';
// import { FloatingAction } from 'react-native-floating-action';
import { BACKGROUND, BLUE, DARK_PRIMARY } from '../../styles/colors';
import { connect } from 'react-redux';
import { setRestaurants, setTables, updateRestaurant } from '../../redux/actions/index';
import { URL } from '../../config/settings';
import axios from 'axios';
import TablesList from '../../components/Waiter/Lists/TablesList';

class Tables extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            restaurant: {
                name: '',
                _id: '',
                tables: []
            }
        };
        this.selectTable = this.selectTable.bind(this);
    }

    async componentDidMount() {
        await this.getRestaurant();
        await this.getTables();
        await this.getOrders();
        this.props.onUpdateRestaurant(this.state.restaurant);
        console.log(this.state);
    }

    async getRestaurant() {
        let restaurants = this.props.restaurants.restaurants;
        for (let i = 0; i < restaurants.length; i++) {
            if (this.props.restaurants.active === restaurants[i]._id) {
                let r = restaurants[i]
                delete r.address
                if (!r.tables) r.tables = []
                await this.setState({ restaurant: r })
            }
        }
    }

    async getTables() {
        let url = URL + 'api/tables/?restaurantId=' + this.state.restaurant._id;
        await axios.get(url).then(async response => {
            if (response.data.error) return console.log(response.data);
            let tables = response.data;
            let r = this.state.restaurant;
            r.tables = tables;
            this.props.onSetTables(this.state.restaurant._id, tables);
            await this.setState({ restaurant: r })
        }).catch(err => {
            console.log(err);
        });
    }

    async getOrders() {
        let url = URL + 'api/orders/resto/' + this.state.restaurant._id;
        let tables = this.state.restaurant.tables;
        await axios.get(url).then(async response => {
            if (response.data.error) console.error(response.data.error);
            let orders = response.data.success;
            for (let i = 0; i < orders.length; i++) {
                let t = tables.find(t => t._id === orders[i].table);
                if (t.orders === undefined) t.orders = [orders[i]]
                else t.orders.push(orders[i])
                t.state = 'BUSY';
            }
            let restaurant = this.state.restaurant;
            restaurant.tables = tables;
            tables.sort((a, b) => {
                // ARREGLAR ESTOOOO
                if (a.state === b.state) return 0;
                if (a.state === 'OPEN' && b.state == 'BUSY') return 1;
                if (b.state === 'OPEN' && a.state == 'BUSY') return -1;
            });
            tables.sort()
            this.setState({ restaurant });
        }).catch(err => console.log(err));
    }

    async selectTable(id) {
        this.props.navigation.navigate('Orders', { id, code: this.state.restaurant.tables.find(t => t._id === id).code })
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
    // Aca van los elementos del state que voy a utilizar en la App (Redux)
    // Van a ser accesibles como propiedades de App
    // state.mozo hace referencia al reducer que lo configure en rootReducer en configureStore.js
    return {
        restaurants: state.restaurants,
        active: state.restaurants.active,
        user: state.user
    };
}

const mapDispatchToProps = dispatch => {
    // Declaro que acciones voy a usar (Redux)
    return {
        onSetMenu: (menu) => dispatch(setMenu(menu)),
        onSetRestaurants: (restaurants) => dispatch(setRestaurants(restaurants)),
        onSetTables: (id, tables) => dispatch(setTables(id, tables)),
        onUpdateRestaurant: (restaurant) => dispatch(updateRestaurant(restaurant))
    };
}

// Esto conecta a App con Redux, y la exporta:
export default connect(mapStateToProps, mapDispatchToProps)(Tables);