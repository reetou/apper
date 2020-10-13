import React, { useContext } from 'react'
import BuilderContext, { CustomPage } from "../../store/BuilderContext";
import styled from 'styled-components';
import update from 'immutability-helper'
import { useDebounce } from "react-use";

interface Props {
  page: CustomPage;
  selected: boolean;
  tabbarEnabled: boolean;
  showPlus?: boolean;
}

const Item = styled.div<{ navbar: boolean, tabbar: boolean }>`
  height: ${({ tabbar, navbar }) => 180 - (tabbar ? 0 : 30) - (navbar ? 0 : 30)}px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #D6D6D6;
  border-top-right-radius: ${({ navbar }) => navbar ? '16px' : '0'};
  border-top-left-radius: ${({ navbar }) => navbar ? '16px' : '0'};
  border-bottom-left-radius: ${({ tabbar }) => tabbar ? '16px' : '0'};
  border-bottom-right-radius: ${({ tabbar }) => tabbar ? '16px' : '0'};
  cursor: pointer;
`

const Container = styled.div<{ selected: boolean }>`
  margin: 0 12px;
  width: 120px;
  padding: 4px;
  border-radius: 24px;
  border: ${({ selected }) => selected ? `4px solid #007AFF` : '4px solid transparent'};
  transition: 0.2s;
`

const TabbarContainer = styled.div`
  height: 30px;
  width: 100%;
  background-color: #D0B2B2;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  justify-content: space-between;
`

const TabbarItem = styled.div`
  height: 16px;
  width: 16px;
  background-color: #fafafa;
  border-radius: 16px;
`

const NavHeaderContainer = styled.div`
  height: 30px;
  font-size: 8px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 8px;
  background-color: #F8CCCC;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`

const Title = styled.div`
  color: black;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  text-align: center;
`

export default function PageItem(props: Props) {
  const {
    page,
    selected,
    tabbarEnabled,
    showPlus,
  } = props
  const { openedPage, setOpenedPage } = useContext(BuilderContext)
  return (
    <Container
      selected={selected}
      onClick={() => {
        if (selected) {
          return
        }
        setOpenedPage(update(openedPage, {
          $set: page
        }))
      }}
    >
      <Title>{page.name}</Title>
      <div>
        { page.nav_header_mode === 'show' ? <NavHeaderContainer>{page.nav_header_title}</NavHeaderContainer> : null }
        <Item
          tabbar={!tabbarEnabled}
          navbar={page.nav_header_mode !== 'show'}
        >
          {
            showPlus
              ? <div>Add</div>
              : null
          }
        </Item>
        {
          tabbarEnabled
            ? (
              <TabbarContainer>
                <TabbarItem />
                <TabbarItem />
                <TabbarItem />
              </TabbarContainer>
            )
            : null
        }
      </div>
    </Container>
  )
}