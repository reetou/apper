import React, { ReactNode, useContext, useEffect, useRef, useState } from 'react'
import { CUSTOM_COMPONENT_TYPES } from "./mobile_components";
import { useDrag, useDrop } from "react-dnd";
import BuilderContext, { DEFAULT_EDIT_COMPONENT_FORM } from "../store/BuilderContext";
import { useHover } from "react-use";
import styled from 'styled-components';

interface Props {
  id: string,
  type: string,
  accept: string[],
  children: ReactNode,
  onMove: (id1: string, id2: string) => void;
}

const Container = styled.div<{editing: boolean}>`
  position: relative;
  border: ${props => props.editing ? '2px solid red' : 'none'};
`

const Overlay = styled.div`
  position: absolute;
  right: 3px;
  top: 3px;
  z-index: 10;
  cursor: pointer;
`

const Icon = styled.div`
  width: 20px;
  height: 20px;
  opacity: 0.7;
  :hover {
    opacity: 1;
  }
`

export default function MovableContainer(props: Props) {
  const { id, type, accept, children, onMove } = props
  const { setDraggingItemId, openedPage, editingComponent, setEditingComponent, setEditComponentForm } = useContext(BuilderContext)
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
    console.log(`Edit`)
    const component = openedPage.components.find(c => c.id === id)
    if (!component) {
      return
    }
    setEditComponentForm(DEFAULT_EDIT_COMPONENT_FORM)
    setEditingComponent(component)
  }
  const element = (
    <div ref={ref} style={{ opacity, width: '100%', position: 'relative' }}>
      {
        showOverlay
          ? (
            <Overlay>
              <Icon
                onClick={onEdit}
              >
                <img src={`${process.env.PUBLIC_URL}/icons/edit.svg`} style={{ width: 20, height: 20 }} />
              </Icon>
            </Overlay>
          )
          : null
      }
      {children}
    </div>
  )
  const [hoverable, hovered] = useHover(element);
  useEffect(() => {
    setShowOverlay(hovered)
  }, [hovered])
  return (
    <Container editing={editingComponent?.id === id}>
      {hoverable}
    </Container>
  )
}