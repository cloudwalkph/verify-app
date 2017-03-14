import React, { Component } from 'react';
import {
    View,
    TextInput,
    Text,
    TouchableHighlight,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';
import { connect } from 'react-redux';

import {
    doLoginRemote
} from './login.action';

import VerifyLogo from './logo-verify.png';

class Login extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#282928"
                    barStyle="light-content"
                />

                <View style={styles.logoContainer}>
                    <Image source={VerifyLogo} resizeMode="contain" style={styles.logo} />
                </View>

                <View style={styles.loginContainer}>
                    <TextInput keyboardType="email-address"
                               style={styles.textInput}
                               underlineColorAndroid="transparent"
                               placeholder="Email" returnKeyType="next" />

                    <TextInput placeholder="Password"
                               underlineColorAndroid="transparent"
                               style={styles.textInput}
                               returnKeyType="done" secureTextEntry={true} />

                    <TouchableHighlight style={styles.button}
                                        underlayColor="#D66F1C"
                                        onPress={this._onPressButton}>
                        <Text style={styles.btnText}>Sign In</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        backgroundColor: '#383938'
    },
    loginContainer: {
        flex: 2,
        flexDirection: 'column',
    },
    textInput: {
        backgroundColor: '#fff',
        marginTop: 5,
        marginBottom: 5,
        borderColor: '#323332',
        borderWidth: 1,
        padding: 5
    },
    button: {
        backgroundColor: '#f47f20',
        alignItems: 'center',
        padding: 10,
        marginTop: 10
    },
    btnText: {
        color: '#fff'
    },
    logoContainer: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: null
    },
    logo: {
        width: 350,
        marginTop: 20
    }
});


function mapStateToProps(state) {
    return {
        login: state.login
    }
}

export default connect(mapStateToProps, {
    doLoginRemote
})(Login);