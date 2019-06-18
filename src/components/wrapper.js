import styled from "styled-components"

const Wrapper = styled.div.attrs(({ align, display, flow, justify }) => ({
  align: align || "center",
  display: display || "flex",
  flow: flow || "row nowrap",
  justify: justify || "center"
}))`
  align-items: ${props => props.align};
  display: ${props => props.display};
  flex-flow: ${props => props.flow};
  justify-content: ${props => props.justify};
  margin: 0 auto;
  max-width: 360px;
  width: 100%;

  @media screen and (min-width: 45rem) {
    max-width: 1080px;
  }
`

export default Wrapper
