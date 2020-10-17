import React, { useContext } from 'react'
import BuilderContext, { createNewPage, CustomPage } from "../../store/BuilderContext";
import styled from 'styled-components';
import update from "immutability-helper";
import Styleguide from "../../Styleguide";

const Item = styled.div<{ navbar: boolean, tabbar: boolean }>`
  height: ${({ tabbar, navbar }) => 180 - (tabbar ? 0 : 30) - (navbar ? 0 : 30)}px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${Styleguide.primaryColor};
  color: ${Styleguide.infoColor};
  font-weight: bold;
  border-top-right-radius: ${({ navbar }) => navbar ? '16px' : '0'};
  border-top-left-radius: ${({ navbar }) => navbar ? '16px' : '0'};
  border-bottom-left-radius: ${({ tabbar }) => tabbar ? '16px' : '0'};
  border-bottom-right-radius: ${({ tabbar }) => tabbar ? '16px' : '0'};
`

const Container = styled.div`
  margin: 0 12px;
  width: 120px;
  padding: 34px 4px 4px 4px;
  border-radius: 24px;
  cursor: pointer;
  border: 4px solid transparent;
`

export default function AddPageItem() {
  const { setPages, pages } = useContext(BuilderContext)
  return (
    <Container
      onClick={() => {
        setPages(update(pages, {
          $push: [createNewPage(pages.length)]
        }))
      }}
    >
      <div>
        <Item tabbar navbar>
          <div>Add</div>
        </Item>
      </div>
    </Container>
  )
}