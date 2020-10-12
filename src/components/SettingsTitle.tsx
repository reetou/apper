import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  margin: 4px 0;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.5px;
`

interface Props {
  text: string;
}

export default function SettingsTitle(props: Props) {
  const { text } = props
  return (
    <Container>
      {text}
    </Container>
  )
}
