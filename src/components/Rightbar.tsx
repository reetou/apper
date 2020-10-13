import React, { useContext } from 'react'
import BarContainer from "./BarContainer";
import BuilderContext, { CustomComponent, CustomPage, PageType } from "../store/BuilderContext";
import PageGeneralSettings from './PageGeneralSettings';
import PageNavigationSettings from "./PageNavigationSettings";

export default function Rightbar() {
  const {
    openedPage,
    setOpenedPage,
    mode,
  } = useContext(BuilderContext)
  const editPage = (page: CustomPage) => {
    setOpenedPage((prevPage: CustomPage | null) => ({
      ...prevPage,
      ...page,
    }))
  }
  if (!openedPage) {
    return null
  }
  return (
    <BarContainer>
      {
        mode === 'simulator'
          ? (
            <PageGeneralSettings editPage={editPage} />
          )
          : null
      }
      {
        mode === 'navigation'
          ? (
            <PageNavigationSettings editPage={editPage} />
          )
          : null
      }
    </BarContainer>
  )
}