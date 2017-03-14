import React, { Component } from 'react';
import {
    View,
    TextInput,
    Text,
    TouchableHighlight,
    StyleSheet,
    StatusBar
} from 'react-native';
import { connect } from 'react-redux';

import Menu, { MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';

class Events extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#282928"
                    barStyle="light-content"
                />

                <View style={styles.dropDownContainer}>
                    <Text style={styles.label}>Select an Event</Text>

                    <Menu>
                        <MenuTrigger>
                            <Text style={styles.textInput}>Select an Event</Text>
                        </MenuTrigger>
                        <MenuOptions>
                            <MenuOption value={1}>
                                <Text>Magnum</Text>
                            </MenuOption>
                            <MenuOption value={2}>
                                <Text>Wyeth</Text>
                            </MenuOption>
                        </MenuOptions>
                    </Menu>

                    <Text style={styles.label}>Select location</Text>
                    <TextInput style={styles.textInput}
                               underlineColorAndroid="transparent"
                               placeholder="Select Location" />

                    <TouchableHighlight style={styles.button}
                                        underlayColor="#D66F1C"
                                        onPress={this._onPressButton}>
                        <Text style={styles.btnText}>Go to Poll</Text>
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
    dropDownContainer: {
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
    label: {
        color: '#f47f20'
    }
});

function mapStateToProps(state) {
    return {
        events: state.events
    }
}


export default connect(mapStateToProps, {

})(Events);