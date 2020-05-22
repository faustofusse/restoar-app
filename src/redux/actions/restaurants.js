import { SET_RESTAURANTS, SET_TABLES, SET_ACTIVE, UPDATE_RESTAURANT, SET_ACTIVE_TABLE, SET_ORDERS, ADD_ORDER, UPDATE_TABLE } from './actionTypes';

export const setRestaurants = (restaurants) => {
    return {
        type: SET_RESTAURANTS,
        restaurants: restaurants
    }
}

export const updateTable = (table) => {
    return {
        type: UPDATE_TABLE,
        table: table
    }
}

export const addOrder = (id, order) => {
    return {
        type: ADD_ORDER,
        id: id, 
        order: order
    }
}

export const setOrders = (id, orders) => {
    return {
        type: SET_ORDERS,
        id: id, 
        orders: orders
    }
}

export const setTables = (id, tables) => {
    return {
        type: SET_TABLES,
        id: id,
        tables: tables
    }
}

export const setActive = (id) => {
    return {
        type: SET_ACTIVE,
        id: id
    }
}

export const updateRestaurant = (restaurant) => {
    return {
        type: UPDATE_RESTAURANT,
        restaurant: restaurant
    }
}

export const setActiveTable = (table) => {
    return {
        type: SET_ACTIVE_TABLE,
        table: table
    }
}