import Config from 'react-native-config';

export const DO_LOGIN = 'DO_LOGIN';
export const DO_LOGIN_FAILED = 'DO_LOGIN_FAILED';
export const DO_LOGIN_SUCCESS = 'DO_LOGIN_SUCCESS';

export const DO_LOGOUT = 'DO_LOGOUT';

export const CHECK_AUTH_TOKEN = 'CHECK_AUTH_TOKEN';

export const doLogin = () => (
    {
        type: DO_LOGIN
    }
);

export const doLoginFailed = () => (
    {
        type: DO_LOGIN_FAILED
    }
);

export const doLoginSuccess = (auth) => (
    {
        type: DO_LOGIN_SUCCESS,
        auth
    }
);

export const doLogout = () => (
    {
        type: DO_LOGOUT
    }
);

export const doLoginRemote = (username, password) => (dispatch) => {
    dispatch(doLogin());

    const credentials = {
        username,
        password,
        grant_type: 'password',
        client_id: '2',
        client_secret: 'RPln2IDBimiaeD1ObutShdV39CvMeABMZCyFKA3M'
    };

    console.log(credentials);

    let options = Object.assign({ method: 'POST' }, { body: JSON.stringify(credentials) }, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    } );

    return fetch(Config.AUTH_URL, options).then((res) => {
        if (!res.ok) {
            dispatch(doLoginFailed());
            return;
        }

        res.json().then((json) => {
            dispatch(doLoginSuccess(json));
        });

    }).catch((error) => {
        console.log(error);
        dispatch(doLoginFailed());
    })
};