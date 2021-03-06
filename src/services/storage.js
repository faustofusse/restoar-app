// Para correr la app con emulador va la import de arriba y con expo la de abajo
import AsyncStorage from '@react-native-community/async-storage';
// import { AsyncStorage } from "react-native";

export const USER_KEY = "auth-demo-key";

export const getUser = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        resolve(JSON.parse(res));
      })
      .catch(err => reject(err));
  });
};

export const updateUser = user => {
  console.log("Update user (Async Storage)");
  return AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const deleteUser = user => {
  AsyncStorage.removeItem(USER_KEY);
};

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);
