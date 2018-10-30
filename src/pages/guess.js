import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { graphql } from 'gatsby'
import { guessesRef } from '../config/firebase'

// Components
import Layout from '../components/layout'
import Main from '../components/main'

// CSS
import { colours } from '../styles/variables'
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
  return (
  <Layout>
    <Main>
      <PlayLink to="/play">Play</PlayLink>
      <WhiteContainer>
        Photo
      </WhiteContainer>
      <BlackContainer>
        {data && data.dataJson.photos && data.dataJson.photos.map((photo, index) => {
          return (<button key={index} onClick={() => guess(photo)}>{ photo.name }</button>);
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
    guess: (guess) => {
      guessesRef.push().set(guess);
      return dispatch({
        type: 'VOTE',
        name: guess.name,
        photo: guess.photo
      })
    }
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
