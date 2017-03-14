import React, { Component, PropTypes } from 'react';
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
    constructor(props) {
        super(props)

        this.state = {
            email: 'sampler1@insite.com',
            password: 'password'
        }
    };

    _onPressButton = (e) => {
        const { email, password } = this.state;

        this.props.doLoginRemote(email, password);
    };

    componentDidMount() {
        const { login, nav } = this.props;

        if (login.authenticated) {
            nav('Home');
        }
    }

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

                <View style={styles.labelContainer}>
                    <Text style={styles.label}>Please log in to access AAI Tracker</Text>
                </View>

                <View style={styles.loginContainer}>
                    <TextInput keyboardType="email-address"
                               style={styles.textInput}
                               ref="email"
                               underlineColorAndroid="transparent"
                               onChangeText={(email) => this.setState({email})}
                               defaultValue={`sampler1@insite.com`}
                               placeholder="Email" returnKeyType="next" />

                    <TextInput placeholder="Password"
                               underlineColorAndroid="transparent"
                               style={styles.textInput}
                               ref="password"
                               onChangeText={(password) => this.setState({password})}
                               defaultValue={`password`}
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

Login.propTypes = {
    login: PropTypes.object.isRequired,
    doLoginRemote: PropTypes.func.isRequired
};

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
    },
    labelContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    label: {
        color: '#fff'
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