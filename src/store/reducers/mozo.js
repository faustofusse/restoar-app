import { SELECT_MESA, DESELECT_MESA, ADD_PRODUCTO, REMOVE_PRODUCTO, ADD_MESA } from '../actions/actionTypes';

// Estado inicial de la app
const initialState = {
    nombre: 'Fausto Fusse',
    // con JSON.parse(text) se puede convertir un json en string a objeto javascript
    menu: {
        entradas: [
            { id: 1, nombre: 'Bastones de Muzza', precio: 97 },
            { id: 2, nombre: 'Pepinillos', precio: 23 },
            { id: 3, nombre: 'Sopa de pollo', precio: 12 },
            { id: 4, nombre: 'Sopa de verdura', precio: 32 },
            { id: 5, nombre: 'Provoleta', precio: 22 }],
        pastas: [
            { id: 6, nombre: 'Ravioles', precio: 97 },
            { id: 7, nombre: 'Spaghetti', precio: 97 },
            { id: 8, nombre: 'Fetuccini', precio: 97 },
            { id: 9, nombre: 'Penne Rigatti', precio: 97 }],
        platos: [
            { id: 10, nombre: 'Milanga de ternera', precio: 97 },
            { id: 11, nombre: 'Bife de chorizo', precio: 97 },
            { id: 12, nombre: 'Albondigas con pure', precio: 97 },
            { id: 13, nombre: 'Arroz con pollo', precio: 97 }
        ],
        bebidas: {
            gaseosas: [
                { id: 14, nombre: 'Coca-Cola', precio: 97 },
                { id: 15, nombre: 'Fanta', precio: 97 },
                { id: 16, nombre: 'Pepsi', precio: 97 },
                { id: 17, nombre: 'Mirinda', precio: 97 }],
            jugos: [
                { id: 18, nombre: 'Levite de manzana', precio: 97 },
                { id: 19, nombre: 'Exprimido de naranja', precio: 9 },
                { id: 20, nombre: 'Levite de naranja', precio: 97 },
                { id: 21, nombre: 'Cepita', precio: 97 }],
            licuados: {
                leche: [
                    { id: 22, nombre: 'Frutilla', precio: 97 },
                    { id: 23, nombre: 'Banana', precio: 97 },
                    { id: 24, nombre: 'Manzana', precio: 97 },
                    { id: 25, nombre: 'Naranja', precio: 97 }],
                agua: [
                    { id: 26, nombre: 'Frutilla', precio: 97 },
                    { id: 27, nombre: 'Banana', precio: 97 },
                    { id: 28, nombre: 'Manzana', precio: 97 },
                    { id: 29, nombre: 'Naranja', precio: 97 }],
            }
        },
        agregados: [
            { id: 1, nombre: 'Salsa rosa', productos: [6, 7, 8, 9], agregado: true },
            { id: 2, nombre: 'Bolognesa', productos: [6, 7, 8, 9], agregado: true },
            { id: 3, nombre: 'Fileto', productos: [6, 7, 8, 9], agregado: true }
        ]
    },
    mesas: [
        { numero: 1, productos: [] },
        { numero: 2, productos: [] },
        { numero: 3, productos: [{ id: 2, add: [] }, { id: 23, add: [] }, { id: 4, add: [] }, { id: 4, add: [] }, { id: 4, add: [] }, { id: 6, add: [2,1] }, { id: 6, add: [2,3] }, { id: 8, add: [3] }] },
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
        // case ADD_PRODUCTO:
        //     let mesa = state.mesas.find(mesa => { return mesa.numero === state.mesaSeleccionada; });
        //     if (mesa) mesa.productos.concat(action.numero);
        //     return {...state}
        // case REMOVE_PRODUCTO:
        //     let elemento = state.mesas.find((elemento) => { return elemento.numero === state.mesaSeleccionada; });
        //     if (elemento) elemento.productos.splice(mesa.productos.indexOf(action.producto),1);
        //     return {...state}
        // case ADD_MESA:
        //     return {
        //         ...state,
        //         mesas: state.mesas.concat({
        //             key: state.mesas.length + 1,
        //             numero: state.mesas.length + 1
        //         })
        //     }
        // case END_MESA:
        default:
            return state;
    }
}

export default reducer;