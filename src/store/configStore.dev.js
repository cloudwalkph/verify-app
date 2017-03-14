import { persistStore, autoRehydrate } from 'redux-persist'
import { applyMiddleware, createStore, compose } from 'redux';
import { AsyncStorage } from 'react-native';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import devTools from 'remote-redux-devtools';
import { apiCallMiddleware } from '../utils/api/apiCallMiddleware';
import { clearBodyMiddleware } from '../utils/api/clearBodyMiddleware';
import rootReducer from '../rootReducer';
import Config from 'react-native-config'

const logger = createLogger();
const store = createStore(rootReducer, compose(
    applyMiddleware(clearBodyMiddleware, apiCallMiddleware, thunk, logger),
    autoRehydrate(),
    devTools({ hostname: Config.DEVTOOL_IP, port: Config.DEVTOOL_PORT })
));

persistStore(store, { storage: AsyncStorage });

export default store;