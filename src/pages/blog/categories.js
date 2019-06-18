import React, { Component } from "react"
import { Link, graphql } from "gatsby"

import Layout from "../../components/layout"

class Categories extends Component {
  render() {
    const allCategories = this.props.data.allMarkdownRemark.group

    return (
      <Layout location={this.props.location}>
        <h1>Categories</h1>
        <ul>
          {allCategories.map(category => (
            <li key={category.fieldValue}>
              <Link
                style={{ textDecoration: `none` }}
                to={`/blog/categories/${category.fieldValue}/`}
              >
                {category.fieldValue} ({category.totalCount - 1})
              </Link>
            </li>
          ))}
        </ul>
      </Layout>
    )
  }
}

export default Categories

export const categoriesQuery = graphql`
  query CategoriesQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { draft: { ne: true } } }
    ) {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`

// export const categoriesQuery = graphql`
//   query CategoriesQuery($slug: String!) {
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

// export const categoriesQuery = graphql`
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
