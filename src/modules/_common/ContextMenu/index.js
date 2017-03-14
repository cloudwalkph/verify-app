import React, { Component } from 'react';
import { Alert, Text, View } from 'react-native';
import Menu, { MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';
import { connect } from 'react-redux';

import {
    doLogout
} from '../../login/login.action';

class ContextMenu extends Component {
    _onMenuSelected = (value) => {
        // switch (value) {
        //     case 'logout':
        //         this.props.doLogout();
        //         break;
        //     default:
        //         this.props.doLogout();
        // }
    };

    render() {
        return (
            <View style={{ padding: 20, flexDirection: 'row' }}>
                <Menu onSelect={this._onMenuSelected}>
                    <MenuTrigger>
                        <Text style={{ fontSize: 20, padding: 5, color: '#fff' }}>&#8942;</Text>
                    </MenuTrigger>
                    <MenuOptions>
                        <MenuOption value={`sync`}>
                            <Text>Sync</Text>
                        </MenuOption>
                        <MenuOption value={`reports`}>
                            <Text>Reports</Text>
                        </MenuOption>
                        <MenuOption value={`logout`}>
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