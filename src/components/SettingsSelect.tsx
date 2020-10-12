import React from 'react'
import SettingsTitle from "./SettingsTitle";

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

export default function SettingsSelect(props: Props) {
  const {
    title,
    hidden,
    onChange,
    options,
    value,
  } = props
  if (hidden) {
    return null
  }
  return (
    <div style={{ marginTop: 12 }}>
      <SettingsTitle text={title} />
      <select value={value} onChange={e => onChange(e.target.value)}>
        {
          options.map(o => (
            <option disabled={o.disabled} key={`${o.value}_${o.label}_${title}`} value={o.value}>{o.label}</option>
          ))
        }
      </select>
    </div>
  )
}