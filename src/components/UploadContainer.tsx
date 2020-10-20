import React, { ReactNode } from 'react'
import styled from 'styled-components'
import Styleguide from "../Styleguide";
import { darken } from "polished";

interface Props {
  isDragActive: boolean,
  title: string,
}

const Container = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
`

const UploadTitle = styled.div`
  color: ${Styleguide.primaryColor};
  font-weight: 600;
  font-size: 1rem;
  max-width: 250px;
`

const UploadDescription = styled.div`
  margin-top: 6px;
  color: ${Styleguide.secondaryColor};
  font-weight: 500;
  font-size: 0.9rem;
  text-align: center;
  border-radius: 4px;
  padding: 1rem;
  background-color: ${Styleguide.inputBgColor};
  border: 2px solid ${Styleguide.inputBgColor};
  cursor: crosshair;
  width: 200px;
  :focus {
    background-color: ${darken(0.1, Styleguide.inputBgColor)};
  }
  :hover {
    background-color: ${darken(0.05, Styleguide.inputBgColor)};
  }
`

export default function UploadContainer(props: Props) {
  const { isDragActive, title } = props
  return (
    <Container>
      <UploadTitle>{title}</UploadTitle>
      <UploadDescription>
        {
          isDragActive
            ? 'Drop it here'
            : 'Drag and drop file here or click to select file'
        }
      </UploadDescription>
    </Container>
  )
}