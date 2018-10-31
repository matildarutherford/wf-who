import React, { Component } from 'react'
import styled from 'styled-components'
import { db } from '../config/firebase'
import { connect } from 'react-redux'

// Components
import Layout from '../components/layout'
import Main from '../components/main'

// CSS
import { colours } from '../styles/variables'
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
        this.setState({ names: [...this.state.names, doc.data().name ], photos: [...this.state.photos, {
          id: doc.id,
          photo: doc.data().photo
        }]});
      })
    }).then(() => {
      this.setState({ loaded: true, photos: this.shuffle(this.state.photos) });
    });
  }

  guess(value) {
    this.setState({ guesses: [...this.state.guesses, value]});

    db.collection('guesses').doc(this.props.name).collection(this.state.collectionId).add({
      photo: this.state.photos[this.state.currentPhoto].id,
      name: value
    });

    if (this.state.currentPhoto < this.state.photos.length-1) {
      this.setState({ currentPhoto: this.state.currentPhoto+1 });
    } else {
      this.setState({ currentPhoto: 0 });
    }

    // TODO - When parsing results, find a) complete collection b) ordered by timestamp
  }

  render() {
    return (
      <Layout>
        <Main>
          <PlayLink to="/play">Play</PlayLink>
          <WhiteContainerCenter>
            <ImageContainer>
              {this.state.loaded ? (<Image src={this.state.photos[this.state.currentPhoto].photo}/>) : null}
            </ImageContainer>
          </WhiteContainerCenter>
          <BlackContainer>
            <NamesList>
              {this.state.names.map((name, index) => {
                return (<NamesListItem key={index}><button disabled={this.state.guesses.includes(name)} onClick={() => this.guess(name)}>{ name }</button></NamesListItem>);
              })}
            </NamesList>
          </BlackContainer>
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

const PlayLink = styled(BaseLink)`
  right: 0;
  bottom: 0;
  color: ${colours.white};
`

const NamesList = styled.ul`
  display: block;
  columns: 2;
`

const NamesListItem = styled.li`

`

const ImageContainer = styled.div`
  display: block;
  width: 66%;
`

const Image = styled.img`
  width: 100%;
  height: auto;
  max-height: 80%;
`
