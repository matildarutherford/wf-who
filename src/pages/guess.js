import React, { Component } from 'react'
import styled from 'styled-components'
import { db } from '../config/firebase'

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
      photos: [],
      currentPhoto: 0
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
        this.setState({ names: [...this.state.names, doc.data().name ], photos: [...this.state.photos, doc.data().photo ] });
      })
    }).then(() => {
      this.setState({ photos: this.shuffle(this.state.photos) });
    });
  }

  guess(value) {
    this.setState({ currentPhoto: this.state.currentPhoto+1 });
  }

  render() {
    return (
      <Layout>
        <Main>
          <PlayLink to="/play">Play</PlayLink>
          <WhiteContainerCenter>
            <ImageContainer>
              <Image src={this.state.photos[this.state.currentPhoto]}/>
            </ImageContainer>
          </WhiteContainerCenter>
          <BlackContainer>
            <NamesList>
              {this.state.names.map((name, index) => {
                return (<NamesListItem key={index}><button onClick={() => this.guess(name)}>{ name }</button></NamesListItem>);
              })}
            </NamesList>
          </BlackContainer>
        </Main>
      </Layout>
    )
  }
}

export default GuessPage


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
