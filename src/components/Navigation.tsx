import React, { useContext, useState } from 'react'
import styled from "styled-components";
import BuilderContext, { createNewPage } from "../store/BuilderContext";
import PageItem from "./navigation/PageItem";
import AddPageItem from "./navigation/AddPageItem";

const Container = styled.div`
  padding: 6px;
  max-width: 620px;
  min-width: 375px;
  display: flex;
  flex-wrap: wrap;
`

export default function Navigation() {
  const { pages, tabbarEnabled, openedPage } = useContext(BuilderContext)
  return (
    <Container>
      {
        pages.map(p => (
          <PageItem
            key={p.id}
            page={p}
            selected={openedPage.id === p.id}
            tabbarEnabled={tabbarEnabled}
          />
        )).concat(pages.length < 14 ? [<AddPageItem />] : [])
      }
    </Container>
  )
}