import React, { useContext, useEffect, useState } from 'react'
import styled from "styled-components";
import PageContainer from "../components/PageContainer";
import SettingsInput from "../components/SettingsInput";
import Title from "../components/Title";
import Button from '../components/Button';
import { sendLogin } from "../api/Auth";
import GoogleAnalyticsTracker from "../components/GoogleAnalyticsTracker";
import { trackAnalyticsEvent } from "../utils/googleAnalyticsUtils";
import { useHistory } from "react-router-dom";
import AuthContext from "../store/AuthContext";


const Container = styled.div`
  display: flex;
  justify-content: center;
`

export default function Login() {
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const history = useHistory()
  const { authenticated } = useContext(AuthContext)
  const submit = async () => {
    trackAnalyticsEvent({
      category: 'Auth',
      action: 'SubmitLogin',
    })
    setLoading(true)
    const res = await sendLogin(login, password)
    setLoading(false)
  }
  useEffect(() => {
    if (authenticated) {
      history.replace('/projects')
    }
  }, [authenticated])
  return (
    <Container>
      <GoogleAnalyticsTracker />
      <PageContainer style={{ minWidth: 600 }}>
        <Title>Log in</Title>
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
          <div style={{ marginTop: 12 }}>
            <Button
              disabled={loading || !password || !login}
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