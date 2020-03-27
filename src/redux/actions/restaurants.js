import { SET_RESTAURANTS, SET_TABLES, SET_ACTIVE, UPDATE_RESTAURANT, SET_ACTIVE_TABLE } from './actionTypes';

export const setRestaurants = (restaurants) => {
    return {
        type: SET_RESTAURANTS,
        restaurants: restaurants
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