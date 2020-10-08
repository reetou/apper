import React from 'react'
import Leftbar from "../components/Leftbar";
import Rightbar from "../components/Rightbar";
import styled from 'styled-components'
import Simulator from "../components/Simulator";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`

export default function Builder() {
  return (
    <Container>
      <Leftbar />
      <Simulator />
      <Rightbar/>
    </Container>
  )
}