import React from "react"
import styled from "styled-components"

const HamburgerToggle = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-flow: column nowrap;
  height: 2.5rem;
  justify-content: center;
  position: absolute;
  right: 1.5rem;
  user-select: none;
  width: 2.5rem;

  @media screen and (min-width: 45rem) {
    display: none;
  }
`

const HamburgerLine = styled.div`
  animation: ${props => hamburger[props.number][props.open].animation};
  background-color: #ffffff;
  border-radius: 1rem;
  display: inline-block;
  height: 4px;
  margin-bottom: 6px;
  transform: ${props => hamburger[props.number][props.open].transform};
  width: ${props => hamburger[props.number][props.open].width || "2rem"};

  & :last-child {
    margin-bottom: 0px;
  }
`

const hamburger = {
  one: {
    false: {
      animation: "hamburger-1-close .6s ease-out forwards",
      transform: "translate(12px, 13px)",
      width: "8px"
    },
    true: {
      animation: "hamburger-1-open .6s ease-out forwards"
    }
  },
  two: {
    false: {
      animation: "hamburger-2-close .6s ease-out forwards",
      transform: "translate(0px, 0px) rotate(40deg)"
    },
    true: {
      animation: "hamburger-2-open .6s linear forwards"
    }
  },
  three: {
    false: {
      animation: "hamburger-3-close .6s ease-out forwards",
      transform: "translate(0px, -23px) rotate(-40deg)"
    },
    true: {
      animation: "hamburger-3-open .6s linear forwards"
    }
  }
}

const Hamburger = ({ open, toggle }) => (
  <HamburgerToggle onClick={toggle}>
    <HamburgerLine number={"one"} open={open} />
    <HamburgerLine number={"two"} open={open} />
    <HamburgerLine number={"three"} open={open} />
  </HamburgerToggle>
)

export default Hamburger

/* 
SOMEDAY, USING KEYFRAMES BY STYLED?

import styled, { keyframes } from "styled-components"

const hamburgerOneOpen = keyframes`
  0% {
    width: 2rem;
  }
  40% {
    background-color: #505050;
    transform: translate(1rem, 0px);
    width: 8px;
  }
  75%,
  80% {
    animation-timing-function: cubic-bezier(0, 1, 1, 1);
    transform: translate(1rem, -1rem);
    width: 8px;
  }
  100% {
    background-color: #505050;
    transform: translate(1rem, 1rem) rotate(40deg);
    width: 8px;
  }
`

const hamburgerTwoOpen = keyframes`
  80% {
    background-color: rgba(31, 190, 218, 1);
    transform: translate(0px, 0px) rotate(0deg);
  }
  100% {
    background-color: #505050;
    transform: translate(8px, 0px) rotate(40deg);
  }
`

const hamburgerThreeOpen = keyframes`
  80% {
    background-color: rgba(31, 190, 218, 1);
    transform: translate(0px, 0px) rotate(0deg);
  }
  100% {
    background-color: #505050;
    transform: translate(8px, -11px) rotate(-40deg);
  }
`

const hamburgerOneClose = keyframes`
  0%,
  70% {
    width: 0px;
  }
  100% {
    width: 2rem;
    transform: translate(0, 0);
  }
`

const hamburgerTwoClose = keyframes`
  0% {
    background-color: #505050;
    width: 2rem;
  }
  20% {
    background-color: #505050;
    transform: translate(0, 0px) rotate(40deg);
    width: 8px;
  }
  40% {
    background-color: rgba(31, 190, 218, 1);
    width: 0px;
  }
  65% {
    animation-timing-function: cubic-bezier(0, 1, 1, 1);
    transform: translate(0, -1.5rem);
  }
  80% {
    width: 0px;
  }
  100% {
    transform: translate(0, 0px);
    width: 2rem;
  }
`

const hamburgerThreeClose = keyframes`
  0% {
    background-color: #505050;
    width: 2rem;
  }
  20% {
    background-color: #505050;
    transform: translate(0, -12px) rotate(-40deg);
    width: 8px;
  }
  40% {
    background-color: rgba(31, 190, 218, 1);
  }
  65% {
    animation-timing-function: cubic-bezier(0, 1, 1, 1);
    transform: translate(0, -2rem);
  }
  90% {
    width: 8px;
  }
  100% {
    transform: translate(0, 0px);
    width: 2rem;
  }
`

const hamburger = {
  one: {
    false: {
      animation: "hamburgerOneClose .6s ease-out forwards",
      transform: "translate(12px, 13px)",
      width: "8px"
    },
    true: {
      animation: "hamburgerOneOpen .6s ease-out forwards"
    }
  },
  two: {
    false: {
      animation: "hamburgerTwoClose .6s ease-out forwards",
      transform: "translate(0px, 0px) rotate(40deg)"
    },
    true: {
      animation: "hamburgerTwoOpen .6s linear forwards"
    }
  },
  three: {
    false: {
      animation: "hamburgerThreeClose .6s ease-out forwards",
      transform: "translate(0px, -23px) rotate(-40deg)"
    },
    true: {
      animation: "hamburgerThreeOpen .6s linear forwards"
    }
  }
}

*/
