import AsyncStorage from '@react-native-community/async-storage';

export const USER_KEY = "auth-demo-key";

export const onSignIn = (user) =>{
  console.log('Auth user:'); console.log(user);
  return AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
}

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        console.log(res);
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};