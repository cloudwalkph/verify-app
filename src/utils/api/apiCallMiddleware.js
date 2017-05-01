import { HttpError, NetworkError } from './errors';
import Config from 'react-native-config';
import RNFetchBlob from 'react-native-fetch-blob';

const HOST = Config.API_URL;

export const apiCallMiddleware = ({ dispatch, getState }) => {
    // if (typeof action === 'object' && action.url && !action.type && action.withImage) {
    //     return next => action => apiCallWithImage({ ...action, dispatch, getState });
    // }
    //
    // if (typeof action === 'object' && action.url && !action.type) {
    //     return next => action => apiCall({ ...action, dispatch, getState });
    // }
    //
    // return next => action => next(action);

    return next => action => {
        // if (typeof action === 'object' && action.url && !action.type && action.withImage) {
        //     return apiCallWithImage({ ...action, dispatch, getState });
        // }

        if (typeof action === 'object' && action.url && !action.type) {
            return apiCall({ ...action, dispatch, getState });
        }

        return next(action);
    };
};

export const apiCall = ({ dispatch, url, method = 'get', types, body, originalBody, meta, getState }) => {
    let loginState = getState().login;

    const opts = {
        method,
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json',
            'authorization': `Bearer ${loginState.accessToken}`
        },
        body: body && JSON.stringify(body)
    };

    if (types && types.start) {
        dispatch({ type: types.start, payload: originalBody, meta });
    }

    return fetch(HOST + url, opts)
        .then(res => {
            // console.log('middleware', res);
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
        // console.log(url, error);

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
            dispatch({ type: types.success, payload: data, meta });
        }

        if (data.image) {
            uploadImage(data);
        }

        return data;
    }
};

const uploadImage = (hit) => {
    let url = `${Config.API_URL}ba/hits/${hit.id}`;

    return RNFetchBlob.fetch('POST', url, {
        Authorization : `Bearer ${this.props.login.accessToken}`,
        'Content-Type' : 'multipart/form-data',

    }, [
        { name: 'image', type: 'image/jpg', filename : 'hit-image.png', data: RNFetchBlob.wrap(hit.image)},
        { name: 'hit_id', data: hit.id.toString() }
    ]);
};

export const apiCallWithImage= ({ dispatch, url, method = 'get', types, body, originalBody, meta, getState }) => {
    let loginState = getState().login;

    const opts = {
        method,
        headers: {
            'content-type': 'multipart/form-data',
            'accept': 'application/json',
            'authorization': `Bearer ${loginState.accessToken}`
        }
    };

    if (types && types.start) {
        dispatch({ type: types.start, payload: originalBody, meta });
    }

    let data = [
        { name: 'image', type: 'image/jpg', filename : 'hit-image.png', data: RNFetchBlob.wrap(body.image)},
        { name: 'name', data: body.name },
        { name: 'email', data: body.email },
        { name: 'contact_number', data: body.contact_number },
        { name: 'answers', data: JSON.stringify(body.answers) },
        { name: 'id', data: body.id },
        { name: '_isNew', data: '1' }
    ];

    return RNFetchBlob.fetch('POST', HOST + url, opts.headers, data)
        .then(res => {
            console.log('middleware', res);
            if (!res.ok) {
                throw new HttpError(res.data, res);
            }

            return res.data;
        })
        .then(onSuccess)
        .catch(onError);

    function onError(error) {
        error = (error instanceof HttpError) ? error : new NetworkError(error, url);

        if ((error instanceof NetworkError) || error.status >= 500) {
            return onNoConnection(error);
        }
        // console.log(url, error);

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
            dispatch({ type: types.success, payload: data, meta });
        }
        return data;
    }
};

console.ignoredYellowBox = [
    'Possible Unhandled Promise Rejection'
].concat(console.ignoredYellowBox);