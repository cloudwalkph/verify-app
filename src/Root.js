import React from 'react';
import {Component, View, Text} from 'react-native'
import { Provider } from 'react-redux';

import { StyleProvider } from 'native-base';
import getTheme from '../native-base-theme/components';
import theme from '../native-base-theme/variables/commonColor';

import store from './store/configStore';
import App from './App';

const Root = () => (
    <StyleProvider style={getTheme(theme)}>
        <Provider store={store}>
            <App />
        </Provider>
    </StyleProvider>
);

export default Root;