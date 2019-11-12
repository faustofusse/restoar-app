import { SET_USER, SET_PIN } from './actionTypes';

export const setUser = (user) => {
    return {
        type: SET_USER,
        user: user
    }
}

export const setPin = (pin) => {
    return {
        type: SET_PIN,
        pin: pin
    }
}
