import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import styled from "styled-components"

const Logo = styled.h1`
  color: white;
  display: inline-flex;
  font-size: 1.5rem;
  white-space: nowrap;
`

const Brand = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <Link to={"/"} style={{ color: "#0a0a0a" }}>
      <Logo>{data.site.siteMetadata.title}</Logo>
    </Link>
  )
}

export default Brand
