import { AppRegistry, YellowBox } from "react-native";
import { App } from "./src/App";
import { name as appName } from "./app.json";
AppRegistry.registerComponent(appName, () => App);

// import { AppRegistry, YellowBox } from 'react-native';
// import { Provider } from 'react-redux';
// import configureStore from './src/config/store';
// import React from 'react';
// import { name as appName } from './app.json';
// import { createAppContainer } from 'react-navigation';
// import { setUser, setRestaurants } from './src/redux/actions';
// import axios from 'axios';
// import { URL } from './src/config/settings'
// import { createRootNavigator } from './src/config/routes'
// import { getUser, updateUser } from "./src/services/storage";

// // Ignora las advertencias de mierda, que no puedo solucionar
// YellowBox.ignoreWarnings([
//   'Warning: componentWillReceiveProps is deprecated',
//   'Warning: componentWillUpdate is deprecated',
//   'react-devtools agent got no connection',
//   'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
// ]);

// const store = configureStore();

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       signedIn: false,
//       checkedSignIn: false
//     };
//   }

//   componentDidMount() {
//     getUser()
//       .then(res => {
//         if (res !== null) // SIGNED IN
//           this.updateRedux(res._id); 
//         else // NOT SIGNED IN
//           this.setState({ signedIn: false, checkedSignIn: true }); 
//       }).catch(err => console.log(err));
//   }

//   async updateRedux(id) {
//     let url = URL + 'api/users/' + id;
//     axios.get(url).then(async response => {
//       if (response.data.error) return console.log(response.data);
//       let user = response.data.success;
//       await store.dispatch(setUser(user));
//       await this.updateRestaurants(user);
//       await this.updateStorage(user);
//     }).catch(err => console.log(err));
//   }

//   async updateRestaurants(user){
//     store.dispatch(setRestaurants(user.restaurants));
//     return user.restaurants;
//   }

//   async updateStorage(user) {
//     updateUser(user).then(val => {
//       this.setState({ signedIn: true, checkedSignIn: true });
//     }).catch(err => console.log(err));
//   }

//   render() {
//     const { checkedSignIn, signedIn } = this.state;
//     // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
//     if (!checkedSignIn) return null;
//     const AppContainer = createAppContainer(createRootNavigator(signedIn));
//     return <AppContainer />;
//   }
// }

// const ReactNativeRedux = () => (
//   <Provider store={store}>
//     <App />
//   </Provider>
// );

// AppRegistry.registerComponent(appName, () => ReactNativeRedux);
