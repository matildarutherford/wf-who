import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { graphql } from 'gatsby'

// Components
import Layout from '../components/layout'
import Heading from '../components/heading'
import Main from '../components/main'

// CSS
import { above } from '../styles/mixins'
import { colours, spacing } from '../styles/variables'
import { BaseLink, WhiteContainer, BlackContainer } from '../styles/global'

export const query = graphql`
  query {
    dataJson {
      photos {
        name,
        photo
      }
    }
  }
`

const GuessPage = ({ guesses, guess, data }) => {
  console.log(data);
  return (
  <Layout>
    <Main>
      <PlayLink to="/play">Play</PlayLink>
      <WhiteContainer>
        Photo
      </WhiteContainer>
      <BlackContainer>
        {data && data.dataJson.photos && data.dataJson.photos.map((photo, index) => {
          return (<a key={index} onClick={() => guess(photo)}>{ photo.name }</a>);
        })}
      </BlackContainer>
    </Main>
  </Layout>
)}


const mapStateToProps = state => {
  return {
    guesses: state.guesses.length
  }
}

const mapDispatchToProps = dispatch => {
  return {
    guess: (guess) =>
      dispatch({
        type: 'VOTE',
        name: guess.name,
        photo: guess.photo
      })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GuessPage)

const PlayLink = styled(BaseLink)`
  right: 0;
  bottom: 0;
  color: ${colours.white};
`
