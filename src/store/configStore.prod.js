import { persistStore, autoRehydrate } from 'redux-persist'
import { applyMiddleware, createStore, compose } from 'redux';
import { AsyncStorage } from 'react-native';
import thunk from 'redux-thunk';
import { apiCallMiddleware } from '../utils/api/apiCallMiddleware';
import { clearBodyMiddleware } from '../utils/api/clearBodyMiddleware';
import rootReducer from '../rootReducer';

const store = createStore(rootReducer, compose(
    applyMiddleware(clearBodyMiddleware, apiCallMiddleware, thunk),
    autoRehydrate()
));

persistStore(store, { storage: AsyncStorage });

export default store;