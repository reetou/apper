import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import Styleguide from "../Styleguide";
import Button from "../components/Button";
import PageContainer from "../components/PageContainer";
import BuildSettingsIos from "../components/BuildSettingsIos";
import { AndroidBuildSettings, IosBuildSettings } from "../types/buildSettings";
import BuildSettingsAndroid from '../components/BuildSettingsAndroid';
import { getProject } from "../api/Project";
import { useHistory, useParams } from "react-router-dom";


const Container = styled.div`
  display: flex;
`

const Title = styled.div`
  color: ${Styleguide.primaryColor};
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
`

export default function ProjectBuild() {
  const history = useHistory()
  const routeParams = useParams<{ id: string }>()
  const [loading, setLoading] = useState<boolean>(true)
  const [iosSettings, setIosSettings] = useState<IosBuildSettings>({
    bundle_id: '',
    apple_team_id: '',
    p12_password: '',
  })
  const [androidSettings, setAndroidSettings] = useState<AndroidBuildSettings>({
    bundle_id: '',
    keystore_alias: '',
    keystore_password: '',
    key_password: '',
  })
  const [selectedPlatform, setSelectedPlatform] = useState<'ios' | 'android'>('android')
  const buildIos = () => {
    console.log(`Building ios`, iosSettings)
  }
  const buildAndroid = () => {
    console.log(`Building android`, androidSettings)
  }
  useEffect(() => {
    const loadProject = async () => {
      try {
        const res = await getProject(routeParams.id)
        console.log(`Loaded project`, res)
        setLoading(false)
      } catch (e) {
        console.error('Cannot load project', routeParams)
        history.replace('/404')
      }
    }
    console.log(`Gonna get project and show builder for it`)
    loadProject()
  }, [routeParams])
  if (loading) {
    return null
  }
  return (
    <Container>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <PageContainer>
          <Title>Публикация изменений</Title>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: 12,
            }}
          >
            <div style={{ width: '70%' }}>
              Публикация изменений позволяет мгновенно доставить визуальные обновления в приложение.
            </div>
            <div style={{ width: '70%' }}>
              Мы рекомендуем этот способ обновления, если Ваше приложение уже выложено в App Store/Google Play.
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              style={{
                marginTop: 12,
              }}
              onClick={() => {

              }}
            >
              Опубликовать изменения
            </Button>
          </div>
        </PageContainer>
        <PageContainer>
          <Title>Сборка приложения</Title>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '70%', fontWeight: 'bold' }}>
              По причинам безопасности, мы не храним Ваши сертификаты и пароли на своих серверах - после сборки они будут удалены
            </div>
          </div>
          <div
            style={{
              marginTop: 12,
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Button
              onClick={() => {
                setSelectedPlatform('ios')
              }}
              disabled={selectedPlatform === 'ios'}
            >
              iOS
            </Button>
            <div style={{ marginRight: 12 }} />
            <Button
              onClick={() => {
                setSelectedPlatform('android')
              }}
              disabled={selectedPlatform === 'android'}
            >
              Android
            </Button>
          </div>
          { selectedPlatform === 'ios' ? <BuildSettingsIos settings={iosSettings} setSettings={setIosSettings} /> : null }
          { selectedPlatform === 'android' ? <BuildSettingsAndroid settings={androidSettings} setSettings={setAndroidSettings} /> : null }
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              style={{
                marginTop: 12,
              }}
              onClick={() => {
                if (selectedPlatform === 'ios') {
                  buildIos()
                  return
                }
                buildAndroid()
              }}
            >
              Запустить сборку {selectedPlatform === 'ios' ? 'iOS' : 'Android'}
            </Button>
          </div>
        </PageContainer>
      </div>
      <PageContainer style={{ width: '60%' }}>
        <Title>Что выбрать?</Title>
        <div>
          Сборка приложения требуется при первой загрузке приложения в App Store/Google Play, изменении иконки, сплэш-экрана, названия или при обновлении ядра Mekanix.
          Если Ваше приложение уже загружено в App Store/Google Play, Вам стоит взглянуть на публикацию изменений.
        </div>
        <div style={{ marginTop: 8, fontWeight: 'bold' }}>
          Сборка приложения занимает до 6 часов, тогда как публикация изменений - всего несколько минут.
        </div>
      </PageContainer>
    </Container>
  )
}