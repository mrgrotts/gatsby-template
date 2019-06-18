import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Navigation from "./navigation"
import Wrapper from "./wrapper"

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author
        }
      }
    }
  `)

  return (
    <footer>
      <Wrapper align={"center"} justify={"space-between"}>
        <p style={{ width: "100%" }}>
          {`Hey, it's ${
            data.site.siteMetadata.author
          }'s Footer, copyright 2019.`}
        </p>
        <Navigation color={"#0a0a0a"} />
      </Wrapper>
    </footer>
  )
}

export default Footer
