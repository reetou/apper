import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import PageContainer from "../components/PageContainer";
import SettingsInput from "../components/SettingsInput";
import Title from "../components/Title";
import Button from '../components/Button';
import { sendLogin } from "../api/Auth";
import GoogleAnalyticsTracker from "../components/GoogleAnalyticsTracker";
import { trackAnalyticsEvent } from "../utils/googleAnalyticsUtils";


const Container = styled.div`
  display: flex;
  justify-content: center;
`

export default function Logout() {
  useEffect(() => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }, [])
  return (
    <Container>
      <GoogleAnalyticsTracker />
      <PageContainer style={{ minWidth: 600 }}>
        <Title>Logging you out...</Title>
      </PageContainer>
    </Container>
  )
}