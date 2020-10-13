import React from 'react'
import SettingsTitle from "./SettingsTitle";
import Slider from 'rc-slider'

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
              style={{ width: '100%', minHeight: 90 }}
              value={String(value)}
              onChange={(e) => onChange(e.target.value)}
            />
          ) : (
            <React.Fragment>
              {
                slider
                  ? (
                    <Slider
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
                    <input
                      style={{ minWidth: 200 }}
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