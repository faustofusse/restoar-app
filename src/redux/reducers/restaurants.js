import { SET_RESTAURANTS, SET_TABLES, SET_ACTIVE, UPDATE_RESTAURANT, SET_ACTIVE_TABLE } from '../actions/actionTypes';

const initialState = {
    active: null, // Active esta 'Vicente' por default. Despues cambiarlo a null
    restaurants: []
}

let restaurants;

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_RESTAURANTS:
            return {
                ...state,
                active: action.restaurants[0]._id,
                restaurants: action.restaurants
            }
        case UPDATE_RESTAURANT:
            restaurants = state.restaurants;
            for (let i = 0; i < restaurants.length; i++)
                if (restaurants[i]._id === action.restaurant._id)
                    restaurants[i] = action.restaurant
            return { ...state, restaurants }
        case SET_TABLES:
            restaurants = state.restaurants;
            for (r in restaurants)
                if (r._id === action._id)
                    r.tables = action.tables
            return { ...state, restaurants }
        case SET_ACTIVE:
            return { ...state, active: action.id }
        case SET_ACTIVE_TABLE:
            restaurants = state.restaurants;
            for (let i = 0; i < restaurants.length; i++)
                if (restaurants[i]._id === state.active)
                    restaurants[i].activeTable = action.table
            return { ...state, restaurants }
        default:
            return state;
    }
}

export default reducer;