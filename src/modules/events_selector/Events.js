import React, { Component } from 'react';
import {
    View,
    TextInput,
    TouchableHighlight,
    StyleSheet,
    StatusBar,
    NetInfo
} from 'react-native';
import { connect } from 'react-redux';
import ContextMenu from '../_common/ContextMenu';

import { Picker, Item, Text, Button } from 'native-base';

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
                selectedEvent: value,
                selectedLocation: null,
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
                selectedLocation: value
            });
        }
    };

    _onPressButton = (e) => {
        const { navigation } = this.props;
        const { selectedEvent, selectedLocation } = this.state;

        if (! selectedEvent) {
            return false;
        }

        if (! selectedLocation) {
            return false;
        }

        navigation.navigate('Polls', {selectedEvent, selectedLocation});
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
                    <Text style={{color: '#f47f20',fontSize: 20}}>Select an Event</Text>

                    <Picker
                        style={{ backgroundColor: '#fff',borderColor: '#323332' }}
                        iosHeader="Select one"
                        mode="dropdown"
                        selectedValue={selectedEvent}
                        onValueChange={this._onEventSelected.bind(this)} >
                        {events.map((event, key) => {
                            return (
                                    <Item label={event.name} value={event.id} key={key} />
                            )
                        })}
                    </Picker>

                    <View style={{marginTop: 10}} />
                    <Text style={{color: '#f47f20',fontSize: 20}}>Select location</Text>
                    <Picker
                        style={{ backgroundColor: '#fff',borderColor: '#323332' }}
                        disabled={!selectedEvent}
                        iosHeader="Select one"
                        mode="dropdown"
                        selectedValue={selectedLocation}
                        onValueChange={this._onLocationSelected.bind(this)} >
                        {locations.map((location, key) => {
                            return (
                                <Item label={location.name} value={location.id} key={key} />
                            )
                        })}
                    </Picker>

                    <View style={{marginTop: 20}}>
                        <Button primary block onPress={this._onPressButton}>
                            <Text style={{fontSize: 15}}>Go to Poll</Text>
                        </Button>
                    </View>

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
        padding: 10,
        fontSize: 15
    },
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