import { SELECT_MESA, DESELECT_MESA, ADD_PRODUCTO, REMOVE_PRODUCTO, ADD_MESA } from '../actions/actionTypes';
import { MENU } from '../resources/menu';

// Estado inicial de la app
const initialState = {
    nombre: 'Fausto Fusse',
    // con JSON.parse(text) se puede convertir un json en string a objeto javascript
    menu: MENU,
    mesas: [
        { numero: 1, productos: [] },
        { numero: 2, productos: [] },
        { numero: 3, productos: [{ id: 2, add: [] }, { id: 23, add: [] }, { id: 4, add: [] }, { id: 4, add: [] }, { id: 4, add: [] }, { id: 6, add: [1, 2] }, { id: 6, add: [2, 3] }, { id: 8, add: [3] }] },
        { numero: 4, productos: [] },
        { numero: 5, productos: [] },
        { numero: 6, productos: [] },
        { numero: 7, productos: [] },
        { numero: 8, productos: [] }
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
        // case ADD_MESA:
        //     return {
        //         ...state,
        //         mesas: state.mesas.concat({
        //             numero: state.mesas.length + 1
        //         })
        //     }
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