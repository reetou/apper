import React, { ReactNode } from 'react'
import styled from 'styled-components'

interface Props {
  children: ReactNode,
  title: string,
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export default function SettingsBlock(props: Props) {
  const { children, title } = props
  return (
    <div>
      <h4>{title}</h4>
      <Container>
        {children}
      </Container>
    </div>
  )
}