import React from 'react'
import styled from "styled-components";

const Container = styled.a`
  display: flex;
  align-items: center;
`

export default function Logo() {
  return (
    <Container href="/">
      <img src={`${process.env.PUBLIC_URL}/logo.png`} height={60} />
    </Container>
  )
}