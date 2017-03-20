import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, Text } from 'react-native';
import CameraView from 'react-native-camera';

class Camera extends Component {
    takePicture = () => {
        this.camera.capture()
            .then((data) => console.log(data))
            .catch(err => console.error(err));
    };

    render() {
        const { goBack } = this.props.navigation;

        return (
            <CameraView
                ref={(cam) => {
                        this.camera = cam;
                    }}
                style={styles.preview}
                aspect={CameraView.constants.Aspect.fill}>

                <TouchableHighlight onPress={() => goBack()}>
                    <Text style={styles.capture}>[BACK]</Text>
                </TouchableHighlight>

                <TouchableHighlight onPress={this.takePicture.bind(this)}>
                    <Text style={styles.capture}>[CAPTURE]</Text>
                </TouchableHighlight>

            </CameraView>
        )
    }
}

Camera.navigationOptions = {
    header: {
        visible: false
    }
};

const styles = StyleSheet.create({
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

export default Camera;