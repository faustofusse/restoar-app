import { SELECT_MESA, DESELECT_MESA, ADD_PRODUCTO, REMOVE_PRODUCTO, ADD_MESA } from '../actions/actionTypes';
import { MENU } from '../resources/menu';

// Estado inicial de la app
const initialState = {
    nombre: 'Fausto Fusse',
    // con JSON.parse(text) se puede convertir un json en string a objeto javascript
    // menu: MENU,
    mesas: [
        { _id: 'dfpjskdl', numero: 1, productos: [{_id:'4', agregados:[]},{_id:'4', agregados:[]},{_id:'20', agregados:[]}] },
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
        case SELECT_MESA:
            return { ...state, mesaSeleccionada: action.numero }
        case DESELECT_MESA:
            return { ...state, mesaSeleccionada: null }
        case ADD_PRODUCTO:
            mesas = state.mesas;
            productos = mesas.find(value => value.numero === state.mesaSeleccionada).productos;
            productos.push(action.producto);
            return { ...state, mesas: mesas }
        case REMOVE_PRODUCTO:
            mesas = [];
            mesas = mesas.concat(state.mesas);
            action.producto.add.sort();
            productos = mesas.find(value => value.numero === state.mesaSeleccionada).productos;
            for (var i = 0; i < productos.length; i++) {
                if (productos[i].id === action.producto.id && productos[i].add.esIgualA(action.producto.add)) {
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

Array.prototype.esIgualA = function (array) {
    if (array.length !== this.length) return false;
    array.sort(); this.sort();
    for (var i = 0; i < this.length; i++)
        if (this[i] !== array[i]) return false;
    return true;
}

export default reducer;