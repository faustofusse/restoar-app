import {AppRegistry} from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './src/configureStore';
import React from 'react';
import Mozo from './src/components/mozo/Mozo';
import {name as appName} from './app.json';

const store = configureStore();

const ReactNativeRedux = () => (
    <Provider store={store}>
        <Mozo />
    </Provider>
);

AppRegistry.registerComponent(appName, () => ReactNativeRedux);
