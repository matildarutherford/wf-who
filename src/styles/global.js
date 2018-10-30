import { createGlobalStyle } from 'styled-components'
import { above } from './mixins'
import { colours, fonts, timings, spacing, typography } from './variables'
import { Link } from 'gatsby'
import styled, { css } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}

  html {
    font-size: 12px;

    ${above.sm`
      font-size: 16px;
    `}
  }

  body {
    -ms-overflow-style: -ms-autohiding-scrollbar;
    font-family: ${fonts.body};
    font-size: ${typography.body};
    font-weight: 300;
    letter-spacing: .05rem;
    line-height: 1.8;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    line-height: 1.2;
    margin: 0;
  }

  ul {
    list-style-type: none;
    margin-bottom: 0;
    margin-top: 0;
    padding-left: 0;
  }
`

export const baseLinkStyles = css`
  display: block;
  font-size: 2.125rem;
  padding: ${spacing.default};
  position: absolute;
  text-decoration: none;
  transition: color ${timings.sm}s ease-in-out;
  z-index: 1;

  &:hover {
    color: ${colours.gold};
    font-style: italic;
  }
`

export const BaseLink = styled(Link)`
  ${baseLinkStyles}
`

export const BaseContainer = styled.section`
  box-sizing: border-box;
  display: flex;
  flex-grow: 1;
  height: 50vh;
  padding: ${spacing.default};
  position: relative;
  width: 100vh;

  ${above.md`
    height: 100vh;
    width: 50vh;
  `}
`

export const WhiteContainer = styled(BaseContainer)`
  align-items: flex-end;
  background-color: ${colours.white};
  color: ${colours.black};
  justify-content: center;

  ${above.md`
    align-items: center;
    justify-content: flex-end;
  `}
`

export const BlackContainer = styled(BaseContainer)`
  align-items: flex-start;
  justify-content: center;
  background-color: ${colours.black};
  color: ${colours.white};

  ${above.md`
    align-items: center;
    justify-content: flex-start;
  `}
`
