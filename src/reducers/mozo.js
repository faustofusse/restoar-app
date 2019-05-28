import { SELECT_MESA, DESELECT_MESA, ADD_PRODUCTO, REMOVE_PRODUCTO, ADD_MESA, SET_MENU } from '../actions/actionTypes';

// Estado inicial de la app
const initialState = {
    nombre: 'Fausto Fusse',
    menu: null,
    mesas: [
        { _id: 'dfpjskdl', numero: 1, productos: [{_id:'5cea086162c3af7944eec03a', agregado:''},{_id:'5cea083762c3af7944eec036', agregado:''},{_id:'5cea083762c3af7944eec036', agregado:''}] },
        { _id: 'dfpj1skdl', numero: 2, productos: [] },
        { _id: 'dfpj2skdl', numero: 3, productos: [] },
        { _id: 'dfpj3skdl', numero: 4, productos: [] },
        { _id: 'dfpj4skdl', numero: 5, productos: [] },
        { _id: 'dfpj5skdl', numero: 6, productos: [] },
        { _id: 'dfpj6skdl', numero: 7, productos: [] },
        { _id: 'dfpj7skdl', numero: 8, productos: [] }
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
                mesas: state.mesas.concat({
                    numero: action.numero,
                    productos: []
                })
            }
        // case END_MESA:
        default:
            return state;
    }
}

export default reducer;