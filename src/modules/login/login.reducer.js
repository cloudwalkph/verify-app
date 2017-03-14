import { setAuthToken } from '../../utils/token';

import {
    DO_LOGIN,
    DO_LOGIN_SUCCESS,
    DO_LOGIN_FAILED
} from './login.action';

const initialState = {
    authenticated: false,
    fetching: false,
    error: false
};

const login = (state = initialState, action) => {
    switch (action.type) {
        case DO_LOGIN:
            return Object.assign({
                fetching: true
            });

        case DO_LOGIN_FAILED:
            return Object.assign({
                fetching: false,
                error: true
            });

        case DO_LOGIN_SUCCESS:
            setAuthToken(action.access_token);

            return Object.assign({
                fetching: false,
                authenticated: true
            });

        default:
            return state;
    }
};

export default login;