import io from 'socket.io-client';
// let socket = io('http://192.168.0.11:3000/');
let socket = io('http://server.restoar.com.ar/');
socket.emit('hola', 'hola como andas');
export default socket;
