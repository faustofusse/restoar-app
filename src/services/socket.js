import SocketIOClient from "socket.io-client";
import { URL } from "../config/settings";
import { addOrder } from "../redux/actions";

export const socket = SocketIOClient(URL, {
  transports: ['websocket'],
  jsonp: false
});

export const startSocket = (store) => {
  socket.emit('restaurant', store.getState().restaurants.active);

  socket.on('disconnect', () => {
    console.log('Socket disconnected.');
    socket.connect();
  });
  
  socket.on('new-order', order => {
    console.log('order :>> ', order);
    let active = store.getState().restaurants.active;
    store.dispatch(addOrder(active, order));
  });
};
