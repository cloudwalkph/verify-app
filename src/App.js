import React from 'react';
import { Component, View, StyleSheet } from 'react-native';
import {connect} from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import AppNavigator from './routes';

const App = (props) => {
    return props.status.storageLoaded ? <AppNavigator navigation={addNavigationHelpers({
            dispatch: this.props.dispatch,
            state: this.props.nav,
        })} /> : <View/>
};

export default connect(state => state)(App);
