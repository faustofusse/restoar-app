import { createStore, combineReducers, compose } from 'redux';
import mozoReducer from './reducers/mozo';

// Se declaran los reducers, para poder luego ser accedidos
const rootReducer = combineReducers({
    mozo: mozoReducer
});

let composeEnhancers = compose;

// Esto es para debuggear
if (__DEV__)
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
    return createStore(rootReducer, composeEnhancers());
};

export default configureStore;