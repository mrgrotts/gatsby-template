import React, { Component } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"

class Home extends Component {
  render() {
    return (
      <Layout>
        <section>
          <h1>Hey, it's Joey G.</h1>
          <h2>I'm doing this to get a better gatsby template.</h2>
          <p>
            <Link to={"/contact"}>Hit me up nerds</Link>, or maybe just{" "}
            <Link to={"/about"}>check me out</Link>. I do{" "}
            <Link to={"/resources"}>have a lotta resources</Link> though.{" "}
            <Link to={"/tags"}>Here are the tags</Link>.
          </p>
        </section>
      </Layout>
    )
  }
}

export default Home
