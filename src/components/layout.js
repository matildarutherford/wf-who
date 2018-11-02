import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery } from 'gatsby'
import PageTransition from 'gatsby-plugin-page-transitions'

// Styles
import { GlobalStyle } from '../styles/global.js'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: data.site.siteMetadata.description },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <PageTransition
          defaultStyle={{
            opacity: '1'
          }}
          transitionStyles={{
            entering: { opacity: '1' },
            entered: { opacity: '1' },
            exiting: { opacity: '1' },
          }}>
          <GlobalStyle/>
            {children}
        </PageTransition>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
