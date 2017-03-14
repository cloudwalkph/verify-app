import store from 'react-native-simple-store';

export const getAuthToken = () => {
    return store.get('token')
        .then((token) => token);
};

export const setAuthToken = (token) => {
    store.save('token', token).then(token => {});
};

export const deleteAuthToken = () => {
    store.delete('token').then(token => {});
};