import React, { Component } from 'react';
import {
    View,
    TextInput,
    TouchableHighlight,
    StyleSheet,
    StatusBar,
    NetInfo,
    Alert,
    AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import ContextMenu from '../_common/ContextMenu';
import LoaderButton from '../_common/LoaderButton';

import { Picker, Item, Text, Button, Container, Footer,
    FooterTab, Icon, Header, Body, Title, Left, Right } from 'native-base';

import { getActiveEvents } from './events.reducer';
import { syncEvents } from './events.action';

import {
    doLogout
} from '../login/login.action';

class Events extends Component {
    constructor(props) {
        super(props)

        if (this.props.events.length) {
            this.state = {
                selectedEvent: this.props.events[0].id,
                selectedLocation: this.props.events[0].locations[0].id,
                locations: this.props.events[0].locations,
            };
        } else {
            this.state = {
                selectedEvent: null,
                selectedLocation: null,
                locations: [],
            };
        }

    }

    async componentWillMount() {
        NetInfo.addEventListener('change', (reach) =>
            reach !== 'none' && this.props.onRefresh({silent: true})
        );

        if (! this.props.events.length) {
            NetInfo.isConnected.fetch().then(isConnected => {
                if (! isConnected) {
                    alert('You are not connected to the internet');
                }

                this.props.onRefresh({silend: true});
            });
        }
        // this.props.onRefresh({silent: true})
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('change');
    }

    componentWillReceiveProps(nextProps) {
        if (! nextProps.status.refreshing && nextProps.events.length) {
            this.setState({
                selectedEvent: nextProps.events[0].id,
                selectedLocation: nextProps.events[0].locations[0].id,
                locations: nextProps.events[0].locations,
            })
        }
    }

    _onEventSelected = (value) => {
        const { events } = this.props;
        let index = events.findIndex((item) => { return item.id === value });

        if (index >= 0) {
            let selectedEvent = events[index];

            this.setState({
                selectedEvent: value,
                selectedLocation: selectedEvent.locations[0].id,
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
        const { navigate } = this.props.navigation;
        const { events, status } = this.props;
        const { selectedEvent, selectedLocation, locations } = this.state;

        return (
            <Container>
                <Header>
                    <Body>
                        <Title>Event and Location Selection</Title>
                    </Body>
                </Header>

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
                            mode="dialog"
                            prompt="Select an event"
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
                            mode="dialog"
                            prompt="Select a location"
                            selectedValue={selectedLocation}
                            onValueChange={this._onLocationSelected.bind(this)} >
                            {locations.map((location, key) => {
                                return (
                                    <Item label={location.name} value={location.id} key={key} />
                                )
                            })}
                        </Picker>

                        <View style={{marginTop: 20}}>
                            <LoaderButton
                                isLoading={false}
                                buttonProps={
                                {
                                    primary: true,
                                    block: true
                                }
                            }
                                text="Go to Poll"
                                onPress={this._onPressButton}
                            />
                        </View>

                    </View>
                </View>
                <Footer >
                    <FooterTab>
                        <Button onPress={() => navigate('Home') }>
                            <Icon name="view-list" />
                            <Text>Events</Text>
                        </Button>
                        <Button onPress={() => navigate('Reports') }>
                            <Icon name="insert-chart" />
                            <Text>Reports</Text>
                        </Button>
                        <Button onPress={() => Alert.alert(
                                'Confirmation',
                                'Are you sure you want to log out?',
                                [
                                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                                  {text: 'OK', onPress: () => this.props.doLogout()},
                                ]
                              )}>
                            <Icon name="power-settings-new" />
                            <Text>Logout</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
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
        visible: false
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
        status: state.events.status,
        login: state.login
    }
}


export default connect(mapStateToProps, {
    onRefresh: syncEvents,
    doLogout
})(Events);