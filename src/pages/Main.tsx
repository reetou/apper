import React, { useState } from 'react'
import styled from "styled-components";
import Button from "../components/Button";
import { useHistory } from 'react-router-dom';


const Container = styled.div`
  padding: 10% 2rem;
  @media(min-width: 1024px) {
    padding-top: 0;
    padding-right: 0;
    padding-left: 0;
    margin: 0 10rem;
  }
`

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 70vh;
  @media(min-width: 768px) {
    height: calc(100vh - 100px);
  }
`

const ContentTitle = styled.div`
  font-family: Nunito, sans-serif;
  font-style: normal;
  font-weight: 800;
  text-align: center;
  font-size: 1.8rem;
  line-height: 2.1rem;
  @media(min-width: 1024px) {
    font-size: 48px;
    line-height: 65px;
    text-align: left;
  }
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
  margin-top: 20px;
  text-align: center;
  @media(min-width: 1024px) {
    font-size: 24px;
    line-height: 33px;
    max-width: 500px;
    text-align: left;
  }
`

const Row = styled.div`
  display: flex;
  align-items: center;
`

const TryButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 12px;
  padding: 0 2rem;
  @media(min-width: 1024px) {
    flex-direction: row;
    align-items: center;
    padding: 0;
  }
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
  flex-direction: column;
  @media(min-width: 1024px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`

const FeatureTitle = styled(SecondaryTitle)`
  font-size: 1.3rem;
  text-align: center;
  @media(min-width: 1024px) {
    text-align: left;
  }
`

const FeatureContainer = styled.div`
  padding: 1rem;
  @media(min-width: 1024px) {
    padding: 0;
    width: 30%;
  }
`

const BottomSpacer = styled.div`
  margin-right: 0;
  @media(min-width: 768px) {
    margin-right: 12px;
  }
`

interface FeatureProps {
  title: string,
  text: string
}

function Feature({title, text}: FeatureProps) {
  return (
    <FeatureContainer>
      <FeatureTitle>{title}</FeatureTitle>
      <div>{text}</div>
    </FeatureContainer>
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
          <TryButtonContainer>
            <Button
              style={{ paddingLeft: '3rem', paddingRight: '3rem' }}
              onClick={tryDemo}
            >
              TRY DEMO
            </Button>
            <div style={{ marginRight: 12 }} />
            <InfoContent>No credit card required</InfoContent>
          </TryButtonContainer>
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
      <TryButtonContainer
      >
        <Button
          onClick={tryDemo}
        >
          TRY DEMO FOR FREE
        </Button>
        <BottomSpacer />
        <InfoContent>No credit card or registration required</InfoContent>
      </TryButtonContainer>
    </Container>
  )
}