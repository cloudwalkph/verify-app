import React, { Component } from 'react';
import {
    View,
    TextInput,
    Text,
    TouchableHighlight,
    StyleSheet,
    StatusBar,
    NetInfo
} from 'react-native';
import { connect } from 'react-redux';
import ContextMenu from '../_common/ContextMenu';

import Menu, { MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';

import { getActiveEvents } from './events.reducer';
import { syncEvents } from './events.action';

class Events extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedEvent: null,
            selectedLocation: null,
            locations: [],
        };
    }

    componentWillMount() {
        // NetInfo.addEventListener('change', (reach) =>
        //     reach !== 'none' && this.props.onRefresh({silent: true})
        // );

        this.props.onRefresh({silent: true})
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('change');
    }

    _onEventSelected = (value) => {
        const { events } = this.props;
        let index = events.findIndex((item) => { return item.id === value });

        if (index >= 0) {
            let selectedEvent = events[index];

            this.setState({
                selectedEvent,
                locations: selectedEvent.locations
            });
        }
    };

    _onLocationSelected = (value) => {
        const { locations } = this.state;
        let index = locations.findIndex((item) => { return item.id === value });

        if (index >= 0) {
            let selectedLocation = locations[index];

            this.setState({
                selectedLocation
            });
        }
    };

    render() {
        const { events, status } = this.props;
        const { selectedEvent, selectedLocation, locations } = this.state;

        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#282928"
                    barStyle="light-content"
                />

                <View style={styles.dropDownContainer}>
                    <Text style={styles.label}>Select an Event</Text>

                    <Menu onSelect={this._onEventSelected}>
                        <MenuTrigger>
                            <Text style={styles.textInput}>{selectedEvent ? selectedEvent.name : 'Select an Event'}</Text>
                        </MenuTrigger>
                        <MenuOptions>
                            {events.map((event, key) => {
                                return (
                                    <MenuOption value={event.id} key={key}>
                                        <Text>{event.name}</Text>
                                    </MenuOption>
                                )
                            })}


                        </MenuOptions>
                    </Menu>

                    <Text style={styles.label}>Select location</Text>
                    <Menu onSelect={this._onLocationSelected}>
                        <MenuTrigger disabled={!selectedEvent}>
                            <Text style={styles.textInput}>{selectedLocation ? selectedLocation.name : 'Select an Event Location'}</Text>
                        </MenuTrigger>
                        <MenuOptions>
                            {locations.map((location, key) => {
                                return (
                                    <MenuOption value={location.id} key={key}>
                                        <Text>{location.name}</Text>
                                    </MenuOption>
                                )
                            })}
                        </MenuOptions>
                    </Menu>

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
    title: ({ state }) => `Event and Location Selection`,

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
        justifyContent: 'center'
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
        events: getActiveEvents(state),
        status: state.events.status
    }
}


export default connect(mapStateToProps, {
    onRefresh: syncEvents
})(Events);