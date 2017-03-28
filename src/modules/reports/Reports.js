import React, { Component } from 'react';
import {
    View,
    TextInput,
    TouchableHighlight,
    StyleSheet,
    StatusBar,
    ScrollView,
    Image,
    Alert
} from 'react-native';

import { Text, Button, Container, Footer, Content, H3, Segment, Picker, Item,
    FooterTab, Icon, Header, Body, Title, Left, Right, ListItem, Thumbnail } from 'native-base';

import ContextMenu from '../_common/ContextMenu';

import { connect } from 'react-redux';

import {
    doLogout
} from '../login/login.action';

import { getActiveHits } from '../hits/hits.reducer';

import { getActiveEvents } from '../events_selector/events.reducer';
import { syncEvents } from '../events_selector/events.action';

class Reports extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedEvent: null,
            selectedLocation: null,
            locations: [],
        };
    }

    async componentWillMount() {
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

    render() {
        const { navigate } = this.props.navigation;
        const { events, status, reports } = this.props;
        const { selectedEvent, selectedLocation, locations } = this.state;

        return (
            <Container>
                <Header>
                    <Body>
                    <Title>Reports</Title>
                    </Body>
                </Header>

                <ScrollView style={styles.container}>
                    <Content>
                        <View>
                            <Text style={{color: '#f47f20'}}>Select an Event</Text>
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
                            <Text style={{color: '#f47f20'}}>Select location</Text>
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
                        </View>

                        <H3>Hits:</H3>
                        <Segment>
                            <Button first><Text>Male: 6</Text></Button>
                            <Button><Text>Female: 4</Text></Button>
                            <Button last><Text>Total: 10</Text></Button>
                        </Segment>


                        {reports.map((report, key) => {
                            return (
                                <ListItem avatar key={key}>
                                    <Left>
                                        <Thumbnail square source={report.img ? { isStatic: true, uri: report.img, } : require('./images/thompson.png')} />
                                    </Left>
                                    <Body>
                                    <Text>{report.name}</Text>
                                    <Text note>{report.email}</Text>
                                    <Text note>{report.contact_number}</Text>
                                    <Text note>{report.gender}</Text>
                                    </Body>
                                    <Right>
                                        <Text note>{report.created_at}</Text>
                                    </Right>
                                </ListItem>
                            )
                        })}
                    </Content>
                </ScrollView>

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

Reports.navigationOptions = {
    title: `Reports`,

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
        backgroundColor: '#282928',
    },
    headerTitle: {
        color: '#fff'
    },
    inputContainer: {
        flex: 2,
        flexDirection: 'column',
        marginBottom: 20
    },
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#383938'
    },
    optionsContainer: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: 10
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
    },
    imgContainer: {
        flex: 1,
        alignItems: 'center',
        height: null
    },
    img: {
        width: 100,
        height: 150,
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    }
});

function mapStateToProps(state) {
    return {
        events: getActiveEvents(state),
        login: state.login,
        reports: getActiveHits(state)
    }
}

export default connect(mapStateToProps, {
    onRefresh: syncEvents,
    doLogout,
})(Reports);