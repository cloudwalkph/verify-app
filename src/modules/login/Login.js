import React, { Component, PropTypes } from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';
import { connect } from 'react-redux';

import { Button, Text, Item, Input, Icon } from 'native-base';

import {
    doLoginRemote
} from './login.action';

import VerifyLogo from './logo-verify.png';

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: 'ba1@verify.com',
            password: 'password'
        }
    };

    _onPressButton = (e) => {
        const { email, password } = this.state;

        this.props.doLoginRemote(email, password);
    };

    componentDidMount() {
        const { login, navigation } = this.props;

        if (login.authenticated) {
            navigation.navigate('Events');
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
                    <Text>Please log in to access AAI Tracker</Text>
                </View>

                <View style={styles.loginContainer}>
                    <Item regular>
                        <Icon active name='mail' style={{color: '#fff'}} />
                        <Input keyboardType="email-address"
                               ref="email"
                               underlineColorAndroid="transparent"
                               onChangeText={(email) => this.setState({email})}
                               defaultValue={`sampler1@insite.com`}
                               placeholder="E-mail Address" returnKeyType="next" />
                    </Item>
                    <Item regular>
                        <Icon active name='vpn-key' style={{color: '#fff'}} />
                        <Input placeholder="Password"
                               underlineColorAndroid="transparent"
                               ref="password"
                               onChangeText={(password) => this.setState({password})}
                               defaultValue={`password`}
                               returnKeyType="done" secureTextEntry={true} />
                    </Item>
                    <View style={{marginTop: 20}}>
                        <Button primary block onPress={this._onPressButton}>
                            <Text style={{fontSize: 15}}>Sign In</Text>
                        </Button>
                    </View>
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
    },
});


function mapStateToProps(state) {
    return {
        login: state.login
    }
}

export default connect(mapStateToProps, {
    doLoginRemote
})(Login);