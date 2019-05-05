import { AppRegistry, YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './src/configureStore';
import React from 'react';
import {name as appName} from './app.json';
import { createStackNavigator, createAppContainer } from 'react-navigation';

// Ignora las advertencias de mierda, que no puedo solucionar
YellowBox.ignoreWarnings([
  'Warning: componentWillReceiveProps is deprecated',
  'Warning: componentWillUpdate is deprecated',
]);

import {createRootNavigator} from './src/config/Routes'
import { isSignedIn } from "./src/auth";

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
    isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(err => alert("An error occurred"));
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;

    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    if (!checkedSignIn) {
      return null;
    }
    const AppContainer = createAppContainer(createRootNavigator(signedIn));
    return <AppContainer/>;
  }
}

const ReactNativeRedux = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

AppRegistry.registerComponent(appName, () => ReactNativeRedux);