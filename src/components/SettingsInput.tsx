import React from 'react'
import SettingsTitle from "./SettingsTitle";
import Slider from 'rc-slider'
import Styleguide from '../Styleguide';
import styled from "styled-components";
import { darken } from "polished";

interface Props {
  hidden?: boolean;
  value: any;
  onChange: (value: any) => void;
  title: string;
  textarea?: boolean;
  slider?: boolean;
  max?: number;
  min?: number;
  dots?: boolean;
}

const StyledInput = styled.input`
  min-width: 200px;
  color: ${Styleguide.primaryColor};
  background-color: ${Styleguide.inputBgColor};
  padding: 6px;
  border: none;
  border-radius: 4px;
  transition: 0.2s;
  :focus {
    background-color: ${darken(0.1, Styleguide.inputBgColor)};
  }
  :hover {
    background-color: ${darken(0.05, Styleguide.inputBgColor)};
  }
`

export default function SettingsInput(props: Props) {
  const {
    title,
    hidden,
    onChange,
    value,
    textarea,
    slider,
    max,
    min,
    dots,
  } = props
  if (hidden) {
    return null
  }
  return (
    <div style={{ marginTop: 12 }}>
      {
        slider
          ? (
            <SettingsTitle text={`${title}: ${value}`} />
          )
          : (
            <SettingsTitle text={title} />
          )
      }
      {
        textarea
          ? (
            <textarea
              style={{
                width: '100%',
                minHeight: 90,
                color: Styleguide.primaryColor,
                backgroundColor: Styleguide.bgColor,
              }}
              value={String(value)}
              onChange={(e) => onChange(e.target.value)}
            />
          ) : (
            <React.Fragment>
              {
                slider
                  ? (
                    <Slider
                      handleStyle={{
                        backgroundColor: Styleguide.infoColor,
                        borderColor: Styleguide.secondaryColor,
                      }}
                      trackStyle={{
                        backgroundColor: Styleguide.secondaryColor,
                      }}
                      value={value}
                      onChange={(val) => {
                        onChange(val)
                      }}
                      dots={dots}
                      max={max}
                      min={min === undefined ? 0 : min}
                    />
                  )
                  : (
                    <StyledInput
                      value={String(value)}
                      onChange={(e) => onChange(e.target.value)}
                    />
                  )
              }
            </React.Fragment>
          )
      }
    </div>
  )
}