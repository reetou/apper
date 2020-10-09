import React from 'react'

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
    <div>
      <div style={{ marginBottom: 4, marginTop: 4 }}>{title}</div>
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