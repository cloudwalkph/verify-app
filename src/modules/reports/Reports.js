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

import { Text, Button, Container, Footer, Content, H3, Segment,
    FooterTab, Icon, Header, Body, Title, Left, Right, ListItem, Thumbnail } from 'native-base';

import ContextMenu from '../_common/ContextMenu';
import CameraImg from './images/camera.png';

import { connect } from 'react-redux';

import {
    doLogout
} from '../login/login.action';

class Reports extends Component {
    render() {
        const { navigate } = this.props.navigation;
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
            <Container>
                <Header>
                    <Body>
                    <Title>Reports</Title>
                    </Body>
                </Header>

                <ScrollView style={styles.container}>
                    <Content>
                        <H3>Hits:</H3>
                        <Segment>
                            <Button first><Text>Male: 6</Text></Button>
                            <Button><Text>Female: 4</Text></Button>
                            <Button last><Text>Total: 10</Text></Button>
                        </Segment>


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
        login: state.login
    }
}

export default connect(mapStateToProps, {
    doLogout
})(Reports);