import React, { useContext } from 'react'
import BarContainer from "./BarContainer";
import BuilderContext, { CustomComponent, CustomPage, PageType } from "../store/BuilderContext";
import PageGeneralSettings from './PageGeneralSettings';
import PageNavigationSettings from "./PageNavigationSettings";
import EditTabbarSettings from "./forms/EditTabbarSettings";
import EditCustomOnboarding from "./forms/EditCustomOnboarding";
import Button from "./Button";
import { createProject, updateProject } from "../api/Project";
import AuthContext from "../store/AuthContext";
import { useHistory, useParams } from 'react-router-dom';
import update from 'immutability-helper'
import { trackAnalyticsEvent } from "../utils/googleAnalyticsUtils";

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
  const history = useHistory()
  const { authenticated } = useContext(AuthContext)
  const editPage = (page: CustomPage) => {
    setOpenedPage((prevPage: CustomPage | null) => ({
      ...prevPage,
      ...page,
    }))
  }
  const saveProject = async () => {
    try {
      if (!authenticated) {
        trackAnalyticsEvent({
          category: 'Builder',
          action: 'ToRegister',
        })
        history.push('/register')
        return
      }

      localStorage.removeItem('demo_project')
      if (isFromParams) {
        trackAnalyticsEvent({
          category: 'Builder',
          action: 'UpdateProject',
        })
        const data = await updateProject(project)
        setProject(data.project)
        setOpenedPage(update(openedPage, {
          $set: data.project.pages[0]
        }))
      } else {
        trackAnalyticsEvent({
          category: 'Builder',
          action: 'CreateProjectFromDemo',
        })
        const data = await createProject(project)
        setProject(data.project)
        setOpenedPage(update(openedPage, {
          $set: data.project.pages[0]
        }))
        history.push('/projects')
      }
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
        mode === 'edit_tabbar' && project.tabbar_settings
          ? (
            <EditTabbarSettings />
          )
          : null
      }
      {
        mode === 'edit_onboarding' && project.onboarding
          ? (
            <EditCustomOnboarding />
          )
          : null
      }
      <div
        style={{ marginTop: 24 }}
      >
        <Button
          onClick={saveProject}
        >
          Сохранить изменения в проекте
        </Button>
      </div>
    </BarContainer>
  )
}