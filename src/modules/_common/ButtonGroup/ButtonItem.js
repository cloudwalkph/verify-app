import React, { Component, PropTypes } from 'react';
import { Button, Text } from 'native-base';

class ButtonItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false
        };
    }

    _handlePress = (e) => {
        this.setState({
            active: !this.state.active
        });

        this.props.setActive(this.props.index);
    };

    componentWillReceiveProps(nextProps) {
        const { index, activeIndex } = nextProps;

        if (index !== activeIndex) {
            this.setState({
                active: false
            });
        }
    }

    render() {
        const { text } = this.props;
        const { active } = this.state;

        if (active) {
            return (
                <Button onPress={this._handlePress} primary>
                    <Text>{ text }</Text>
                </Button>
            )
        }

        return (
            <Button disabled={active}
                    onPress={this._handlePress}
                    style={{ backgroundColor: '#b5b5b5' }}
                    primary>
                <Text>{ text }</Text>
            </Button>
        )
    }
}

ButtonItem.propTypes = {
    text: PropTypes.string.isRequired
};

export default ButtonItem;