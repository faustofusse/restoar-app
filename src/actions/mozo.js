import { UPDATE_MESA, REQUEST_MESA, SELECT_MESA, DESELECT_MESA, ADD_PRODUCTO, REMOVE_PRODUCTO, SET_MENU } from './actionTypes';

// 
// Aca defino que parametros recibe cada accion
// 

export const setMenu = (menu) => {
    return {
        type: SET_MENU,
        menu: menu
    }
}

export const requestMesa = (numero) => {
    return {
        type: REQUEST_MESA,
        numero: numero
    }
}

export const updateMesa = (productos) => {
    return {
        type: UPDATE_MESA,
        productos: productos
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

export const selectMesa = (id) => {
    return {
        type: SELECT_MESA,
        id: id
    }
}

export const deselectMesa = () => {
    return {
        type: DESELECT_MESA
    }
}