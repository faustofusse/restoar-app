import { SET_USER, SET_PIN } from '../actions/actionTypes';

const initialState = {}

const reducer = (state = initialState, action) => {
    // Defino que pasa en cuanto se ejecuta cada accion
    switch (action.type) {
        case SET_USER:
            return { ...state, 
                _id: action.user._id,
                firstName: action.user.firstName, 
                lastName: action.user.lastName,
                pin: action.user.pin,
                email: action.user.email,
                restaurants: action.user.restaurants }
        case SET_PIN:
            return { ...state,
                pin: action.pin
            }
        default:
            return state;
    }
}

export default reducer;