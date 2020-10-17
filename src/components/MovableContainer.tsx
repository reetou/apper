import React, { ReactNode, useContext, useEffect, useRef, useState } from 'react'
import { useDrag, useDrop } from "react-dnd";
import BuilderContext, { CustomComponentType } from "../store/BuilderContext";
import { useHover } from "react-use";
import styled from 'styled-components';
import { COMPONENTS_WITH_LIST_ITEMS } from "./mobile_components";
import update from 'immutability-helper'

interface Props {
  id: string,
  type: CustomComponentType,
  accept: string[],
  children: ReactNode,
  onMove: (id1: string, id2: string) => void;
}

const Container = styled.div<{editing: boolean, isDragging: boolean}>`
  position: relative;
  border: ${({ editing }) => editing ? '2px solid red' : 'none'};
`

const Overlay = styled.div`
  position: absolute;
  right: 3px;
  top: 3px;
  z-index: 10;
  cursor: pointer;
  display: flex;
`

const Icon = styled.div`
  width: 20px;
  height: 20px;
  opacity: 0.7;
  background-color: white;
  padding: 2px;
  border-radius: 4px;
  margin-right: 4px;
  :hover {
    opacity: 1;
  }
`

export default function MovableContainer(props: Props) {
  const { id, type, accept, children, onMove } = props
  const {
    setDraggingItemId,
    openedPage,
    setOpenedPage,
    editingComponent,
    setEditingComponent,
  } = useContext(BuilderContext)
  const [showOverlay, setShowOverlay] = useState<boolean>(false)
  const ref = useRef(null)
  const [{ isDragging }, connectDrag] = useDrag({
    item: { id, type },
    collect: (monitor: any) => {
      const result = {
        isDragging: monitor.isDragging(),
      }
      return result
    },
  })

  const [, connectDrop] = useDrop({
    accept,
    hover({ id: draggedId }: { id: string; type: string }) {
      if (draggedId !== id) {
        onMove(draggedId, id)
      }
    },
  })
  connectDrag(ref)
  connectDrop(ref)
  const opacity = isDragging ? 0 : 1
  useEffect(() => {
    if (isDragging) {
      setDraggingItemId(id)
    } else {
      setDraggingItemId(undefined)
    }
  }, [isDragging])
  const onEdit = () => {
    const component = openedPage.components.find(c => c.id === id)
    if (!component || editingComponent?.id === id) {
      return
    }
    setEditingComponent(component)
  }
  const onRemove = () => {
    const index = openedPage.components.map(c => c.id).indexOf(id)
    if (index === -1) {
      return
    }
    setOpenedPage(update(openedPage, {
      components: {
        $splice: [
          [index, 1]
        ]
      }
    }))
  }
  const element = (
    <div ref={ref} style={{ margin: isDragging ? 20 : 0, position: 'relative' }}>
      <div
        style={{
          opacity,
          width: '100%',
          position: 'relative',
          backgroundColor: isDragging ? 'grey' : 'transparent'
        }}
      >
        {
          showOverlay
            ? (
              <Overlay>
                {
                  editingComponent?.id !== id
                    ? (
                      <Icon
                        onClick={onEdit}
                      >
                        <img src={`${process.env.PUBLIC_URL}/icons/edit.svg`} style={{ width: 20, height: 20 }} />
                      </Icon>
                    )
                    : null
                }
                <Icon
                  onClick={onRemove}
                >
                  <img src={`${process.env.PUBLIC_URL}/icons/delete.svg`} style={{ width: 20, height: 20 }} />
                </Icon>
              </Overlay>
            )
            : null
        }
        {children}
      </div>
    </div>
  )
  const [hoverable, hovered] = useHover(element);
  useEffect(() => {
    setShowOverlay(hovered)
  }, [hovered])
  return (
    <Container
      editing={editingComponent?.id === id}
      isDragging={isDragging}
      style={{
        ...COMPONENTS_WITH_LIST_ITEMS.includes(type)
          ? {
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: 'auto',
          } : {},
      }}
    >
      {hoverable}
    </Container>
  )
}