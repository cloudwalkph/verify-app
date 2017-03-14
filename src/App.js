import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {connect} from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import AppNavigator from './routes';

import Login from './modules/login/Login';

class App extends Component {
    render() {
        const { status, login } = this.props;

        if (status.storageLoaded) {
            // Check if authenticated
            if (login.authenticated) {
                return (
                    <AppNavigator navigation={addNavigationHelpers({
                        dispatch: this.props.dispatch,
                        state: this.props.nav,
                    })} />
                )
            }

            // If not authenticated
            return <Login />
        } else {
            // If the storage is still loading
            return <View />
        }
    }
}

export default connect(state => state)(App);
