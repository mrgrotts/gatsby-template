import React, { Component } from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"

class Collection extends Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    const postLinks = posts
      .filter(
        p =>
          !this.props.location.pathname
            .replace(/collections\//, "")
            .includes(p.node.fields.slug)
      )
      .map(post => (
        <li key={post.node.fields.slug}>
          <Link to={`/${post.node.fields.slug}`}>
            {post.node.frontmatter.title}
          </Link>
        </li>
      ))

    return (
      <Layout>
        <h1>
          {this.props.data.allMarkdownRemark.totalCount - 1}
          {` `}
          posts for the collection “{this.props.pageContext.collection}”
        </h1>
        <ul>{postLinks}</ul>
        <p>
          <Link to="/resources/collections/">Browse everything</Link>
        </p>
      </Layout>
    )
  }
}

export default Collection

export const collectionQuery = graphql`
  query CollectionQuery($collection: String) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { collection: { eq: $collection } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`

// {
//     id
//     html
//     excerpt
//     timeToRead
//     tableOfContents
//     fields {
//       slug
//       tagSlugs
//     }
//     frontmatter {
//       title
//       tags
//       date
//       author
//     }
//   }
