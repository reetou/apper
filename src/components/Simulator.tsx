import React, { ReactNode, useContext } from 'react'
import { View } from 'react-native-web'
import styled from 'styled-components'
import BuilderContext, { CustomComponent, CustomPage, PageType } from "../store/BuilderContext";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

function getPageProps(page?: CustomPage): object {
  if (!page) {
    return {}
  }
  switch (page.pageType) {
    case "screen":
      return {
        style: {
          flex: 1,
          height: '100%',
        }
      }
    case "modal":
      return {
        style: {
          flex: 1,
          height: '100%',
          backgroundColor: 'red'
        }
      }
  }
}

export default function Simulator() {
  const { openedPage } = useContext(BuilderContext)
  if (!openedPage) {
    return null
  }
  const children = openedPage.components.map((c: CustomComponent, i) => {
    const { component: Component } = c
    return (
      <Component {...c.props} key={`${c.title}_${i}`}>
        {c.children}
      </Component>
    )
  })
  return (
    <Container>
      <div style={{ width: 375, height: 812, border: '2px solid red' }}>
        <View style={{ flex: 1, height: '100%' }}>
          {
            openedPage?.pageType === 'screen'
              ? (
                <View style={{ flex: 1 }}>
                  {children}
                </View>
              )
              : null
          }
          {
            openedPage?.pageType === 'modal'
              ? (
                <View style={{ flex: 1 }}>
                  {children}
                </View>
              )
              : null
          }
        </View>
      </div>
    </Container>
  )
}