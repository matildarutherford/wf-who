import React, { Component } from 'react'
import styled from 'styled-components'
import { db } from '../config/firebase'
import { connect } from 'react-redux'
import { navigate } from 'gatsby'

// Components
import Layout from '../components/layout'
import Main from '../components/main'


// CSS
import { colours, timings } from '../styles/variables'
import { above } from '../styles/mixins'
import { BaseLink, WhiteContainer, BlackContainer } from '../styles/global'

class GuessPage extends Component {
  constructor() {
    super();
    this.state = {
      names: [],
      guesses: [],
      photos: [],
      currentPhoto: 0,
      loaded: false,
      collectionId: `session-${new Date().getTime()}`
    };
  }

  shuffle(arr) {
    return arr
      .map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
  }

  componentDidMount() {
    db.collection('photos').get().then((snapshot) => {
      snapshot.forEach((doc) => {
        this.setState((prevState) => ({
          names: [...prevState.names, doc.data().name],
          photos: [...prevState.photos, {
            id: doc.id,
            photo: doc.data().photo
          }]
        }));
      })
    }).then(() => {
      this.setState((prevState) => ({
        loaded: true,
        names: prevState.names.sort(),
        photos: this.shuffle(prevState.photos)
      }));
    });
  }

  hasFinished() {
    return this.state.guesses.length === this.state.names.length;
  }

  back(e) {
    if (this.state.currentPhoto > 0) {
      e.preventDefault();
      this.setState((prevState) => ({ currentPhoto: prevState.currentPhoto-1 }));
    } else {
      navigate('/play');
    }
  }

  next() {
    if (this.state.currentPhoto < this.state.photos.length-1) {
      this.setState((prevState) => ({ currentPhoto: prevState.currentPhoto+1 }));
    } else {
      this.setState((prevState) => ({ currentPhoto: 0 }));
    }
  }

  guess(value) {
    const guess = {
      photo: this.state.photos[this.state.currentPhoto].id,
      name: value
    };

    this.setState((prevState) => ({ guesses: [...prevState.guesses, guess]}));

    db.collection('guesses').doc(this.props.name).collection(this.state.collectionId).add(guess).then(() => {
      // Loading?
    });

    this.next();

    // TODO - When parsing results, find a) complete collection b) ordered by timestamp
  }

  render() {
    return (
      <Layout>
        <Main>
          {this.state.loaded ? <BackLink to="/play" onClick={() => this.back()}>Back</BackLink> : null}
          {this.state.loaded && !this.hasFinished() ? <NextLink to="/guess" onClick={(e) => this.next(e)}>Next</NextLink> : null}
          {this.state.loaded && this.hasFinished() ? <SubmitLink to="/thanks">Submit</SubmitLink> : null}
          <WhiteContainerCenter>
            <Heading right bottom>Baby</Heading>
            <ImageContainer>
              {this.state.loaded ? (<Image src={this.state.photos[this.state.currentPhoto].photo}/>) : null}
            </ImageContainer>
          </WhiteContainerCenter>
          <BlackContainerCenter>
            <Heading left top>Face</Heading>
            <NamesList>
              {this.state.names.map((name, index) => {
                return (
                  <NamesListItem key={index}>
                    <GuessButton disabled={this.state.guesses.filter((guess) => guess.name === name).length} onClick={() => this.guess(name)}>{ name }</GuessButton>
                  </NamesListItem>
                );
              })}
            </NamesList>
          </BlackContainerCenter>
        </Main>
      </Layout>
    )
  }
}


const mapStateToProps = state => {
  return {
    name: state.name
  }
}

export default connect(
  mapStateToProps
)(GuessPage)

const WhiteContainerCenter = styled(WhiteContainer)`
  align-items: center;
  justify-content: center;

  ${above.md`
    align-items: center;
    justify-content: center;
  `}
`

const BlackContainerCenter = styled(BlackContainer)`
  align-items: center;
  justify-content: center;

  ${above.md`
    align-items: center;
    justify-content: center;
  `}
`

const NextLink = styled(BaseLink)`
  bottom: 0;
  color: ${colours.white};
  right: 0;
`

const SubmitLink = styled(NextLink)``

const BackLink = styled(BaseLink)`
  bottom: 0;
  color: ${colours.black};
  left: 0;
`

const NamesList = styled.ul`
  columns: 2;
  display: block;
  width: 66%;
`

const NamesListItem = styled.li`
  display: block;
  line-height: 3;
`

const Heading = styled.h4`
  position: absolute;
  font-size: 2rem;
  transform: translateY(-50%);
  ${props => props.bottom ? 'bottom: -1rem;' : ''}
  ${props => props.top ? 'top: 2rem;' : ''}

  ${above.md`
    top: 50%;
    bottom: auto;
    ${props => props.right ? 'right: .5rem;' : ''}
    ${props => props.left ? 'left: .5rem;' : ''}
  `}
`

const GuessButton = styled.button`
  background: none;
  border: none;
  color: currentColor;
  font-family: 'Gotham Book', sans-serif;
  font-size: 1rem;
  font-weight: normal;
  outline: none;
  text-decoration: none;
  transition: color ${timings.sm}s ease-in-out;

  &:hover {
    color: ${colours.gold};
    cursor: pointer;
    font-style: italic;
  }

  &[disabled] {
    color: ${colours.white};
    font-style: normal;
    opacity: .5;
    text-decoration: line-through;
  }
`

const ImageContainer = styled.div`
  display: block;
  width: 66%;
`

const Image = styled.img`
  height: auto;
  max-height: 80%;
  width: 100%;
`
