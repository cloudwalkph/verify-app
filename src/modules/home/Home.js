import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { MenuContext } from 'react-native-menu';
import ContextMenu from '../_common/ContextMenu';

class Home extends Component {
    static navigationOptions = {

        title: ({ state }) => `HOME`,

        header: ({ state, setParams }) => ({
            // Render a button on the right side of the header
            // When pressed switches the screen to edit mode.
            right: (
                <ContextMenu />
            ),
        }),
    };

    render() {
        return (
            <View style={{alignItems: 'center'}}>
                <Text>Hello world</Text>
            </View>
        );
    }
}

export default Home;