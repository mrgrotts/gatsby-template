import React, { Component } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"

class About extends Component {
  render() {
    return (
      <Layout>
        <section>
          <h1>Hey, it's Joey G's About Page.</h1>
          <h2>
            I'm doing this to get a better gatsby template. You don't need to
            know about me.
          </h2>
          <p>
            Be sure to check out our <Link to="/blog">blog</Link>, or you can
            always go back to the <Link to="/">home page</Link> but I would hope
            you at least <Link to="/contact">contact me</Link> about it.
          </p>
        </section>
      </Layout>
    )
  }
}

export default About
