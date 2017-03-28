import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TouchableHighlight, Text, Dimensions, View, Image } from 'react-native';
import CameraView from 'react-native-camera';
import { Icon, Button } from 'native-base';

import { takePicture, clearPicture } from './camera.action';

class Camera extends Component {
    constructor(props) {
        super(props);

        this.state = {
            path: null,
        };
    }

    _goBack = () => {
        const { navigate } = this.props.navigation;

        navigate('Polls');
        this.props.clearPicture();
    };

    _usePicture = () => {
        const { goBack } = this.props.navigation;

        goBack();
        this.props.takePicture(this.state.path);
    };

    renderCamera() {
        return (
            <CameraView
                ref={(cam) => {
                  this.camera = cam;
                }}
                captureQuality={CameraView.constants.CaptureQuality.medium}
                style={styles.preview}
                aspect={CameraView.constants.Aspect.fill}
                orientation={CameraView.constants.Orientation.portrait}
                captureTarget={CameraView.constants.CaptureTarget.disk}>
                <Button transparent bordered light
                    style={{position: 'absolute',
                            left: 20,
                            bottom: 15,
                            width: 66,
                            height: 66,
                            borderRadius: 35,
                            borderWidth: 3,}}
                    onPress={this._goBack} >
                    <Icon name="arrow-back" style={{color: '#fff'}} />
                </Button>

                <TouchableHighlight
                    style={styles.capture}
                    onPress={this.takePicture.bind(this)}
                    underlayColor="rgba(255, 255, 255, 0.5)"
                >
                    <View />
                </TouchableHighlight>
            </CameraView>
        );
    }

    takePicture() {
        this.camera.capture()
            .then((data) => {
                // alert('done');
                // console.log(data);
                this.setState({ path: data.path })
            })
            .catch(err => console.error(err));
    }

    renderImage() {
        return (
            <View>
                <Image
                    source={{ uri: this.state.path }}
                    style={styles.preview}
                />
                <Button primary
                        style={{position: 'absolute', right: 90, bottom: 20}}>
                    <Text style={styles.btnText}
                        onPress={() => this.setState({ path: null })}>
                        Cancel
                    </Text>
                </Button>
                <Button primary
                    style={{position: 'absolute', right: 20, bottom: 20}}>
                    <Text style={styles.btnText}
                        onPress={this._usePicture}>
                        Save
                    </Text>
                </Button>

            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.path ? this.renderImage() : this.renderCamera()}
            </View>
        );
    }

}

Camera.navigationOptions = {
    header: {
        visible: false
    }
};

const styles = StyleSheet.create({


    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
    capture: {
        width: 66,
        height: 66,
        borderRadius: 35,
        borderWidth: 3,
        borderColor: '#FFF',
        marginBottom: 15,
    },
    back: {
        position: 'absolute',
        left: 20,
        bottom: 15,
        width: 66,
        height: 66,
        borderRadius: 35,
        borderWidth: 3,
        borderColor: '#FFF',
    },
    btnText: {
        color: '#FFF',
        fontWeight: '600',
        fontSize: 17,
    },
});


function mapStateToProps(state) {
    return {
        camera: state.camera
    }
}

export default connect(mapStateToProps, {
    takePicture,
    clearPicture
})(Camera);