import { HttpError, NetworkError } from './errors';
import Config from 'react-native-config';

const HOST = Config.API_URL;

export const apiCallMiddleware = ({ dispatch, getState }) => {
    return next => action =>
        typeof action === 'object' && action.url && !action.type ?
            apiCall({ ...action, dispatch, getState }) :
            next(action);
};

export const apiCall = ({ dispatch, url, method = 'get', types, body, originalBody, meta }) => {
    const opts = {
        method,
        headers: {
            'content-type': 'application/json'
        },
        body: body && JSON.stringify(body)
    };

    if (types && types.start) {
        dispatch({ type: types.start, payload: originalBody, meta });
    }

    return fetch(HOST + url, opts)
        .then(res => {
            if (!res.ok) {
                return res.json()
                    .catch(e => ({}))
                    .then(data => {
                        throw new HttpError(data, res)
                    });
            }
            return res.json();
        })
        .then(onSuccess)
        .catch(onError);

    function onError(error) {
        error = (error instanceof HttpError) ? error : new NetworkError(error, url);

        if ((error instanceof NetworkError) || error.status >= 500) {
            return onNoConnection(error);
        }
        console.log(url, error);

        if (types && types.error) {
            dispatch({ type: types.error, payload: originalBody, meta, url, error });
        }
        return Promise.reject(error);
    }

    function onNoConnection(error) {
        if (types && (types.noConnection)) {
            dispatch({ type: types.noConnection, payload: originalBody, meta, url, error });
        }
        return Promise.reject(error);
    }

    function onSuccess(data) {
        if (types && types.success) {
            dispatch({ type: types.success, payload: data.data, meta });
        }
        return data.data;
    }
};

console.ignoredYellowBox = [
    'Possible Unhandled Promise Rejection'
].concat(console.ignoredYellowBox);