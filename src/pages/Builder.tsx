import React, { useContext, useEffect, useState } from 'react'
import Leftbar from "../components/Leftbar";
import Rightbar from "../components/Rightbar";
import styled from 'styled-components'
import Simulator from "../components/Simulator";
import BuilderContext, {
  BuilderMode, createOnboarding,
  createProject, CustomComponent, CustomComponentData, CustomComponentProps,
  CustomPage, DEFAULT_PAGE, ICustomListViewItem, Project,
} from "../store/BuilderContext";
import BuilderModeToggle from "../components/BuilderModeToggle";
import Navigation from "../components/Navigation";
import EditTabbar from "../components/forms/EditTabbar";
import Button from '../components/Button';
import update from "immutability-helper";
import { useDebounce } from "react-use";
import { useParams, useHistory } from 'react-router-dom'
import { getProject, updateProject } from "../api/Project";
import GoogleAnalyticsTracker from "../components/GoogleAnalyticsTracker";
import { trackAnalyticsEvent } from "../utils/googleAnalyticsUtils";
import AuthContext from "../store/AuthContext";
import { createTabbar } from "../utils/tabbarUtils";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`

export default function Builder() {
  const history = useHistory()
  const routeParams = useParams<{ id: string }>()
  const [project, setProject] = useState<Project>(createProject())
  const [mode, setMode] = useState<BuilderMode>('simulator')
  const [selectedElement, setSelectedElement] = useState<any>()
  const [openedPage, setOpenedPage] = useState<CustomPage>(project.pages[0])
  const [editingComponent, setEditingComponent] = useState<CustomComponent>()
  const [editingListViewId, setEditingListViewId] = useState<string>()
  const [editingListViewItems, setEditingListViewItems] = useState<ICustomListViewItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const { authenticated } = useContext(AuthContext)
  useEffect(() => {
    if (!editingComponent) {
      return
    }
    if (!editingListViewId) {
      setEditingListViewItems([])
    } else {
      setEditingListViewItems(editingComponent.data?.childComponents || [])
    }
  }, [editingListViewId])
  const onAddComponent = (component: CustomComponent, setAsEditing = false) => {
    console.log(`Pushing component`, component)
    trackAnalyticsEvent({
      category: 'BuilderPushComponent',
      action: component.item_type,
    })
    setOpenedPage((prevPage) => {
      const newState = update(prevPage, {
        components: { $push: [component] },
      })
      return newState
    })
    if (setAsEditing) {
      setEditingComponent(component)
    }
  }
  const updateComponent = (newProps?: CustomComponentProps, newData?: CustomComponentData) => {
    if (!editingComponent) {
      return
    }
    setEditingComponent((prevComponent?: CustomComponent) => {
      if (!prevComponent) {
        return prevComponent
      }
      return update(prevComponent, {
        ...newProps ? {
          props: {
            $merge: newProps
          }
        } : {},
        ...newData ? {
          data: {
            $merge: newData
          }
        } : {},
      })
    })
    setOpenedPage(prevPage => {
      const index = prevPage.components.map(x => x.id).indexOf(editingComponent.id)
      return update(prevPage, {
        components: {
          [index]: {
            ...newProps ? {
              props: {
                $merge: newProps
              }
            } : {},
            ...newData ? {
              data: {
                $merge: newData
              }
            } : {},
          }
        }
      })
    })
  }
  const toggleEditingListViewItems = () => {
    if (editingListViewId) {
      setEditingListViewId(undefined)
    } else {
      setEditingListViewId(editingComponent?.id)
    }
  }
  const [, cancel] = useDebounce(
    () => {
      setProject(prevProject => {
        const index = prevProject.pages.map(x => x.id).indexOf(openedPage.id)
        return update(prevProject, {
          pages: {
            [index]: {
              $set: openedPage
            }
          }
        })
      })
    },
    200,
    [openedPage]
  );
  const [, cancelSave] = useDebounce(
    () => {
      if (authenticated) {
        return
      }
      console.log(`Authenticated`, authenticated)
      localStorage.setItem('demo_project', JSON.stringify(project))
      console.log(`Saved in browser`)
    },
    200,
    [project]
  );
  useEffect(() => {
    const loadDemoProject = () => {
      try {
        const data = localStorage.getItem('demo_project')
        if (!data) {
          return
        }
        const demoProject = JSON.parse(data)
        if (!demoProject) {
          return
        }
        const demoOpenedPage = demoProject.pages[0]
        setProject(demoProject)
        setOpenedPage(update(openedPage, {
          $set: demoOpenedPage
        }))
      } catch (e) {
        console.error(`Cannot load demo project`, e)
      }
    }
    if (!routeParams.id) {
      loadDemoProject()
      setLoading(false)
      return
    }
    const loadProject = async () => {
      try {
        const res = await getProject(routeParams.id)
        console.log(`Loaded project`, res)
        setProject(res.project)
        console.log(`Settings opened page`, res.project.pages[0])
        setOpenedPage(res.project.pages[0])
        console.log(`Changing loading`)
        setLoading(false)
      } catch (e) {
        console.error('Cannot load project', e)
        history.replace('/404')
      }
    }
    console.log(`Gonna get project and show builder for it`)
    loadProject()
  }, [routeParams])
  useEffect(() => {
    if (project.tabbar_settings && project.onboarding) {
      return
    }
    // Fill default values for onboarding and tabbar
    console.log(`Updating tabbar and project onboarding`)
    setProject(update(project, {
      onboarding: {
        $set: createOnboarding()
      },
      tabbar_settings: {
        $set: createTabbar()
      }
    }))
  }, [project])
  if (loading) {
    return null
  }
  return (
    <BuilderContext.Provider
      value={{
        mode,
        setMode,
        selectedElement,
        setSelectedElement,
        project,
        setProject,
        openedPage,
        setOpenedPage,
        onAddComponent,
        updateComponent,
        editingComponent,
        setEditingComponent,
        editingListViewId,
        setEditingListViewId,
        editingListViewItems,
        setEditingListViewItems,
        toggleEditingListViewItems,
      }}
    >
      <GoogleAnalyticsTracker />
      <Container>
        <Leftbar />
        <div
          style={{
            minWidth: '40%',
          }}
        >
          <div>
            <BuilderModeToggle />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {
              mode === 'simulator' ? <Simulator /> : null
            }
            {
              mode === 'navigation' ? <Navigation /> : null
            }
            {
              mode === 'edit_tabbar' && project.tabbar_settings ? <EditTabbar /> : null
            }
            {
              mode === 'edit_onboarding' && project.onboarding ? <Simulator /> : null
            }
          </div>
          {
            process.env.NODE_ENV !== 'production'
              ? (
                <div
                  style={{ marginTop: 12 }}
                >
                  <Button onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(project, null, 2))
                  }}>
                    Выгрузить
                  </Button>
                </div>
              )
              : null
          }
        </div>
        <Rightbar/>
      </Container>
    </BuilderContext.Provider>
  )
}