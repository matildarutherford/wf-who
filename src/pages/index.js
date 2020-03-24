import {
   BaseLink,
   BlackContainer,
   WhiteContainer,
   baseLinkStyles,
} from '../styles/global'
import React, { Component } from 'react'

import Heading from '../components/heading'
// Components
import Layout from '../components/layout'
import Main from '../components/main'
import SubHeading from '../components/subheading'
// CSS
import { above } from '../styles/mixins'
import { colours } from '../styles/variables'
import styled from 'styled-components'

class IndexPage extends Component {
   render() {
      return (
         <Layout>
            <Main>
               <AboutLink to="/about">About</AboutLink>
               {/* <DonateLink href="https://mosista.co/babyface-ie" target="_blank">
            Donate
          </DonateLink> */}
               <PlayLink to="/play">Play</PlayLink>
               <WhiteContainer>
                  <Heading>WF-</Heading>
                  {/* <SubHeading>20</SubHeading> */}
               </WhiteContainer>
               <BlackContainer>
                  <Heading>Who?</Heading>
                  {/* <SubHeading>20</SubHeading> */}
               </BlackContainer>
            </Main>
         </Layout>
      )
   }
}

export default IndexPage

const AboutLink = styled(BaseLink)`
  top: 0;
  left: 0;
  color: ${colours.black};

  ${above.md`
    color: ${colours.black};
  `};
`

const DonateLink = styled.a`
  ${baseLinkStyles} left: 0;
  bottom: 0;
  color: ${colours.white};

  ${above.md`
    color: ${colours.black};
  `};
`

const PlayLink = styled(BaseLink)`
  right: 0;
  bottom: 0;
  color: ${colours.white};
`
