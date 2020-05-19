import { SET_RESTAURANTS, SET_TABLES, SET_ACTIVE, UPDATE_RESTAURANT, SET_ACTIVE_TABLE, SET_ORDERS, ADD_ORDER } from '../actions/actionTypes';

const initialState = {
    active: null,
    restaurants: []
}

let addProductsToOrder = (order, products) => {
    let newOrder = order;
    for (let j = 0; j<newOrder.products.length; j++){
        product = products.find(p => p._id === newOrder.products[j]._id)
        newOrder.products[j].name = product.name;
    }
    return newOrder;
}

let addProductsToOrders = (orders, products) => {
    let newOrders = [];
    for (let i = 0; i<orders.length; i++) newOrders.unshift(addProductsToOrder(orders[i], products))
    return newOrders;
}

const reducer = (state = initialState, action) => {
    let restaurants = [].concat(state.restaurants);
    switch (action.type) {
        case SET_RESTAURANTS:
            return {
                ...state,
                active: action.restaurants[0]._id,
                restaurants: action.restaurants
            }
        case UPDATE_RESTAURANT:
            for (let i = 0; i < restaurants.length; i++)
                if (restaurants[i]._id === action.restaurant._id)
                    restaurants[i] = action.restaurant
            return { ...state, restaurants }
        case ADD_ORDER: 
            for (let i = 0; i < restaurants.length; i++)
                if (restaurants[i]._id === action.id){
                    let newOrders = [addProductsToOrder(action.order, restaurants[i].menu.products)].concat(restaurants[i].orders);
                    restaurants[i].orders = newOrders;
                }
            return { ...state, restaurants }
        case SET_ORDERS:
            for (let i = 0; i < restaurants.length; i++)
                if (restaurants[i]._id === action.id)
                    restaurants[i].orders = addProductsToOrders(action.orders, restaurants[i].menu.products).reverse()
            return { ...state, restaurants }
        case SET_TABLES:
            for (r in restaurants)
                if (r._id === action._id)
                    r.tables = action.tables
            return { ...state, restaurants }
        case SET_ACTIVE:
            return { ...state, active: action.id }
        case SET_ACTIVE_TABLE:
            for (let i = 0; i < restaurants.length; i++)
                if (restaurants[i]._id === state.active)
                    restaurants[i].activeTable = action.table
            return { ...state, restaurants }
        default:
            return state;
    }
}

export default reducer;