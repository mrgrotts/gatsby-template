import React, { Component } from "react"
import { Link, graphql } from "gatsby"

import Layout from "../../components/layout"

class Collections extends Component {
  render() {
    const allCollections = this.props.data.allMarkdownRemark.group

    return (
      <Layout location={this.props.location}>
        <h1>Collections</h1>
        <ul>
          {allCollections.map(collection => (
            <li key={collection.fieldValue}>
              <Link
                style={{ textDecoration: `none` }}
                to={`/resources/collections/${collection.fieldValue}/`}
              >
                {collection.fieldValue} ({collection.totalCount - 1})
              </Link>
            </li>
          ))}
        </ul>
      </Layout>
    )
  }
}

export default Collections

export const collectionsQuery = graphql`
  query CollectionsQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { draft: { ne: true } } }
    ) {
      group(field: fields___collection) {
        fieldValue
        totalCount
      }
    }
  }
`

// export const collectionsQuery = graphql`
//   query CollectionsQuery($slug: String!) {
//     allMarkdownRemark(
//       sort: { fields: [frontmatter___date], order: DESC }
//       filter: {
//         fields: { slug: { in: [$slug] } }
//         frontmatter: { draft: { ne: true } }
//       }
//     ) {
//       totalCount
//       edges {
//         node {
//           fields {
//             slug
//           }
//           frontmatter {
//             title
//           }
//         }
//       }
//     }
//   }
// `

// export const collectionsQuery = graphql`
//   query TopicQuery($slug: String!, $fileAbsolutePath: String!) {
//     allMarkdownRemark(
//       sort: { fields: [frontmatter___date], order: DESC }
//       filter: {
//         fields: { slug: { in: [$slug] } }
//         fileAbsolutePath: { eq: $fileAbsolutePath }
//         frontmatter: { draft: { ne: true } }
//       }
//     ) {
//       totalCount
//       edges {
//         node {
//           fields {
//             slug
//           }
//           frontmatter {
//             title
//           }
//         }
//       }
//     }
//   }
// `
