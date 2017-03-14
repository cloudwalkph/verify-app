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
import ContextMenu from '../_common/ContextMenu';

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
                    <TextInput style={styles.textInput}
                               underlineColorAndroid="transparent"
                               placeholder="Select Event" />

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

Events.navigationOptions = {
    title: ({ state }) => `HOME`,

    header: ({ state, setParams }) => ({
        // Render a button on the right side of the header
        // When pressed switches the screen to edit mode.
        right: (
            <ContextMenu />
        ),

        style: styles.header,
        titleStyle: styles.headerTitle,
    })
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#282928'
    },
    headerTitle: {
        color: '#fff'
    },
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