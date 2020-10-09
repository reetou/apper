import React, { useContext, useEffect, useState } from 'react'
import BarContainer from "./BarContainer";
import CustomComponentContainer from "./CustomComponentContainer";
import CustomInput from "./mobile_components/CustomInput";
import BuilderContext, { CustomComponent, CustomComponentType, CustomPage } from "../store/BuilderContext";
import {
  ALL_CUSTOM_COMPONENT_TYPES,
  CustomGenericButtonData,
  CustomGenericRoundedButtonData, CustomImageData,
  CustomInputData, TextBlockData,
} from "./mobile_components";
import CustomGenericButton from "./mobile_components/CustomGenericButton";
import CustomComponentBlock from "./CustomComponentBlock";
import { useDrop } from "react-dnd";
import update from 'immutability-helper'
import styled from 'styled-components'
import TextBlock from "./mobile_components/TextBlock";
import CustomImage from "./mobile_components/CustomImage";

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

const INTERACTION_BLOCK = {
  title: 'Взаимодействие',
  components: [
    {
      component: <CustomInput thumbnail />,
      data: CustomInputData()
    },
    {
      component: <CustomGenericButton thumbnail />,
      data: CustomGenericButtonData()
    },
    {
      component: <CustomGenericButton thumbnail rounded />,
      data: CustomGenericRoundedButtonData()
    },
    {
      component: <TextBlock thumbnail />,
      data: TextBlockData()
    },
    {
      component: <CustomImage thumbnail />,
      data: CustomImageData()
    },
  ]
}

const BLOCKS = [
  INTERACTION_BLOCK,
]

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
      {
        BLOCKS.map(b => (
          <CustomComponentBlock
            title={b.title}
          >
            {
              b.components.map(c => (
                <CustomComponentContainer
                  data={c.data}
                >
                  {c.component}
                </CustomComponentContainer>
              ))
            }
          </CustomComponentBlock>
        ))
      }
    </BarContainer>
  )
}