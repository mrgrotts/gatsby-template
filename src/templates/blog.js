import React, { Component } from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"

import Head from "../components/head"
import Layout from "../components/layout"

const Divider = styled.hr`
  border: 1px solid rgba(11, 100, 233, 1);
  border-radius: 1rem;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
  margin: 2rem 0;
`

const Tags = styled.nav`
  display: inline-flex;
  font-style: normal;
  text-align: left;
`

const Tag = styled(Link)`
  color: rgba(50, 50, 50, 1);
  cursor: pointer;

  &:active,
  :hover,
  :focus {
    color: rgba(11, 100, 233, 1);
  }
`

const Categories = styled.section`
  align-items: center;
  display: flex;
`

const Category = styled(Link)`
  background: rgba(11, 100, 233, 1);
  border-radius: 1rem;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
  margin-left: 1rem;
  padding: 0.5rem 0.75rem 0.5rem 0.75rem;

  &:active,
  :hover,
  :focus {
    background: rgba(31, 190, 218, 1);
    color: rgba(255, 255, 255, 1);
  }
`

const OverviewSection = styled.section`
  margin-top: 1rem;
`

const Meta = styled.span`
  font-size: 0.9rem;
  font-weight: 900;
`

class Blog extends Component {
  render() {
    const post = this.props.data.markdownRemark

    let tags
    let tagList
    if (post.fields.tagSlugs) {
      tagList = post.fields.tagSlugs.map((tag, index) => (
        <span key={index}>
          <Tag to={tag}>{post.frontmatter.tags[index]}</Tag>
          {index < post.fields.tagSlugs.length - 1 && <>{`,`}&nbsp;</>}
        </span>
      ))

      tags = <Tags>{tagList}</Tags>
    }

    // const date = <p>{new Date(post.frontmatter.date).toLocaleDateString()}</p>

    const Overview = (
      <OverviewSection>
        <Meta>
          {tags} | {post.timeToRead} min read &middot;
        </Meta>
        <h1>{post.frontmatter.title}</h1>
        <h6>Author: {post.frontmatter.author}</h6>
        <p>
          <i>{post.excerpt}</i>
        </p>
      </OverviewSection>
    )

    const TableOfContents = (
      <section>
        <h4>Contents</h4>
        <nav dangerouslySetInnerHTML={{ __html: post.tableOfContents }} />
      </section>
    )

    let categories
    let CategoriesSection = null
    if (this.props.location && this.props.location.pathname) {
      const pathname = this.props.location.pathname.split("/").slice(2, -1)

      categories = pathname.map((category, index) => (
        <Category
          key={index}
          to={`/blog/${pathname.slice(0, index + 1).join("/")}`}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Category>
      ))
    }

    if (categories && categories.length) {
      CategoriesSection = (
        <Categories>
          <h6>Categories</h6>
          {categories}
        </Categories>
      )
    }

    return (
      <Layout>
        <Head author={`jg`} banner={`../assets/home.png`} article />
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
        slug
        tagSlugs
      }
      frontmatter {
        title
        tags
        date
        author
      }
    }
  }
`
// CategoriesSection = (
//   <Categories>
//     <h6>Categories</h6>
//     <Category to={`/blog/categories/${post.frontmatter.category}`}>
//       {post.frontmatter.category.charAt(0).toUpperCase() +
//         post.frontmatter.category.slice(1)}
//     </Category>
//   </Categories>
// )
