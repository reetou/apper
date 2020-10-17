import React, { ReactNode, useContext, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import BuilderContext, { CustomComponent } from "../store/BuilderContext";
import { DragSourceMonitor, useDrag } from "react-dnd";
import Styleguide from "../Styleguide";

const Container = styled.div<{isDragging: boolean}>`
  width: 95px;
  cursor: move;
  margin-right: 6px;
`

const Background = styled.div`
  background-color: ${Styleguide.componentItemContainerBgColor};
  height: 85px;
  width: 85px;
  padding: 5px;
  border-radius: 16px;
`

const ItemContainer = styled.div`
  background-color: ${Styleguide.componentItemBgColor};
  border-radius: 16px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

const Overlay = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
`

const Title = styled.div`
  font-size: 0.65rem;
  font-weight: bold;
  text-align: center;
  margin-top: 4px;
  width: 100%;
`

interface Props {
  children: ReactNode;
  data: CustomComponent,
}

export default function CustomComponentContainer(props: Props) {
  const { children, data } = props
  const [state, drag] = useDrag({
    item: { id: data.id, type: data.item_type },
    canDrag: true,
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  return (
    <Container
      isDragging={state.isDragging}
      ref={drag}
    >
      <Background>
        <ItemContainer>
          {children}
          <Overlay />
        </ItemContainer>
      </Background>
      <Title>{data.title}</Title>
    </Container>
  )
}