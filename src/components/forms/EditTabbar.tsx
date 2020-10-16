import React, { PropsWithoutRef, useCallback, useContext } from 'react'
import BuilderContext, { CustomComponent, TabbarItem } from "../../store/BuilderContext";
import styled from "styled-components";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native-web";
import { NavigationContainer } from "@react-navigation/native";
// @ts-ignore
import Icon, { FontAwesome } from 'react-web-vector-icons';
import MainScreen from "../simulator/MainScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { isEmbeddable, isFloating } from "../../utils/componentUtils";
import MovableContainer from "../MovableContainer";
import { ALL_CUSTOM_COMPONENT_TYPES } from "../mobile_components";

const Stack = createStackNavigator()

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Tab = createBottomTabNavigator()

const Screen = (props: { route: { name: string } }) => {
  const {
    tabbarSettings,
    pages,
  } = useContext(BuilderContext)
  const { route } = props
  const tabbarItem = tabbarSettings.items.find(item => item.id === route.name)
  const tabbarItemPage = tabbarItem && tabbarItem.page_id ? pages.find(p => p.id === tabbarItem.page_id) : null
  const page = tabbarItemPage || pages[0]
  const onMove = useCallback((id, afterId) => {

  }, [pages])

  const embeddableChildren = page.components.filter(isEmbeddable).map((c: CustomComponent) => {
    const { component: Component } = c
    return (
      <Component key={c.id} {...c.props} data={c.data} componentId={c.id}>
        {c.children}
      </Component>
    )
  })
  const floatingChildren = page.components.filter(isFloating).map((c: CustomComponent) => {
    const { component: Component } = c
    return (
      <Component key={c.id} {...c.props} data={c.data} componentId={c.id}>
        {c.children}
      </Component>
    )
  })
  return (
    <MainScreen
      floatingChildren={floatingChildren}
      embeddableChildren={embeddableChildren}
      openedPage={page}
      dropViewStyle={{
        margin: page.margin[0],
        padding: page.padding[0],
      }}
    />
  )
}

interface TabbarIconProps {
  showLabel: boolean;
  item: TabbarItem;
  color: string;
  size: number;
}

function TabbarIcon(props: TabbarIconProps) {
  const {
    showLabel,
    item,
    size,
    color,
  } = props
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <FontAwesome
        name={item.icon}
        color={color}
        size={size}
      />
      {
        showLabel
          ? (
            <Text
              style={{
                marginTop: 4,
                fontSize: 10,
                fontWeight: 'bold',
                letterSpacing: 0.5,
              }}
            >
              {item.label}
            </Text>
          )
          : null
      }
    </View>
  )
}

export default function EditTabbar() {
  const {
    tabbarSettings,
  } = useContext(BuilderContext)
  return (
    <Container>
      <div
        style={{
          width: 375,
          height: 812,
          border: '2px solid red',
          position: 'relative',
        }}
      >
        <View style={{ flex: 1, height: '100%' }}>
          <NavigationContainer>
            <Tab.Navigator
              backBehavior="initialRoute"
              screenOptions={({ route }) => ({
                tabBarIcon: (tabbarProps) => {
                  const { focused, color, size } = tabbarProps
                  const item = tabbarSettings.items.find(item => item.id === route.name)
                  if (!item) {
                    return null
                  }
                  return (
                    <View style={{ width: 50 }}>
                      <TabbarIcon
                        showLabel={tabbarSettings.show_label}
                        item={item}
                        color={focused ? tabbarSettings.selected_color : tabbarSettings.color}
                        size={20}
                      />
                    </View>
                  )
                },
              })}
              tabBarOptions={{
                activeTintColor: tabbarSettings.selected_color,
                inactiveTintColor: tabbarSettings.color,
                labelStyle: {
                  fontSize: 8,
                  fontWeight: 'bold',
                  textTransform: 'uppercase'
                },
                showLabel: false,
              }}
            >
              {
                tabbarSettings.items.map(item => (
                  <Tab.Screen
                    component={Screen}
                    name={item.id}
                    options={{
                      title: item.label,
                    }}
                  />
                ))
              }
            </Tab.Navigator>
          </NavigationContainer>
        </View>
      </div>
    </Container>
  )
}