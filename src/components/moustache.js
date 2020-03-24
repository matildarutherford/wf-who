import { above, below } from '../styles/mixins'

import React from 'react'
import styled from 'styled-components'

const Moustache = () => (
   <MoustacheContainer>
      <MoustacheMobile>
         <svg width="60" height="100" viewBox="0 0 381 351" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M380.734 161.803L190.371 0.420898L0.0100098 161.802H46.5366V175.42H334.208V161.803H380.734Z" fill="#EE7231" />
            <rect x="46.5422" y="175.42" width="287.665" height="175" fill="#F9E4E4" />
         </svg>

      </MoustacheMobile>
      <MoustacheDesktop>
         <svg width="140px" height="140px" viewBox="0 0 397 366" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M198.593 154.59L198.592 0.39209L0.244629 168.544H48.7231V365.075H198.593V154.59Z" fill="#EE7231" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M396.94 168.545L198.593 0.391602L198.593 154.59L198.593 168.545L198.593 365.075H348.462V168.545H396.94Z" fill="#F9E4E4" />
         </svg>
      </MoustacheDesktop>
   </MoustacheContainer>
)

export default Moustache

const MoustacheContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 2000;
  transform: translate(-50%, -50%);
`

const MoustacheMobile = styled.div`
  display: flex;

  ${above.md`
    display: none;
  `};
`

const MoustacheDesktop = styled.div`
  display: flex;

  ${below.md`
    display: none;
  `};
`
