import React, { Component } from 'react';
import { Alert, Text, View } from 'react-native';
import Menu, { MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';
import { connect } from 'react-redux';

import {
    doLogout
} from '../../login/login.action';

class ContextMenu extends Component {
    _onMenuSelected = (value) => {
        // const { navigation } = this.props;
        //
        // switch (value) {
        //     case 'reports':
        //         navigation.navigate('Reports');
        //         break;
        //     default:
        //         navigation.navigate('Reports');
        // }
    };

    render() {
        return (
            <View style={{ padding: 20, flexDirection: 'row' }}>
                <Menu>
                    <MenuTrigger>
                        <Text style={{ fontSize: 20, padding: 5, color: '#fff' }}>&#8942; hello</Text>
                    </MenuTrigger>
                    <MenuOptions>
                        <MenuOption>
                            <Text>Sync</Text>
                        </MenuOption>
                        <MenuOption>
                            <Text>Reports</Text>
                        </MenuOption>
                        <MenuOption>
                            <Text onPress={() => Alert.alert(
                                'Confirmation',
                                'Are you sure you want to log out?',
                                [
                                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                                  {text: 'OK', onPress: () => this.props.doLogout()},
                                ]
                              )}>Logout</Text>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        nav: state.nav,
        login: state.login
    }
}

export default connect(mapStateToProps, {
    doLogout
})(ContextMenu);