export { SELECT_MESA, DESELECT_MESA, ADD_PRODUCTO, REMOVE_PRODUCTO } from '../actions/actionTypes';

const initialState = {
    menu: {
        entradas: [{ id: 0, nombre: 'Bastones de Muzza', precio: 97 }, { id: 1, nombre: 'Pepinillos', precio: 30 }],
        bebidas: [{ id: 2, nombre: 'Coca-Cola', precio: 50 }, { id: 3, nombre: 'Fanta', precio: 30 }]
    },
    mesas: [{ key: 1, numero: 1, productos: [] }, { key: 2, numero: 2, productos: [] }, { key: 3, numero: 3, productos: [] }, { key: 4, numero: 4, productos: [] }, { key: 5, numero: 5, productos: [] }, { key: 6, numero: 6, productos: [] }, { key: 7, numero: 7, productos: [] }, { key: 8, numero: 8, productos: [] }],
    mesaSeleccionada: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_MESA:
            return {
                ...state,
                mesaSeleccionada: action.numero
            }
        case DESELECT_MESA:
            return {
                ...state,
                mesaSeleccionada: null
            }
        case ADD_PRODUCTO:
            let mesa = state.mesas.find(mesa => { return mesa.numero === state.mesaSeleccionada; });
            mesa.productos.concat(action.numero);
            break;
        case REMOVE_PRODUCTO:
            let mesa = state.mesas.find((mesa) => { return mesa.numero === state.mesaSeleccionada; });
            mesa.productos.splice(mesa.productos.indexOf(action.producto),1);
            break;
        case ADD_MESA:
            return {
                ...state,
                mesas: state.mesas.concat({
                    key: state.mesas.length + 1,
                    numero: state.mesas.length + 1
                })
            }
        // case END_MESA:
        default:
            return state;
    }
}

export default reducer;