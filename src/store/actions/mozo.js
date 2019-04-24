import { ADD_MESA, END_MESA, SELECT_MESA, DESELECT_MESA, ADD_PRODUCTO, REMOVE_PRODUCTO } from './actionTypes';

// 
// Aca defino que parametros recibe cada accion
// 

export const addMesa = (numero) => {
    return {
        type: ADD_MESA,
        numero: numero
    }
}

export const endMesa = (numero) => {
    return {
        type: END_MESA
    }
}

export const addProducto = (producto) => {
    return {
        type: ADD_PRODUCTO,
        producto: producto
    }
}

export const removeProducto = (producto) => {
    return {
        type: REMOVE_PRODUCTO,
        producto: producto
    }
}

export const selectMesa = (numero) => {
    return {
        type: SELECT_MESA,
        numero: numero
    }
}

export const deselectMesa = () => {
    return {
        type: DESELECT_MESA
    }
}