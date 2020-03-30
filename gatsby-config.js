const path = require('path');

module.exports = {
   siteMetadata: {
      title: 'WF | Who?',
      description: 'IE WF-Who? Competition'
   },
   plugins: [
      'gatsby-transformer-sharp',
      'gatsby-plugin-sharp',
      'gatsby-transformer-json',
      {
         resolve: 'gatsby-source-filesystem',
         options: {
            path: path.join(__dirname, 'src', 'data'),
            name: 'data',
         },
      },
      {
         resolve: 'gatsby-source-filesystem',
         options: {
            path: path.join(__dirname, 'src', 'images'),
            name: 'images',
         },
      },
      'gatsby-plugin-react-helmet',
      {
         resolve: `gatsby-plugin-manifest`,
         options: {
            name: 'wf-who',
            short_name: 'starter',
            start_url: '/',
            background_color: '#000',
            theme_color: '#000',
            display: 'minimal-ui'
         },
      },
      'gatsby-plugin-offline',
      'gatsby-plugin-styled-components',
      'gatsby-plugin-netlify',
   ],
}
