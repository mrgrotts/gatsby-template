import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const Nav = styled.nav`
  display: block;
  position: relative;
  transform-origin: 0% 0%;
  transform: translate(-100%, 0);
  transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);

  @media screen and (min-width: 45rem) {
    display: inline-flex;
    justify-content: flex-end;
    margin: 0;
    transform: none;
    transition: none;
    width: 100%;
  }
`

const NavList = styled.ul`
  background: inherit;
  display: block;
  position: absolute;
  transform-origin: 0% 0%;
  transform: translate(-150%, 0);
  transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
  width: ${window.innerWidth}px;

  @media screen and (min-width: 45rem) {
    display: flex;
    position: relative;
    transform: none;
    transition: none;
    width: auto;
  }
`

const NavItem = styled(Link).attrs(({ active, color }) => ({
  color: color || "white",
  active: active || "rgba(11, 100, 233, 1)"
}))`
  color: ${props => props.color};

  &:active,
  :focus,
  :hover {
    color: ${props => props.active};
  }

  @media screen and (min-width: 45rem) {
    margin-right: 1.5rem;
  }
`

const Navigation = ({ active, color, style }) => (
  <Nav role="navigation" style={style}>
    <NavList>
      <li>
        <NavItem to={"/"} activecolor={active} color={color}>
          Home
        </NavItem>
      </li>
      <li>
        <NavItem to={"/about"} activecolor={active} color={color}>
          About
        </NavItem>
      </li>
      <li>
        <NavItem to={"/blog"} activecolor={active} color={color}>
          Blog
        </NavItem>
      </li>
      <li>
        <NavItem to={"/contact"} activecolor={active} color={color}>
          Contact
        </NavItem>
      </li>
    </NavList>
  </Nav>
)

export default Navigation
