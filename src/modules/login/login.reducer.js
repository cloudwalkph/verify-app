import { setAuthToken, deleteAuthToken } from '../../utils/token';

import {
    DO_LOGIN,
    DO_LOGIN_SUCCESS,
    DO_LOGIN_FAILED,
    DO_LOGOUT
} from './login.action';

const initialState = {
    authenticated: false,
    fetching: false,
    error: false
};

const login = (state = initialState, action) => {
    switch (action.type) {
        case DO_LOGIN:
            return Object.assign({}, state, {
                fetching: true
            });

        case DO_LOGIN_FAILED:
            return Object.assign({}, state, {
                fetching: false,
                error: true
            });

        case DO_LOGIN_SUCCESS:
            setAuthToken(action.access_token);

            return Object.assign({}, state, {
                fetching: false,
                authenticated: true
            });

        case DO_LOGOUT:
            deleteAuthToken();

            return Object.assign({}, state, initialState);

        default:
            return state;
    }
};

export default login;