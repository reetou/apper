import React, { useContext, useEffect, useState } from 'react'
import BarContainer from "./BarContainer";
import CustomComponentContainer from "./CustomComponentContainer";
import CustomInput from "./mobile_components/CustomInput";
import BuilderContext, { CustomComponent, CustomComponentType, CustomPage } from "../store/BuilderContext";
import {
  ALL_CUSTOM_COMPONENT_TYPES,
  CustomGenericButtonData,
  CustomGenericRoundedButtonData,
  CustomInputData, TextBlockData,
} from "./mobile_components";
import CustomGenericButton from "./mobile_components/CustomGenericButton";
import CustomComponentBlock from "./CustomComponentBlock";
import { useDrop } from "react-dnd";
import update from 'immutability-helper'
import styled from 'styled-components'
import TextBlock from "./mobile_components/TextBlock";

const Overlay = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(227, 227, 227, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`

export default function Leftbar() {
  const { onAddComponent, openedPage, setOpenedPage, draggingItemId } = useContext(BuilderContext)
  const [componentsIds, setComponentsIds] = useState<string[]>(openedPage.components.map(c => c.id))
  useEffect(() => {
    setComponentsIds(openedPage.components.map(c => c.id))
  }, [openedPage])
  const [state, drop] = useDrop({
    accept: ALL_CUSTOM_COMPONENT_TYPES,
    drop(item: {id: string, type: CustomComponentType }) {
      console.log(`On drop delete`, item)
      const index = componentsIds.indexOf(item.id)
      if (index > -1) {
        setOpenedPage(prevPage => update(prevPage, { components: { $splice: [[index, 1]] } }))
      }
      return undefined
    },
    collect: (monitor) => {
      return {
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        draggingColor: monitor.getItemType() as string,
      }
    },
  })
  const canRemove = (draggingItemId && componentsIds.includes(draggingItemId))
  return (
    <BarContainer ref={drop}>
      {
        canRemove
          ? (
            <Overlay>
              <div style={{ textAlign: 'center' }}>
                {
                  state.isOver
                    ? 'Теперь отпустите'
                    : 'Перенесите сюда, чтобы удалить компонент'
                }
              </div>
            </Overlay>
          )
          : null
      }
      <h3>Компоненты</h3>
      <CustomComponentBlock
        title="Взаимодействие"
      >
        <CustomComponentContainer
          data={CustomInputData()}
        >
          <CustomInput thumbnail />
        </CustomComponentContainer>
        <CustomComponentContainer
          data={CustomGenericButtonData()}
        >
          <CustomGenericButton thumbnail />
        </CustomComponentContainer>
        <CustomComponentContainer
          data={CustomGenericRoundedButtonData()}
        >
          <CustomGenericButton thumbnail rounded />
        </CustomComponentContainer>
        <CustomComponentContainer
          data={TextBlockData()}
        >
          <TextBlock thumbnail />
        </CustomComponentContainer>
      </CustomComponentBlock>
    </BarContainer>
  )
}