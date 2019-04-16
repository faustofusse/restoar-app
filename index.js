import {AppRegistry} from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';
import React from 'react';
import App from './App';
import {name as appName} from './app.json';

const store = configureStore();

const ReactNativeRedux = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

AppRegistry.registerComponent(appName, () => ReactNativeRedux);