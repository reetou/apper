import React, { ReactNode } from 'react'
import styled from "styled-components";
import Styleguide from "../Styleguide";
import { darken, lighten } from "polished";

interface Props {
  style?: any;
  onClick?: (e: any) => void;
  disabled?: boolean;
  children: ReactNode;
}

const StyledButton = styled.button`
  font-family: Nunito, sans-serif;
  border: none;
  background-color: ${({ disabled }) => disabled ? lighten(0.1, Styleguide.secondaryColor) : Styleguide.secondaryColor};
  color: ${Styleguide.buttonTextColor};
  font-weight: bold;
  padding: 8px 20px;
  border-radius: 8px;
  transition: 0.2s;
  :hover {
    background-color: ${({ disabled }) => disabled ? lighten(0.1, Styleguide.secondaryColor) : darken(0.25, Styleguide.secondaryColor)};
    cursor: pointer;
  }
`

export default function Button(props: Props) {
  const {
    children,
    onClick,
    style,
    disabled,
  } = props
  return (
    <StyledButton
      onClick={onClick}
      disabled={Boolean(disabled)}
      style={style}
    >
      {children}
    </StyledButton>
  )
}