import { createStore, combineReducers, compose } from 'redux';
import mozoReducer from '../redux/reducers/mozo';
import userReducer from '../redux/reducers/user';
import restaurantsReducer from '../redux/reducers/restaurants';

// Se declaran los reducers, para poder luego ser accedidos
const rootReducer = combineReducers({
    mozo: mozoReducer,
    user: userReducer,
    restaurants: restaurantsReducer
});

let composeEnhancers = compose;

// Esto es para debuggear
if (__DEV__)
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
    return createStore(rootReducer, composeEnhancers());
};

export default configureStore;