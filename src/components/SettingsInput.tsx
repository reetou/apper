import React from 'react'
import SettingsTitle from "./SettingsTitle";

interface Props {
  hidden?: boolean;
  value: any;
  onChange: (value: any) => void;
  title: string;
  textarea?: boolean;
}

export default function SettingsInput(props: Props) {
  const {
    title,
    hidden,
    onChange,
    value,
    textarea,
  } = props
  if (hidden) {
    return null
  }
  return (
    <div style={{ marginTop: 12 }}>
      <SettingsTitle text={title} />
      {
        textarea
          ? (
            <textarea
              style={{ width: '100%', minHeight: 90 }}
              value={String(value)}
              onChange={(e) => onChange(e.target.value)}
            />
          ) : (
            <input
              style={{ minWidth: 200 }}
              value={String(value)}
              onChange={(e) => onChange(e.target.value)}
            />
          )
      }
    </div>
  )
}