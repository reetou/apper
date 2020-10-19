import React, { Dispatch, SetStateAction } from 'react'
import SettingsInput from "./SettingsInput";
import { IosBuildSettings } from "../types/buildSettings";
import update from 'immutability-helper'

interface Props {
  settings: IosBuildSettings,
  setSettings: Dispatch<SetStateAction<IosBuildSettings>>,
}

export default function BuildSettingsIos(props: Props) {
  const { settings, setSettings } = props
  return (
    <React.Fragment>
      <SettingsInput
        value={settings.bundle_id}
        onChange={(val) => {
          setSettings(update(settings, {
            bundle_id: {
              $set: val
            }
          }))
        }}
        title="Bundle ID"
      />
      <SettingsInput
        value={settings.apple_team_id}
        onChange={(val) => {
          if (val.length > 10) {
            return
          }
          setSettings(update(settings, {
            apple_team_id: {
              $set: val
            }
          }))
        }}
        title="Apple Team ID"
      />
      <SettingsInput
        value={settings.p12_password}
        onChange={(val) => {
          setSettings(update(settings, {
            p12_password: {
              $set: val
            }
          }))
        }}
        title="Пароль от .p12 сертификата"
      />
    </React.Fragment>
  )
}