import React, { useEffect } from 'react'
import SettingsTitle from "./SettingsTitle";
import styled from 'styled-components';
import Styleguide from "../Styleguide";

interface SettingsOption {
  value: any;
  label: string;
  disabled?: boolean;
}

interface Props {
  hidden?: boolean;
  value: any;
  onChange: (value: any) => void;
  title: string;
  options: SettingsOption[];
}

const StyledSelect = styled.select`
  min-width: 120px;
  padding: 6px;
  border-radius: 4px;
  background-color: ${Styleguide.inputBgColor};
  border: none;
  color: ${Styleguide.primaryColor};
`

export default function SettingsSelect(props: Props) {
  const {
    title,
    hidden,
    onChange,
    options,
    value,
  } = props
  useEffect(() => {
    if (hidden) {
      return
    }
    if (!value && options.length) {
      console.log(`Changing default val on mount to`, options[0])
      onChange(String(options[0].value))
    }
  }, [hidden])
  if (hidden) {
    return null
  }
  return (
    <div style={{ marginTop: 12 }}>
      <SettingsTitle text={title} />
      <StyledSelect
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        {
          options.map(o => (
            <option disabled={o.disabled} key={`${o.value}_${o.label}_${title}`} value={o.value}>{o.label}</option>
          ))
        }
      </StyledSelect>
    </div>
  )
}