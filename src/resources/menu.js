export const MENU = {
    entradas: [
        { id: 1, nombre: 'Bastones de Muzza', precio: 97 },
        { id: 2, nombre: 'Pepinillos', precio: 23 },
        { id: 3, nombre: 'Sopa de pollo', precio: 12 },
        { id: 4, nombre: 'Sopa de verdura', precio: 32 },
        { id: 5, nombre: 'Provoleta', precio: 22 }],
    pastas: [
        { id: 6, nombre: 'Ravioles', agregados: [[1, 2, 3]], precio: 97 },
        { id: 7, nombre: 'Spaghetti', agregados: [[1, 2, 3], [2, 3]], precio: 97 },
        { id: 8, nombre: 'Fetuccini', agregados: [[1, 2, 3]], precio: 97 },
        { id: 9, nombre: 'Penne Rigatti', agregados: [[1, 2, 3]], precio: 97 }],
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
        { id: 1, nombre: 'Salsa rosa', agregado: true },
        { id: 2, nombre: 'Bolognesa', agregado: true },
        { id: 3, nombre: 'Fileto', agregado: true }
    ]
};