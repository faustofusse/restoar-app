import { AppRegistry, YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './src/configureStore';
import React from 'react';
import Mozo from './src/components/mozo/Mozo';
import {name as appName} from './app.json';
import { createStackNavigator, createAppContainer } from 'react-navigation';

// Ignora las advertencias de mierda, que no puedo solucionar
YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Warning: componentWillUpdate is deprecated',
  'Module RCTImageLoader requires',
]);

//import {SignedIn, SignedOut} from './src/config/Routes'
import {createRootNavigator} from './src/config/Routes'
import Menu from './src/navegation/Menu';


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

    const RootNavigator = createRootNavigator(signedIn);
    const AppContainer = createAppContainer(RootNavigator);
    return <AppContainer/>;
  }

}

const ReactNativeRedux = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

AppRegistry.registerComponent(appName, () => ReactNativeRedux);





/*const RootStack = createStackNavigator(
  {
      Mozo: Mozo
  },
  {
      initialRouteName: 'Mozo',
      defaultNavigationOptions: {
          headerStyle:{
            backgroundColor: '#b71c1c',
            height: 70,
          },
          headerTintColor : '#fff',
          headerTitleStyle:{
              textAlign: 'center',
              flex: 1
          }
      }
  }
);
const AppContainer = createAppContainer(RootStack);*/