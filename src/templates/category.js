import React, { Component } from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"

class Category extends Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    const postLinks = posts
      .filter(
        p =>
          !this.props.location.pathname
            .replace(/categories\//, "")
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
          posts for the category “{this.props.pageContext.category}”
        </h1>
        <ul>{postLinks}</ul>
        <p>
          <Link to="/blog/categories/">Browse everything</Link>
        </p>
      </Layout>
    )
  }
}

export default Category

export const categoryQuery = graphql`
  query CategoryQuery($category: String) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { category: { eq: $category }, draft: { ne: true } }
      }
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
