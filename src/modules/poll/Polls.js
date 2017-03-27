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

import { Button, Container, Footer, Picker, Item,
    FooterTab, Icon, Header, Body, Title } from 'native-base';

import CameraImg from './camera.png';

import {
    doLogout
} from '../login/login.action';

const ageGroupButtons = [
    {
        label: 'Below 11',
        value: 'below 11'
    },
    {
        label: '12 - 18',
        value: '12 - 18'
    },
    {
        label: '19 - 30',
        value: '19 - 30'
    },
    {
        label: '31 - 40',
        value: '31 - 40'
    },
    {
        label: '41 - 50',
        value: '41 - 50'
    },
    {
        label: '51 - 60',
        value: '51 - 60'
    },
    {
        label: '60 Above',
        value: '60 above'
    }
];

const genderGroupButtons = [
    {
        label: 'Male',
        value: 'male'
    },
    {
        label: 'Female',
        value: 'female'
    }
];

class Polls extends Component {
    setSelectedOption = (selectedOption) => {

    };

    constructor(props) {
        super(props)

        this.state = {
            selectedAge: null,
            selectedGender: null,
        };
    }

    _onAgeSelected = (value) => {
        this.setState({
            selectedAge: value,
        });
    };

    _onGenderSelected = (value) => {
        this.setState({
            selectedGender: value,
        });
    };

    render() {
        const { navigate } = this.props.navigation;
        const { camera } = this.props;
        const { selectedGender, selectedAge } = this.state;

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

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Select gender</Text>
                        <Picker
                            style={{ backgroundColor: '#fff',borderColor: '#323332' }}
                            iosHeader="Select one"
                            mode="dialog"
                            prompt="Select gender"
                            selectedValue={selectedGender}
                            onValueChange={this._onGenderSelected.bind(this)} >
                            {genderGroupButtons.map((gender, key) => {
                                return (
                                    <Item label={gender.label} value={gender.value} key={key} />
                                )
                            })}
                        </Picker>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Select age category</Text>
                        <Picker
                            style={{ backgroundColor: '#fff',borderColor: '#323332' }}
                            iosHeader="Select one"
                            mode="dialog"
                            prompt="Select age category"
                            selectedValue={selectedAge}
                            onValueChange={this._onAgeSelected.bind(this)} >
                            {ageGroupButtons.map((age, key) => {
                                return (
                                    <Item label={age.label} value={age.value} key={key} />
                                )
                            })}
                        </Picker>
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
        marginBottom: 10,
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
    },
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