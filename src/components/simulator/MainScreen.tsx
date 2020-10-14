import BuilderContext, { CustomComponent, CustomPage } from "../../store/BuilderContext";
import React, { ReactNode, useContext } from "react";
import { View } from "react-native-web";
import { isEmbeddable, isFloating } from "../../utils/componentUtils";
import MovableContainer from "../MovableContainer";
import { ALL_CUSTOM_COMPONENT_TYPES } from "../mobile_components";
import { createStackNavigator } from "@react-navigation/stack";
import CustomOnboarding from "../mobile_pages/CustomOnboarding";


interface MainScreenProps {
  openedPage: CustomPage;
  dropViewStyle: any;
  onMove: (id: string, afterId: string) => void;
  showHeader?: boolean;
}
const Stack = createStackNavigator()

export default function MainScreen(props: MainScreenProps) {
  const {
    openedPage,
    dropViewStyle,
    onMove,
  } = props
  const { mode } = useContext(BuilderContext)
  if (mode === 'edit_onboarding') {
    return <CustomOnboarding />
  }
  const embeddableChildren = openedPage.components.filter(isEmbeddable).map((c: CustomComponent) => {
    const { component: Component } = c
    return (
      <MovableContainer
        key={c.id}
        id={c.id}
        type={c.item_type}
        accept={ALL_CUSTOM_COMPONENT_TYPES}
        onMove={onMove}
      >
        <Component {...c.props} data={c.data} componentId={c.id}>
          {c.children}
        </Component>
      </MovableContainer>
    )
  })
  const floatingChildren = openedPage.components.filter(isFloating).map((c: CustomComponent) => {
    const { component: Component } = c
    return (
      <MovableContainer
        key={c.id}
        id={c.id}
        type={c.item_type}
        accept={ALL_CUSTOM_COMPONENT_TYPES}
        onMove={onMove}
      >
        <Component {...c.props} data={c.data} componentId={c.id}>
          {c.children}
        </Component>
      </MovableContainer>
    )
  })
  const Main = () => (
    <View style={{ flex: 1, height: '100%' }}>
      {
        openedPage?.page_type === 'screen'
          ? (
            <View style={{ flex: 1, ...dropViewStyle, position: 'relative' }}>
              {embeddableChildren}
              {
                floatingChildren.length
                  ? (
                    <View
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                      }}
                    >
                      <View>
                        {floatingChildren}
                      </View>
                    </View>
                  )
                  : null
              }
            </View>
          )
          : null
      }
      {
        openedPage?.page_type === 'modal'
          ? (
            <View style={{ flex: 1, position: 'relative' }}>
              {embeddableChildren}
            </View>
          )
          : null
      }
    </View>
  )
  if (openedPage.page_type === 'modal') {
    return <Main />
  }
  return (
    <Stack.Navigator initialRouteName="Simulator_MainScreen">
      <Stack.Screen
        name="Simulator_MainScreen"
        options={{
          headerShown: openedPage.nav_header_mode === 'show',
          title: openedPage.nav_header_title || '',
        }}
        component={Main}
      />
    </Stack.Navigator>
  )
}