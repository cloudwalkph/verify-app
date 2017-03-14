import { combineReducers } from 'redux';
import status from './modules/_common/status.reducer';
import login from './modules/login/login.reducer';
import events from './modules/events_selector/events.reducer';

import AppNavigator from './routes';
const navReducer = (state, action) => {
    const newState = AppNavigator.router.getStateForAction(action, state);
    return newState || state;
};

export default combineReducers({
    status,
    nav: navReducer,
    login,
    events
});