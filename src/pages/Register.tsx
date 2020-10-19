import React, { useState } from 'react'
import styled from "styled-components";
import PageContainer from "../components/PageContainer";
import SettingsInput from "../components/SettingsInput";
import Title from "../components/Title";
import Button from '../components/Button';
import { sendRegister } from "../api/Auth";
import GoogleAnalyticsTracker from "../components/GoogleAnalyticsTracker";


const Container = styled.div`
  display: flex;
  justify-content: center;
`

export default function Register() {
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const submit = async () => {
    setLoading(true)
    const res = await sendRegister(login, password)
    setLoading(false)
  }
  return (
    <Container>
      <GoogleAnalyticsTracker />
      <PageContainer style={{ minWidth: 600 }}>
        <Title>Registration</Title>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <SettingsInput
            disabled={loading}
            value={login}
            onChange={setLogin}
            title="Email"
          />
          <SettingsInput
            disabled={loading}
            value={password}
            onChange={setPassword}
            title="Password"
            type="password"
          />
          <SettingsInput
            disabled={loading}
            value={confirmPassword}
            onChange={setConfirmPassword}
            title="Confirm password"
            type="password"
          />
          {
            password !== confirmPassword
              ? (
                <div style={{ marginTop: 12 }}>
                  Passwords do not match
                </div>
              )
              : null
          }
          <div style={{ marginTop: 12 }}>
            <Button
              disabled={loading || password !== confirmPassword || !password || !login}
              onClick={submit}
            >
              Submit
            </Button>
          </div>
        </div>
      </PageContainer>
    </Container>
  )
}