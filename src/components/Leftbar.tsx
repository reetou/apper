import React, { useContext, useEffect, useState } from 'react'
import BarContainer from "./BarContainer";
import CustomComponentContainer from "./CustomComponentContainer";
import CustomInput from "./mobile_components/CustomInput";
import BuilderContext, { CustomComponentType } from "../store/BuilderContext";
import {
  ALL_CUSTOM_COMPONENT_TYPES, CustomFloatingButtonData,
  CustomGenericButtonData,
  CustomGenericRoundedButtonData, CustomImageData,
  CustomInputData, CustomListViewData, CustomTextListViewData, TextBlockData,
} from "./mobile_components";
import CustomGenericButton from "./mobile_components/CustomGenericButton";
import CustomComponentBlock from "./CustomComponentBlock";
import { useDrop } from "react-dnd";
import update from 'immutability-helper'
import styled from 'styled-components'
import TextBlock from "./mobile_components/TextBlock";
import CustomImage from "./mobile_components/CustomImage";
import CustomListView from "./mobile_components/CustomListView";
import EditCustomListViewItems from "./forms/EditCustomListViewItems";

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
      component: <CustomImage width={60} height={60} thumbnail />,
      data: CustomImageData()
    },
    {
      component: <CustomListView thumbnail data={{ childComponents: [] }} />,
      data: CustomListViewData()
    },
    {
      component: <CustomListView thumbnail listItemPrepend="circle" noSubtitle noImage  data={{ childComponents: [] }} />,
      data: CustomTextListViewData()
    },
    {
      component: <CustomGenericButton thumbnail rounded />,
      data: CustomFloatingButtonData()
    },
  ]
}

const BLOCKS = [
  INTERACTION_BLOCK,
]

function Blocks() {
  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}

export default function Leftbar() {
  const {
    openedPage,
    setOpenedPage,
    draggingItemId,
    editingComponent,
    setEditingComponent,
    editingListViewId,
  } = useContext(BuilderContext)
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
        if (editingComponent?.id === item.id) {
          console.log(`Also removing editing component`)
          setEditingComponent(undefined)
        }
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
      {
        editingListViewId ? <EditCustomListViewItems /> : <Blocks />
      }
    </BarContainer>
  )
}