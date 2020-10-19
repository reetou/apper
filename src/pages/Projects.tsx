import React from 'react'
import styled from "styled-components";
import Styleguide from "../Styleguide";
import GoogleAnalyticsTracker from "../components/GoogleAnalyticsTracker";


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

export default function Projects() {
  return (
    <Container>
      <GoogleAnalyticsTracker />
      <Title>Мои приложения</Title>
    </Container>
  )
}