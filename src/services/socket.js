import SocketIOClient from "socket.io-client";
import { URL } from "../config/settings";

// let socket;

let onConnect = () => {
  console.log('Socket connected...')
}

let onDisconnect = () => {
  console.log('Socket disconnected...')
}

module.exports.connectSocket = (user, restaurant) => {
  let socket = SocketIOClient(URL, {
    transportOptions: { polling: {
        extraHeaders: {
          userid: user,
          restaurantid: restaurant
        } } }
  });
  socket.on('connect', onConnect);
  socket.on('disconnect', onDisconnect);
  return socket;
} 

// module.exports.socket = socket;
