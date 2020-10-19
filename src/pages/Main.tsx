import React, { useState } from 'react'
import styled from "styled-components";
import Button from "../components/Button";
import { useHistory } from 'react-router-dom';


const Container = styled.div`
  margin: 0 10rem;
  padding-bottom: 10%;
`

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 100px);
`

const ContentTitle = styled.div`
  font-family: Nunito, sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 48px;
  line-height: 65px;
`

const SecondaryTitle = styled.div`
  font-family: Nunito, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 49px;
`

const ContentDescription = styled.div`
  font-family: Nunito, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 33px;
  max-width: 500px;
  margin-top: 20px;
`

const Row = styled.div`
  display: flex;
  align-items: center;
`

const InfoContent = styled.div`
  font-family: Nunito, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  color: #817F7F;
`

const FeaturesRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const FeatureTitle = styled(SecondaryTitle)`
  font-size: 1.3rem;
`

interface FeatureProps {
  title: string,
  text: string
}

function Feature({title, text}: FeatureProps) {
  return (
    <div style={{ width: '30%' }}>
      <FeatureTitle>{title}</FeatureTitle>
      <div>{text}</div>
    </div>
  )
}

const FEATURES: FeatureProps[] = [
  {
    title: 'Simple',
    text: 'You don’t need to have any coding skills to start building your app - just drag components around and preview your changes realtime.'
  },
  {
    title: 'Powerful',
    text: 'If you prefer using third party backend you can fetch data from any REST API - just enter endpoint URL and you are good to go. '
  },
  {
    title: 'Customizable',
    text: 'Although we have templates to help you get started, you can create a project from scratch and design your own app.'
  },
  {
    title: 'Build is built-in!',
    text: 'We will automatically build your app with your App Store and Google Play certificates and provide you with an app bundle (.ipa for iOS and .apk for Android) - simple as that.  \n' +
      '\n' +
      'If you have any troubles during the process, feel free to ask us for help.'
  },
  {
    title: 'Over-the-air updates',
    text: 'After your app was uploaded to stores once, you can instantly publish your app changes directly to users - thanks to cross-platform OTA updates.'
  },
  {
    title: 'Just works',
    text: 'We provide an interface for sending push notifications, submitting forms, fetching data and many more - all to help you save your time.'
  },
]

export default function Main() {
  const history = useHistory()
  const tryDemo = () => {
    history.push('/demo')
  }
  return (
    <Container>
      <Hero>
        <div>
          <ContentTitle>Bootstrap your mobile app.</ContentTitle>
          <ContentTitle>No coding required.</ContentTitle>
          <ContentDescription>
            <b>Mekanix</b> is a mobile app builder platform that lets you prototype and build
            a <b>cross-platform mobile app</b> through intuitive interface right in your browser.
          </ContentDescription>
          <Row style={{ marginTop: 12 }}>
            <Button
              style={{ paddingLeft: '3rem', paddingRight: '3rem' }}
              onClick={tryDemo}
            >
              TRY DEMO
            </Button>
            <div style={{ marginRight: 12 }} />
            <InfoContent>No credit card required</InfoContent>
          </Row>
        </div>
        <SecondaryTitle style={{ textAlign: 'center' }}>Features</SecondaryTitle>
      </Hero>
      <FeaturesRow>
        {
          FEATURES.map(f => (
            <Feature {...f} />
          ))
        }
      </FeaturesRow>
      <div
        style={{
          marginTop: '5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Button
          style={{
            width: 400,
            fontSize: '1.25rem',
          }}
          onClick={tryDemo}
        >
          TRY DEMO FOR FREE
        </Button>
        <InfoContent style={{ marginTop: 12 }}>No credit card or registration required</InfoContent>
      </div>
    </Container>
  )
}