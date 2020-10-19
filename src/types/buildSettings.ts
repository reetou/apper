export interface IosBuildSettings {
  bundle_id: string,
  apple_team_id: string,
  p12_password: string,
}

export interface AndroidBuildSettings {
  bundle_id: string,
  keystore_alias: string,
  keystore_password: string,
  key_password: string,
}