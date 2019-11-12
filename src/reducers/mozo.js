import { SELECT_MESA, DESELECT_MESA, ADD_PRODUCTO, REMOVE_PRODUCTO, UPDATE_MESA, SET_MENU, ADD_MESA } from '../actions/actionTypes';

// Estado inicial de la app
const initialState = {
    menu: null,
    mesas: [
        // { _id: 'dfpjskdl', numero: 1, estado: 'abierta', productos: [{_id:'5cea086162c3af7944eec03a', agregado:''},{_id:'5cea083762c3af7944eec036', agregado:''},{_id:'5cea083762c3af7944eec036', agregado:''}] },
    ],
    mesaSeleccionada: null
}

const reducer = (state = initialState, action) => {
    // Defino que pasa en cuanto se ejecuta cada accion
    let mesas;
    let productos;
    switch (action.type) {
        case SET_MENU:
            return { ...state, menu: action.menu }
        case SELECT_MESA:
            return { ...state, mesaSeleccionada: action.id }
        case DESELECT_MESA:
            return { ...state, mesaSeleccionada: null }
        case ADD_PRODUCTO:
            mesas = state.mesas;
            productos = mesas.find(value => value._id === state.mesaSeleccionada).productos;
            productos.push(action.producto);
            return { ...state, mesas: mesas }
        case REMOVE_PRODUCTO:
            mesas = [];
            mesas = mesas.concat(state.mesas);
            productos = mesas.find(value => value._id === state.mesaSeleccionada).productos;
            for (var i = 0; i < productos.length; i++) {
                if (productos[i].id === action.producto.id && productos[i].agregado === action.producto.agregado) {
                    productos.splice(i, 1);
                    break;
                }
            }
            return { ...state, mesas: mesas }
        case ADD_MESA:
            return {
                ...state,
                mesas: state.mesas.concat(action.mesa)
            }
        default:
            return state;
    }
}

export default reducer;