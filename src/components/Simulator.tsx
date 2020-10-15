import React, { ReactNode, useCallback, useContext } from 'react'
import { View } from 'react-native-web'
import styled from 'styled-components'
import BuilderContext, { CustomComponent, CustomComponentType, CustomPage } from "../store/BuilderContext";
import { useDrop } from "react-dnd";
import { ALL_CUSTOM_COMPONENT_TYPES, getCustomComponentByItemType } from "./mobile_components";
import update from 'immutability-helper';
import MainScreen from "./simulator/MainScreen";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export default function Simulator() {
  const {
    openedPage,
    onAddComponent,
    setOpenedPage,
  } = useContext(BuilderContext)
  const [state, drop] = useDrop({
    accept: ALL_CUSTOM_COMPONENT_TYPES,
    drop(item: {id: string, type: CustomComponentType }) {
      console.log(`On drop`, item)
      if (openedPage.components.map(c => c.id).includes(item.id)) {
        console.log(`Cancel drop because exists`)
        return
      }
      const customComponent = getCustomComponentByItemType(item.type)
      onAddComponent(customComponent, true)
      return undefined
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      draggingColor: monitor.getItemType() as string,
    }),
  })
  const onMove = useCallback((id: string, afterId: string) => {
    const currentIds = openedPage.components.map(c => c.id)
    if (!currentIds.includes(id) || !currentIds.includes(id)) {
      console.log(`No component found inside`)
      return
    }
    setOpenedPage((prevPage) => {
      const ids = prevPage.components.map(c => c.id)
      const itemIndex = ids.indexOf(id)
      const item = prevPage.components[itemIndex]
      const afterIndex = ids.indexOf(afterId)
      // console.log(`Item replacing`, item)
      // console.log(`Gonna splice ${itemIndex} and remove it and then place it after ${afterIndex}`)
      return update(prevPage, {
        components: {
          $splice: [
            [itemIndex, 1],
            [afterIndex, 0, item],
          ],
        }
      })
    })
  }, [openedPage])
  const dropViewStyle = {
    ...state.isOver ? { backgroundColor: '#efefef' } : {},
    ...openedPage.margin ? { margin: openedPage.margin[0] } : {},
    ...openedPage.padding ? { padding: openedPage.padding[0] } : {},
  }
  return (
    <Container ref={drop}>
      <div
        style={{
          width: 375,
          height: 812,
          border: '2px solid red',
          position: 'relative',
          opacity: state.isOver ? 0.5 : 1
        }}
      >
        <View style={{ flex: 1, height: '100%' }}>
          <MainScreen
            onMove={onMove}
            openedPage={openedPage}
            dropViewStyle={dropViewStyle}
          />
        </View>
      </div>
    </Container>
  )
}