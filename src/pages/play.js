import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { navigate } from 'gatsby'

// Components
import Layout from '../components/layout'
import SubHeading from '../components/subheading'
import Main from '../components/main'

// CSS
import { colours, spacing } from '../styles/variables'
import { BaseLink, WhiteContainer, BlackContainer } from '../styles/global'


class PlayPage extends Component {
  componentDidMount() {
    this.nameInput.focus();
  }

  render() {
    const { name, register } = this.props;
    return (
      <Layout>
        <Main>
          {name ? (<GuessLink to="/guess">Next</GuessLink>) : null}

          <WhiteContainer>
            <SubHeading>Your name</SubHeading>
          </WhiteContainer>
          <BlackContainer>
            <form method="post" onSubmit={(e) => { e.preventDefault(); return navigate('/guess');}}>
              <Input type="text" name="name" ref={(input) => { this.nameInput = input; }} value={name} onChange={(e) => register(e.target.value)}/>
            </form>
          </BlackContainer>
        </Main>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.name
  }
}

const mapDispatchToProps = dispatch => {
  return {
    register: (name) =>
      dispatch({
        type: 'REGISTER',
        name: name
      })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayPage)


const Input = styled.input`
  background: ${colours.black};
  border-bottom: 3px solid ${colours.white};
  border-left: 0;
  border-right: 0;
  border-top: 0;
  color: ${colours.white};
  font-family: 'Gotham Book', sans-serif;
  font-size: 2rem;
  min-width: 20rem;
  outline: 0;
  padding: ${spacing.xs};
  text-align: center;
`

const GuessLink = styled(BaseLink)`
  right: 0;
  bottom: 0;
  color: ${colours.white};
`
