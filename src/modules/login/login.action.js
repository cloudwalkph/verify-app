import Config from 'react-native-config';

export const DO_LOGIN = 'DO_LOGIN';
export const DO_LOGIN_FAILED = 'DO_LOGIN_FAILED';
export const DO_LOGIN_SUCCESS = 'DO_LOGIN_SUCCESS';

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

export const doLoginRemote = (email, password) => (dispatch) => {
    dispatch(doLogin());

    const credentials = {
        email,
        password,
        grant_type: 'password',
        client_id: '',
        client_secret: ''
    };
    let options = Object.assign({ method: 'POST' }, { body: JSON.stringify(credentials) } );

    return fetch(Config.AUTH_URL, options).then((res) => {
        console.log(res.statusCode);
        if (res.statusCode !== 200) {

        }
    }).catch((error) => {
        console.log(error);
    })
};