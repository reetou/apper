import React from 'react'
import SettingsTitle from "./SettingsTitle";
import SettingsInput from "./SettingsInput";

interface Props {
  hidden?: boolean;
  marginValue: any;
  paddingValue: any;
  onChangeMargin: (value: any) => void;
  onChangePadding: (value: any) => void;
}

export default function SettingsMarginPadding(props: Props) {
  const {
    hidden,
    marginValue,
    paddingValue,
    onChangeMargin,
    onChangePadding,
  } = props
  if (hidden) {
    return null
  }
  return (
    <div style={{ marginTop: 12 }}>
      <SettingsInput
        slider
        max={40}
        value={marginValue || '0'}
        onChange={onChangeMargin}
        title="Внешний отступ (margin)"
      />
      <SettingsInput
        slider
        max={40}
        value={paddingValue || '0'}
        onChange={onChangePadding}
        title="Внутренний отступ (padding)"
      />
    </div>
  )
}