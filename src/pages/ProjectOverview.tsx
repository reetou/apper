import React from 'react'
import styled from "styled-components";
import Styleguide from "../Styleguide";


const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  color: ${Styleguide.primaryColor};
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
`

export default function ProjectOverview() {
  return (
    <Container>
      <Title>Мои приложения</Title>
    </Container>
  )
}