import axios from 'axios'
import { API_HOST, getAuthHeaders } from "./index";
import { AndroidBuildSettings, IosBuildSettings } from "../types/buildSettings";

export async function fetchBuilds(): Promise<{builds_count: number}> {
  try {
    const res = await axios({
      method: 'GET',
      url: `${API_HOST}/api/projects/builds`,
      headers: getAuthHeaders()
    })
    return res.data
  } catch (e) {
    console.error(`Cannot fetch builds`, e)
    throw e
  }
}

export async function buildProjectIos(id: string, settings: IosBuildSettings): Promise<{}> {
  try {
    if (!settings.p12_cert || !settings.provisioning_profile) {
      throw new Error(`No p12 certificate or provisioning profile provided`)
    }
    const formData = new FormData()
    formData.append('p12_cert', settings.p12_cert)
    formData.append('provisioning_profile', settings.provisioning_profile)
    formData.append('apple_team_id', settings.apple_team_id)
    formData.append('bundle_id', settings.bundle_id)
    formData.append('p12_password', settings.p12_password)
    const res = await axios({
      method: 'POST',
      url: `${API_HOST}/api/projects/${id}/build/ios`,
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'multipart/form-data'
      },
      data: formData,
    })
    return res.data
  } catch (e) {
    console.error(`Cannot build ios project ${id}`, e)
    throw e
  }
}

export async function buildProjectAndroid(id: string, settings: AndroidBuildSettings): Promise<{}> {
  try {
    if (!settings.keystore_jks) {
      throw new Error(`No keystore provided`)
    }
    const formData = new FormData()
    formData.append('keystore_jks', settings.keystore_jks)
    formData.append('key_password', settings.key_password)
    formData.append('keystore_password', settings.keystore_password)
    formData.append('keystore_alias', settings.keystore_alias)
    formData.append('bundle_id', settings.bundle_id)
    const res = await axios({
      method: 'POST',
      url: `${API_HOST}/api/projects/${id}/build/android`,
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'multipart/form-data'
      },
      data: formData,
    })
    return res.data
  } catch (e) {
    console.error(`Cannot build android project ${id}`, e)
    throw e
  }
}