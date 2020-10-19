import React from 'react'
import PageContainer from "../components/PageContainer";
import Title from "../components/Title";
import Button from "../components/Button";
import styled from "styled-components";
import { useHistory } from 'react-router-dom';
import GoogleAnalyticsTracker from "../components/GoogleAnalyticsTracker";

const Container = styled.div`
  display: flex;
  justify-content: center;
`

export default function NotFound() {
  const history = useHistory()
  return (
    <Container>
      <GoogleAnalyticsTracker />
      <PageContainer style={{ minWidth: 600 }}>
        <Title>Not Found</Title>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={() => history.replace('/')}>Get back</Button>
        </div>
      </PageContainer>
    </Container>
  )
}