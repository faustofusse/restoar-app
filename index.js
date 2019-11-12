import { AppRegistry, YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './src/configureStore';
import React from 'react';
import { name as appName } from './app.json';
import { createAppContainer } from 'react-navigation';
import { setUser } from './src/actions';
import axios from 'axios';
import { URL } from './src/resources/url'

// Ignora las advertencias de mierda, que no puedo solucionar
YellowBox.ignoreWarnings([
  'Warning: componentWillReceiveProps is deprecated',
  'Warning: componentWillUpdate is deprecated',
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);

import { createRootNavigator } from './src/config/Routes'
import { getUser, updateUser } from "./src/services/storage";

const store = configureStore();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }

  componentDidMount() {
    getUser()
      .then(res => {
        if (res !== null) {
          let url = URL + 'api/users/' + res._id;
          axios.get(url).then(response => {
            if (response.data.error) {
              console.log(response.data);
              return;
            }
            let user = response.data.success;
            store.dispatch(setUser(user));
            updateUser(user).then(val => {
              this.setState({ signedIn: true, checkedSignIn: true });
            }).catch(err => console.log(err));
          }).catch(err => {
            console.log(err);
          });
        } else { 
          this.setState({ signedIn: false, checkedSignIn: true });
          console.log('Not signed in') 
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;

    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    if (!checkedSignIn) {
      return null;
    }
    const AppContainer = createAppContainer(createRootNavigator(signedIn));
    return <AppContainer />;
  }
}

const ReactNativeRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => ReactNativeRedux);