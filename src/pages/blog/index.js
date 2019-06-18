import React, { Component } from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import styled from "styled-components"

import Layout from "../../components/layout"

const Cards = styled.ol`
  display: flex;
  flex-flow: row wrap;
`

const Card = styled.li`
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  height: 18rem;
  margin: 1rem;
  padding: 0 2rem;
  width: 18rem;
`

const Posts = () => {
  const posts = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            id
            html
            excerpt
            timeToRead
            frontmatter {
              title
              date
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  // tableOfContents also available

  const renderedPosts = posts.allMarkdownRemark.edges
    .sort(
      (a, b) =>
        new Date(b.node.frontmatter.date) - new Date(a.node.frontmatter.date)
    )
    .map(({ node }, index) => {
      const post = node.frontmatter

      return (
        <Card key={index}>
          <Link to={node.fields.slug}>
            <h5>{post.title}</h5>
          </Link>
          <p>{new Date(post.date).toUTCString()}</p>
        </Card>
      )
    })

  return <Cards>{renderedPosts}</Cards>
}

class Blog extends Component {
  render() {
    return (
      <Layout>
        <section>
          <h1>Hey, it's Joey G's Blog.</h1>
          <h2>I'm doing this to get a better gatsby template.</h2>
          <p>
            Want more <Link to="/about">about me</Link>? If you hate it so much
            you can always go back to the <Link to="/">home page</Link> but I
            would hope you at least <Link to="/contact">contact me</Link> about
            it.
          </p>
          <Posts />
        </section>
      </Layout>
    )
  }
}

export default Blog
