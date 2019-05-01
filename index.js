import {AppRegistry} from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './src/configureStore';
import React from 'react';
import Mozo from './src/components/mozo/Mozo';
import {name as appName} from './app.json';
import { createStackNavigator, createAppContainer } from 'react-navigation';
const RootStack = createStackNavigator(
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

const AppContainer = createAppContainer(RootStack);
const store = configureStore();

const ReactNativeRedux = () => (
    <Provider store={store}>
        <AppContainer />
    </Provider>
);

AppRegistry.registerComponent(appName, () => ReactNativeRedux);