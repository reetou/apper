import React, { Dispatch, SetStateAction } from 'react'
import SettingsInput from "./SettingsInput";
import { IosBuildSettings } from "../types/buildSettings";
import update from 'immutability-helper'
import AppleP12CertUpload from "./AppleP12CertUpload";
import AppleProvisioningProfileUpload from "./AppleProvisioningProfileUpload";
import styled from "styled-components";

interface Props {
  settings: IosBuildSettings,
  setSettings: Dispatch<SetStateAction<IosBuildSettings>>,
}

const Column = styled.div`
  display: flex;
  flex-direction: column;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`

export default function BuildSettingsIos(props: Props) {
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
          title="Bundle ID из App Store Connect"
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
          title="Apple Team ID (10 символов)"
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
      </Column>
      <Column>
        <AppleP12CertUpload
          onUpload={(file) => {
            setSettings(update(settings, {
              p12_cert: {
                $set: file
              },
            }))
          }}
          file={settings.p12_cert}
        />
        <AppleProvisioningProfileUpload
          onUpload={(file) => {
            setSettings(update(settings, {
              provisioning_profile: {
                $set: file
              },
            }))
          }}
          file={settings.provisioning_profile}
        />
      </Column>
    </Row>
  )
}