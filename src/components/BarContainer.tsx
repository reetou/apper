import React from 'react'
import styled from 'styled-components'
import Styleguide from "../Styleguide";

const BarContainer = styled.div`
  padding: 1rem;
  height: 95vh;
  width: 25%;
  min-width: 350px;
  position: relative;
  margin: 1rem;
  overflow-y: auto;
  border-radius: 16px;
  background-color: ${Styleguide.infoColor};
`

export default BarContainer