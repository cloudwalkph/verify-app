import React, { Component, PropTypes } from 'react';
import {
    Button,
    Text,
    Spinner
} from 'native-base';

class LoaderButton extends Component {

    _handlePress = (e) => {
        this.props.onPress(e);
    };

    render() {
        const { buttonProps, text, isLoading } = this.props;

        if (isLoading) {
            return (
                <Button {...buttonProps} disabled>
                    <Spinner color="#fff" />
                </Button>
            )
        }

        return (
            <Button {...buttonProps} onPress={this._handlePress}>
                <Text>{text}</Text>
            </Button>
        )
    }
}

LoaderButton.propTypes = {
    onPress: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
};

export default LoaderButton;