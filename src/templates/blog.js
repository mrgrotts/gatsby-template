import React, { Component } from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"

const Divider = styled.hr`
  border: 2px solid rgba(11, 100, 233, 1);
  border-radius: 1rem;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
  margin: 2rem 0;
`

const Tags = styled.nav`
  display: inline-flex;
  font-style: normal;
  text-align: left;
`

const Categories = styled.section`
  align-items: center;
  display: flex;
`

const Category = styled(Link)`
  background: rgba(11, 100, 233, 1);
  border-radius: 1rem;
  color: rgba(255, 255, 255, 1);
  margin-left: 1rem;
  padding: 0.5rem 0.75rem 0.5rem 0.75rem;

  &:active,
  :hover,
  :focus {
    background: rgba(31, 190, 218, 1);
    color: rgba(255, 255, 255, 1);
  }
`

class Blog extends Component {
  render() {
    const post = this.props.data.markdownRemark

    let tags
    let tagList
    if (post.fields.tagSlugs) {
      tagList = post.fields.tagSlugs.map((tag, index) => (
        <span key={index}>
          <Link to={tag}>{post.frontmatter.tags[index]}</Link>
          {index < post.fields.tagSlugs.length - 1 && <>{`,`}&nbsp;</>}
        </span>
      ))

      tags = <Tags>{tagList}</Tags>
    }

    // const date = <p>{new Date(post.frontmatter.date).toLocaleDateString()}</p>

    const Overview = (
      <section>
        <h6>
          {tags} | {post.timeToRead} min read &middot;
        </h6>
        <h1>{post.frontmatter.title}</h1>
        <h6>Author: {post.frontmatter.author}</h6>
        <p>
          <i>{post.excerpt}</i>
        </p>
      </section>
    )

    const TableOfContents = (
      <section>
        <h4>Contents</h4>
        <nav dangerouslySetInnerHTML={{ __html: post.tableOfContents }} />
      </section>
    )

    const CategoriesSection = (
      <Categories>
        <h6>Categories</h6>
        <Category to={`/blog/categories/${post.frontmatter.category}`}>
          {post.frontmatter.category.charAt(0).toUpperCase() +
            post.frontmatter.category.slice(1)}
        </Category>
      </Categories>
    )

    return (
      <Layout>
        <article>
          {Overview}
          {TableOfContents}
          <Divider />
          <section dangerouslySetInnerHTML={{ __html: post.html }} />
          {CategoriesSection}
        </article>
      </Layout>
    )
  }
}

export default Blog

export const blogQuery = graphql`
  query BlogQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      excerpt
      timeToRead
      tableOfContents
      fields {
        category
        slug
        tagSlugs
      }
      frontmatter {
        title
        tags
        date
        author
        category
      }
    }
  }
`
