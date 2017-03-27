import React, { Component } from 'react';
import {
    View,
    TextInput,
    Text,
    Image,
    TouchableHighlight,
    StyleSheet,
    StatusBar,
    ScrollView,
    Alert
} from 'react-native';
import { connect } from 'react-redux';
import ContextMenu from '../_common/ContextMenu';

import { SegmentedControls } from 'react-native-radio-buttons';

import Menu, { MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';

import { Button, Container, Footer,
    FooterTab, Icon, Header, Body, Title } from 'native-base';

import ButtonGroup from '../_common/ButtonGroup';

import CameraImg from './camera.png';

import {
    doLogout
} from '../login/login.action';

const ageGroupButtons = [
    {
        text: 'Below 11'
    },
    {
        text: '12 - 18'
    },
    {
        text: '19 - 30'
    },
    {
        text: '31 - 40'
    },
    {
        text: '41 - 50'
    },
    {
        text: '51 - 60'
    },
    {
        text: '60 Above'
    }
];

const genderGroupButtons = [
    {
        text: 'Male'
    },
    {
        text: 'Female'
    }
];

class Polls extends Component {
    setSelectedOption = (selectedOption) => {

    };

    render() {
        const { navigate } = this.props.navigation;
        const { camera } = this.props;

        genderOptions = [
            {
                label: 'Male',
                value: 'male'
            },
            {
                label: 'Female',
                value: 'female'
            }
        ];

        ageOptions = [
            {
                label: '15-20',
                value: '15-20'
            },
            {
                label: '21-25',
                value: '21-25'
            },
            {
                label: '26-30',
                value: '26-30'
            },
            {
                label: '31-35',
                value: '31-35'
            }
        ];

        const extractText = (option) => option.label;

        return (
            <Container>
                <Header>
                    <Body>
                        <Title>Event and Location Selection</Title>
                    </Body>
                </Header>

                <ScrollView style={styles.container}>
                    <View style={styles.imgContainer}>
                        <TouchableHighlight onPress={() => navigate('Camera') }>
                            <Image source={camera.picture ? { isStatic: true, uri: camera.picture, } : CameraImg} resizeMode="contain"
                                   style={styles.img} />
                        </TouchableHighlight>
                    </View>
                    <View>
                        <View style={styles.optionsContainer}>
                            <ButtonGroup items={genderGroupButtons} />
                        </View>
                        <View style={styles.optionsContainer}>
                            <ButtonGroup items={ageGroupButtons} />
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput style={styles.textInput}
                                   ref="name"
                                   underlineColorAndroid="transparent"
                                   placeholder="Name" returnKeyType="next" />

                        <Text style={styles.label}>Contact Number</Text>
                        <TextInput style={styles.textInput}
                                   ref="contact_number"
                                   underlineColorAndroid="transparent"
                                   placeholder="Contact Number" returnKeyType="next" />

                        <Text style={styles.label}>Email Address</Text>
                        <TextInput keyboardType="email-address"
                                   style={styles.textInput}
                                   ref="email"
                                   underlineColorAndroid="transparent"
                                   placeholder="Email Address" returnKeyType="done" />

                        <Button block primary onPress={this._onPressButton}>
                            <Text style={styles.btnText}>Save Answer</Text>
                        </Button>
                    </View>
                </ScrollView>

                <Footer >
                    <FooterTab>
                        <Button onPress={() => navigate('Home') }>
                            <Icon name="view-list" />
                            <Text style={styles.headerTitle}>Events</Text>
                        </Button>
                        <Button onPress={() => navigate('Reports') }>
                            <Icon name="insert-chart" />
                            <Text style={styles.headerTitle}>Reports</Text>
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
                            <Text style={styles.headerTitle}>Logout</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        )
    }
}

Polls.navigationOptions = {
    title: ({ state }) => `${state.params.selectedEvent.name ? state.params.selectedEvent.name : ''} - ${state.params.selectedLocation.name ? state.params.selectedLocation.name : ''}`,

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
        events: state.events,
        camera: state.camera,
        login: state.login
    }
}


export default connect(mapStateToProps, {
    doLogout
})(Polls);