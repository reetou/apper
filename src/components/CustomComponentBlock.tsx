import React, { ReactNode } from 'react'
import styled from 'styled-components'

interface Props {
  children: ReactNode,
  title: string,
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export default function CustomComponentBlock(props: Props) {
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