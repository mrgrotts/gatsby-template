import React, { Component } from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"

class Tag extends Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    const postLinks = posts.map(post => (
      <li key={post.node.fields.slug}>
        <Link to={post.node.fields.slug}>{post.node.frontmatter.title}</Link>
      </li>
    ))

    return (
      <Layout>
        <h1>
          {this.props.data.allMarkdownRemark.totalCount}
          {` `}
          posts tagged with “{this.props.pageContext.tag}”
        </h1>
        <ul>{postLinks}</ul>
        <p>
          <Link to="/blog/tags/">Browse all tags</Link>
        </p>
      </Layout>
    )
  }
}

export default Tag

export const pageQuery = graphql`
  query TagQuery($tag: String) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] }, draft: { ne: true } } }
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
