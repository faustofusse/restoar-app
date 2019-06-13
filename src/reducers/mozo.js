import { SELECT_MESA, DESELECT_MESA, ADD_PRODUCTO, REMOVE_PRODUCTO, UPDATE_MESA, SET_MENU, REQUEST_MESA } from '../actions/actionTypes';

// Estado inicial de la app
const initialState = {
    id: '5d028eb1884bdb73137d05c3',
    restaurante: '5d0273573c4aae65d86f049f',
    nombre: 'Fausto Fusse',
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
        case REQUEST_MESA:
            console.log('Request Mesa: '+action.numero);
            return {
                ...state,
                mesas: state.mesas.concat({
                    numero: action.numero,
                    productos: []
                })
            }
        // case UPDATE_MESA:
        default:
            return state;
    }
}

export default reducer;