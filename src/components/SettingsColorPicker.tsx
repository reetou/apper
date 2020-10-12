import React from 'react'
import { SketchPicker } from 'react-color';
import { rgbToString } from "../utils/componentUtils";
import SettingsTitle from "./SettingsTitle";

interface Props {
  value: string;
  title: string;
  hidden?: boolean;
  onChange: (value: string) => void;
}

export default function SettingsColorPicker(props: Props) {
  const {
    hidden,
    title,
    value,
    onChange,
  } = props
  if (hidden) {
    return null
  }
  return (
    <div style={{ marginTop: 12 }}>
      <SettingsTitle text={title} />
      <div style={{ marginTop: 8 }} />
      <SketchPicker
        presetColors={[]}
        color={value}
        onChange={({ rgb }) => onChange(rgbToString(rgb))}
      />
    </div>
  )
}