import React, { useState } from 'react'
import PageContainer from "../components/PageContainer";
import Title from "../components/Title";
import SettingsInput from "../components/SettingsInput";
import Button from "../components/Button";
import styled from "styled-components";
import { sendResetPassword } from "../api/Auth";
import GoogleAnalyticsTracker from "../components/GoogleAnalyticsTracker";
import { trackAnalyticsEvent } from "../utils/googleAnalyticsUtils";


const Container = styled.div`
  display: flex;
  justify-content: center;
`

export default function ResetPassword() {
  const [login, setLogin] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [showMessage, setShowMessage] = useState<boolean>(false)
  const submit = async () => {
    trackAnalyticsEvent({
      category: 'Auth',
      action: 'SubmitResetPassword',
    })
    setLoading(true)
    const res = await sendResetPassword(login)
    setShowMessage(true)
  }
  return (
    <Container>
      <GoogleAnalyticsTracker />
      <PageContainer style={{ minWidth: 600 }}>
        <Title>Password reset</Title>
        {
          showMessage
            ? (
              <div>
                We have sent you a reset link on your e-mail. Check it and follow further instructions
              </div>
            )
            : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <SettingsInput
                  disabled={loading}
                  value={login}
                  onChange={setLogin}
                  title="Email"
                />
                <div style={{ marginTop: 12 }}>
                  <Button disabled={loading} onClick={submit}>Send reset e-mail</Button>
                </div>
              </div>
            )
        }
      </PageContainer>
    </Container>
  )
}