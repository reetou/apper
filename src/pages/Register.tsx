import React, { useState } from 'react'
import styled from "styled-components";
import PageContainer from "../components/PageContainer";
import SettingsInput from "../components/SettingsInput";
import Title from "../components/Title";
import Button from '../components/Button';


const Container = styled.div`
  display: flex;
  justify-content: center;
`

export default function Register() {
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  return (
    <Container>
      <PageContainer style={{ minWidth: 600 }}>
        <Title>Registration</Title>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <SettingsInput
            value={login}
            onChange={setLogin}
            title="Email"
          />
          <SettingsInput
            value={password}
            onChange={setPassword}
            title="Password"
            type="password"
          />
          <SettingsInput
            value={confirmPassword}
            onChange={setConfirmPassword}
            title="Confirm password"
            type="password"
          />
          <div style={{ marginTop: 12 }}>
            <Button>Submit</Button>
          </div>
        </div>
      </PageContainer>
    </Container>
  )
}