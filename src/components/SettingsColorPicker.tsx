import React, { useRef, useState } from 'react'
import { SketchPicker } from 'react-color';
import { rgbToString } from "../utils/componentUtils";
import SettingsTitle from "./SettingsTitle";
import SettingsInput from "./SettingsInput";
import { useClickAway } from "react-use";

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
  const [showPicker, setShowPicker] = useState<boolean>(false)
  const ref = useRef(null)
  useClickAway(ref, () => {
    setShowPicker(false)
  });
  if (hidden) {
    return null
  }
  return (
    <div style={{ marginTop: 12 }}>
      <SettingsTitle text={title} />
      <div style={{ marginTop: 8 }} />
      <div ref={ref} style={{ width: 'fit-content' }}>
        {
          showPicker
            ? (
              <SketchPicker
                presetColors={[]}
                color={value}
                onChange={({ rgb }) => onChange(rgbToString(rgb))}
              />
            )
            : (
              <div
                onClick={() => {
                  setShowPicker(true)
                }}
                data-label="Container"
              >
                <SettingsInput
                  value={value}
                  onChange={() => {}}
                  title=""
                />
              </div>
            )
        }
      </div>
    </div>
  )
}