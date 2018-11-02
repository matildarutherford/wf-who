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
      finished: false
    };
  }

  shuffle(arr) {
    return arr
      .map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
  }

  componentDidMount() {
    if (this.props.name === '') {
      return navigate('/play');
    }

    db.collection('photos').get().then((snapshot) => {
      snapshot.forEach((doc) => {
        this.setState((prevState) => ({
          names: [...prevState.names, doc.data().name],
          photos: [...prevState.photos, {
            id: doc.id,
            photo: doc.data().photo,
            guessed: false
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
    e.preventDefault();

    if (this.state.currentPhoto > 0) {
      this.setState((prevState) => ({ currentPhoto: prevState.currentPhoto-1 }));
    } else {
      this.setState((prevState) => ({ currentPhoto: this.state.photos.length-1 }));
    }
  }

  next(e) {
    if (e) e.preventDefault();

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

    const photos = this.state.photos;
    photos[this.state.currentPhoto].guessed = true;

    this.setState((prevState) => ({
      guesses: [...prevState.guesses, guess],
      photos: photos,
      finished: prevState.guesses.length === prevState.photos.length-1
    }));

    db.collection('guesses').doc(this.props.documentId).collection('guesses').add(guess).then(() => {
      this.next();
    });

    // TODO - When parsing results, find a) complete collection b) ordered by timestamp
  }

  render() {
    const currentPhoto = this.state.photos[this.state.currentPhoto];

    return (
      <Layout>
        <Main>
          {this.state.loaded ? <BackLink to="/guess" onClick={(e) => this.back(e)}>Back</BackLink> : null}
          {this.state.loaded && !this.hasFinished() ? <NextLink to="/guess" onClick={(e) => this.next(e)}>Next</NextLink> : null}
          {this.state.loaded && this.hasFinished() ? <SubmitLink to="/thanks">Submit</SubmitLink> : null}
          <WhiteContainerCenter>
            <Heading right bottom>Baby</Heading>
            <ImageContainer>
              {this.state.loaded && !this.state.finished ? (<Image greyscale={currentPhoto.guessed} src={currentPhoto.photo}/>) : null}
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
    name: state.name,
    documentId: state.documentId
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
  color: ${colours.white};
  left: 0;

  ${above.md`
    color: ${colours.black};
  `}
`

const NamesList = styled.ul`
  columns: 3;
  display: block;
  width: 100%;

  ${above.md`
    columns: 2;
    width: 66%;
  `}
`

const NamesListItem = styled.li`
  display: block;
  line-height: 2;
  text-align: center;

  ${above.md`
    line-height: 2.5;
    text-align: left;
  `}
`

const Heading = styled.h4`
  position: absolute;
  font-size: 2.125rem;
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
  line-height: 1.5;
  outline: none;
  text-decoration: none;
  transition: all ${timings.lg}s ease-in-out;

  &:hover {
    color: ${colours.gold};
    cursor: pointer;
    font-style: italic;
  }

  &[disabled] {
    color: ${colours.white};
    cursor: not-allowed;
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
  display: block;
  height: inherit !important;
  margin: 0 auto;
  max-height: 40vh;
  max-width: 100%;
  width: auto;
  will-change: filter;

  ${above.md`
    max-height: 80vh;
  `}

  ${props => props.greyscale ? 'filter: grayscale(100%);' : ''}
`
