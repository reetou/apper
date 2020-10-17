import BuilderContext, { CustomComponent, CustomPage } from "../../store/BuilderContext";
import React, { ReactNode, useContext } from "react";
import { View } from "react-native-web";
import { createStackNavigator } from "@react-navigation/stack";
import CustomOnboarding from "../mobile_pages/CustomOnboarding";


interface MainScreenProps {
  openedPage: CustomPage;
  dropViewStyle: any;
  embeddableChildren: ReactNode[];
  floatingChildren: ReactNode[];
  withStackNavigator?: boolean;
}
const Stack = createStackNavigator()

export default function MainScreen(props: MainScreenProps) {
  const {
    openedPage,
    dropViewStyle,
    embeddableChildren,
    floatingChildren,
    withStackNavigator,
  } = props
  const { mode } = useContext(BuilderContext)
  if (mode === 'edit_onboarding') {
    return <CustomOnboarding />
  }
  const pageStyle = {
    backgroundColor: openedPage.background_color,
  }
  const Main = () => (
    <View style={{ flex: 1, height: '100%' }}>
      {
        openedPage?.page_type === 'screen'
          ? (
            <View style={{ flex: 1, ...dropViewStyle, position: 'relative', ...pageStyle }}>
              {embeddableChildren}
            </View>
          )
          : null
      }
      {
        openedPage?.page_type === 'modal'
          ? (
            <View style={{ flex: 1, position: 'relative', ...pageStyle }}>
              {embeddableChildren}
            </View>
          )
          : null
      }
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
  if (openedPage.page_type === 'modal') {
    return Main()
  }
  if (!withStackNavigator) {
    return Main()
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