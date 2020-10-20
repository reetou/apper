import React, { useContext } from 'react'
import BarContainer from "./BarContainer";
import BuilderContext, { CustomComponent, CustomPage, PageType } from "../store/BuilderContext";
import PageGeneralSettings from './PageGeneralSettings';
import PageNavigationSettings from "./PageNavigationSettings";
import EditTabbarSettings from "./forms/EditTabbarSettings";
import EditCustomOnboarding from "./forms/EditCustomOnboarding";
import Button from "./Button";
import { updateProject } from "../api/Project";
import { useParams } from "react-router-dom";

export default function Rightbar() {
  const routeParams = useParams<{ id: string }>()
  const isFromParams = routeParams.id
  const {
    openedPage,
    setOpenedPage,
    mode,
    project,
    setProject,
  } = useContext(BuilderContext)
  const editPage = (page: CustomPage) => {
    setOpenedPage((prevPage: CustomPage | null) => ({
      ...prevPage,
      ...page,
    }))
  }
  const saveProject = async () => {
    try {
      const data = await updateProject(project)
      setProject(data.project)
    } catch (e) {
      console.error(`Cannot save`, e)
    }
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
      {
        mode === 'edit_tabbar'
          ? (
            <EditTabbarSettings />
          )
          : null
      }
      {
        mode === 'edit_onboarding'
          ? (
            <EditCustomOnboarding />
          )
          : null
      }
      {
        isFromParams
          ? (
            <div
              style={{ marginTop: 24 }}
            >
              <Button
                onClick={saveProject}
              >
                Сохранить изменения в проекте
              </Button>
            </div>
          )
          : null
      }
    </BarContainer>
  )
}