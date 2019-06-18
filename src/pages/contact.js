import React, { Component } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"

class Contact extends Component {
  render() {
    return (
      <Layout>
        <section>
          <h1>Hey, it's Joey G's Contact Information.</h1>
          <h2>I'm doing this to get a better gatsby template.</h2>
          <p>
            <Link to="/about">Want more about me?</Link> Maybe eventually a
            contact form? Just read the <Link to={"blog"}>blog</Link> for me, if
            you don't mind. Or go back to the <Link to="/">home page.</Link>
          </p>
        </section>
        <section>
          <h3>Joe Grotto</h3>
          <h4>Co Founder and CPO: Route</h4>
          <p>27W223 Churchill Road, Winfield, IL 60190</p>
          <p>Email: joe.grotto@getroute.com</p>
          <p>Phone: +1(630)386-2219</p>
          <p>
            Twitter: <a href="https://twitter.com/mr_grotts">Mr. Grotts</a>
          </p>
        </section>
      </Layout>
    )
  }
}

export default Contact
