import { createStore, combineReducers } from 'redux';
import mesasReducer from './reducers/mesas';

const rootReducer = combineReducers({
    mesas: mesasReducer
});

const configureStore = () => {
    return createStore(rootReducer);
};

export default configureStore;