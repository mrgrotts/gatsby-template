/*
 *  Get Access to .env
 */
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` })

module.exports = {
  siteMetadata: {
    title: "JG Template",
    author: "Joey G"
  },
  plugins: [
    /*
     * SEO Metadata
     */
    `gatsby-plugin-react-helmet`,

    /*
     *  Styled Components
     */
    `gatsby-plugin-styled-components`,

    /*
     *  Access to Filesystem
     */
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`
      }
    },

    /*
     *  Sharp Images
     */
    `gatsby-plugin-sharp`,

    /*
     *  Transform Markdown Files
     */
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // CommonMark mode (default: true)
        commonmark: true,
        // Footnotes mode (default: true)
        footnotes: true,
        // Pedantic mode (default: true)
        pedantic: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Plugins configs
        plugins: [
          `gatsby-remark-relative-images`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 760,
              linkImagesToOriginal: false
            }
          }
        ],
        excerpt_separator: `<!-- end of excerpt -->`
      }
    },

    /*
     * Service Worker
     */
    `gatsby-plugin-offline`
  ]
}
