import React, { Component } from 'react';
import {
    View,
    TextInput,
    TouchableHighlight,
    StyleSheet,
    StatusBar,
    ScrollView,
    Image
} from 'react-native';

import { Content, Left, Body, Right, ListItem, Thumbnail, Text } from 'native-base';

import ContextMenu from '../_common/ContextMenu';
import CameraImg from './images/camera.png';

class Reports extends Component {
    render() {
        sampleReports = [
            {
                name: 'Roy Mustang',
                contact_number: '09121231234',
                email: 'roy@email.com',
                gender: 'Male',
                img: 'robinson.png'
            },
            {
                name: 'Van Hohenheim',
                contact_number: '09121231235',
                email: 'van@email.com',
                gender: 'Male',
                img: 'robinson.png'
            },
            {
                name: 'Riza Hawkeye',
                contact_number: '09121231236',
                email: 'riza@email.com',
                gender: 'Female',
                img: 'thompson.png'
            },
            {
                name: 'Alphonse Elric',
                contact_number: '09121222234',
                email: 'alelric@email.com',
                gender: 'Male',
                img: 'robinson.png'
            },
            {
                name: 'Winry Rockbell',
                contact_number: '09126831234',
                email: 'winry@email.com',
                gender: 'Female',
                img: 'thompson.png'
            },
            {
                name: 'Izumi Curtis',
                contact_number: '09121277734',
                email: 'izumi@email.com',
                gender: 'Female',
                img: 'thompson.png'
            },
            {
                name: 'Edward Elric',
                contact_number: '09126831234',
                email: 'edelric@email.com',
                gender: 'Male',
                img: 'robinson.png'
            },
            {
                name: 'Maes Hughes',
                contact_number: '09126831234',
                email: 'maes@email.com',
                gender: 'Male',
                img: 'robinson.png'
            },
            {
                name: 'Alex Louis Armstrong',
                contact_number: '09126831234',
                email: 'louis@email.com',
                gender: 'Male',
                img: 'robinson.png'
            },
            {
                name: 'Olivier Mira Armstrong',
                contact_number: '09126831234',
                email: 'mira@email.com',
                gender: 'Female',
                img: 'thompson.png'
            },
        ];

        return (
            <ScrollView style={styles.container}>
                <Content>
                    {sampleReports.map((report, key) => {
                        return (
                            <ListItem avatar key={key}>
                                <Left>
                                    <Thumbnail square source={ require('./images/thompson.png') } />
                                </Left>
                                <Body>
                                <Text>{report.name}</Text>
                                <Text note>{report.email}</Text>
                                <Text note>{report.contact_number}</Text>
                                <Text note>{report.gender}</Text>
                                </Body>
                                <Right>
                                    <Text note>03/21/2017</Text>
                                    <Text note>1:30 pm</Text>
                                </Right>
                            </ListItem>
                        )
                    })}
                </Content>
            </ScrollView>
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

export default Reports;