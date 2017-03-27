import React, { Component, PropTypes } from 'react';
import { Container, Content } from 'native-base';
import ButtonItem from './ButtonItem';

class ButtonGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeIndex: 0
        }
    }

    _setActiveIndex = (index) => {
        this.setState({
            activeIndex: index
        })
    };

    render() {
        const { items } = this.props;
        const { activeIndex } = this.state;

        return (
            <Content>
                {items.map((button, i) => {
                    return <ButtonItem key={i}
                                       index={i}
                                       activeIndex={activeIndex}
                                       setActive={this._setActiveIndex}
                                       text={button.text} />
                })}
            </Content>
        )
    }
}

export default ButtonGroup;