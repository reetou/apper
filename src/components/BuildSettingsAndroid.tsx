import React, { Dispatch, SetStateAction } from 'react'
import SettingsInput from "./SettingsInput";
import { AndroidBuildSettings } from "../types/buildSettings";
import update from "immutability-helper";
import AndroidJksKeystoreUpload from './AndroidJksKeystoreUpload';
import styled from "styled-components";

interface Props {
  settings: AndroidBuildSettings,
  setSettings: Dispatch<SetStateAction<AndroidBuildSettings>>,
}

const Column = styled.div`
  display: flex;
  flex-direction: column;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`

export default function BuildSettingsAndroid(props: Props) {
  const { settings, setSettings } = props
  return (
    <Row>
      <Column>
        <SettingsInput
          value={settings.bundle_id}
          onChange={(val) => {
            setSettings(update(settings, {
              bundle_id: {
                $set: val
              }
            }))
          }}
          title="Bundle ID из Google Play"
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
      </Column>
      <Column>
        <AndroidJksKeystoreUpload
          onUpload={(file) => {
            setSettings(update(settings, {
              keystore_jks: {
                $set: file
              }
            }))
          }}
        />
      </Column>
    </Row>
  )
}