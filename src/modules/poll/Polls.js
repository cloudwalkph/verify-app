import React, { Component } from 'react';
import {
    View,
    TextInput,
    Text,
    Image,
    TouchableHighlight,
    StyleSheet,
    StatusBar,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import ContextMenu from '../_common/ContextMenu';

import { SegmentedControls } from 'react-native-radio-buttons';

import Menu, { MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';

import CameraImg from './camera.png';

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
            <ScrollView style={styles.container}>
                <View style={styles.imgContainer}>
                    <TouchableHighlight onPress={() => navigate('Camera') }>
                        <Image source={camera.picture ? { isStatic: true, uri: camera.picture, } : CameraImg} resizeMode="contain"
                               style={styles.img} />
                    </TouchableHighlight>
                </View>
                <View>
                    <View style={styles.optionsContainer}>
                        <SegmentedControls
                            tint={'#f47f20'}
                            selectedTint= {'white'}
                            backTint= {'#555'}
                            options={ genderOptions }
                            extractText={ (option) => option.label }
                            allowFontScaling={ false } // default: true
                            onSelection={ this.setSelectedOption.bind(this) }
                            optionContainerStyle={{flex: 1}}
                        />
                    </View>
                    <View style={styles.optionsContainer}>
                        <SegmentedControls
                            tint={'#f47f20'}
                            selectedTint= {'white'}
                            backTint= {'#555'}
                            options={ ageOptions }
                            extractText={ (option) => option.label }
                            onSelection={ this.setSelectedOption.bind(this) }
                            optionContainerStyle={{flex: 1}}
                        />
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

                    <TouchableHighlight style={styles.button}
                                        underlayColor="#D66F1C"
                                        onPress={this._onPressButton}>
                        <Text style={styles.btnText}>Save Answer</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
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
    })
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#282928'
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
        camera: state.camera
    }
}


export default connect(mapStateToProps, {

})(Polls);