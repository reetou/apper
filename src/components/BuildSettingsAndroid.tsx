import React, { Dispatch, SetStateAction } from 'react'
import SettingsInput from "./SettingsInput";
import { AndroidBuildSettings } from "../types/buildSettings";
import update from "immutability-helper";

interface Props {
  settings: AndroidBuildSettings,
  setSettings: Dispatch<SetStateAction<AndroidBuildSettings>>,
}

export default function BuildSettingsAndroid(props: Props) {
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
        value={settings.keystore_alias}
        onChange={(val) => {
          setSettings(update(settings, {
            keystore_alias: {
              $set: val
            }
          }))
        }}
        title="Keystore Alias"
      />
      <SettingsInput
        value={settings.keystore_password}
        onChange={(val) => {
          setSettings(update(settings, {
            keystore_password: {
              $set: val
            }
          }))
        }}
        title="Keystore Password"
      />
      <SettingsInput
        value={settings.key_password}
        onChange={(val) => {
          setSettings(update(settings, {
            key_password: {
              $set: val
            }
          }))
        }}
        title="Android Key Password"
      />
    </React.Fragment>
  )
}