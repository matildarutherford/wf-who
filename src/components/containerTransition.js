import React, { Component } from 'react'
import { Transition } from 'react-transition-group'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// NOTE: Page transitions don't exit correctly due to an issue with Reach Router in Gatsby v2
// gatsby-plugin-page-transition doesn't fire the 'exit' event, so the exiting styles don't get applied
// So rather than remove the page transitions altogether, we've just set the duration/timeout to 0ms
const pageTransitionEvent = 'gatsby-plugin-page-transition::exit';

const defaultTransitionStyles = {
  common: {
    position: 'absolute',
    height: '100%',
    width: '100%'
  },
  left: {
    left: '-100%',
    right: 'auto',
    transitionProperty: 'left'
  },
  right: {
    right: '-100%',
    left: 'auto',
    transitionProperty: 'right'
  }
}

const transitionStyles = {
  left: {
    entering: { left: '-100%', right: 'auto' },
    entered: { left: '0', right: 'auto' },
    exiting: { left: '-100%', right: 'auto' }
  },
  right: {
    entering: { right: '-100%', left: 'auto' },
    entered: { right: '0', left: 'auto' },
    exiting: { right: '-100%', left: 'auto' }
  }
}

class ContainerTransition extends Component {
  constructor (props) {
    super(props);
    this.handleTransitionEvent = this.handleTransitionEvent.bind(this);
    this.state = {
      in: false
    };
  }

  componentDidMount() {
    global.window.addEventListener(pageTransitionEvent, this.handleTransitionEvent);
    this.setState({
      in: true
    });
  }

  handleTransitionEvent(e) {
    this.setState({
      in: false
    });
  }

  componentWillUnmount() {
    global.window.removeEventListener(pageTransitionEvent, this.handleTransitionEvent);
  }

  render() {
    const { direction = 'left', children } = this.props;

    return(
      <Transition in={this.state.in} timeout={0}>
        {(state) => (
        <Container style={{
          ...defaultTransitionStyles[direction],
          ...transitionStyles[direction][state]
        }}>
          {children}
        </Container>
      )}
      </Transition>
    )
  }
}

export default ContainerTransition

const Container = styled.div`
  align-items: inherit;
  display: flex;
  flex-direction: inherit;
  justify-content: inherit;
  transition: transform 0ms ease-in-out;
`

ContainerTransition.propTypes = {
  children: PropTypes.node.isRequired,
}
