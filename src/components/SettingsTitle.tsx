import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  margin: 4px 0;
  font-size: 1rem;
  letter-spacing: 0.5px;
  font-weight: 600;
  max-width: 250px;
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
