import React, { PureComponent } from "react"

import Brand from "./brand"
import Hamburger from "./hamburger"
import Navigation from "./navigation"
import Wrapper from "./wrapper"

class Header extends PureComponent {
  state = {
    open: false
  }

  toggle = () => this.setState(prevState => ({ open: !prevState.open }))

  render() {
    return (
      <header>
        <Wrapper align={"center"} justify={"space-between"}>
          <Brand />
          <Navigation />
          <Hamburger toggle={this.toggle} open={this.state.open} />
        </Wrapper>
      </header>
    )
  }
}

export default Header
