import React from "react"
import styled from "styled-components"

import Header from "./header"
import Footer from "./footer"

const Main = styled.main`
  padding: 0 1.5rem;
  position: relative;
  overflow-wrap: break-word;
`

const Layout = ({ children }) => (
  <>
    <Header />
    <Main role={"main"}>{children}</Main>
    <Footer />
  </>
)

export default Layout
