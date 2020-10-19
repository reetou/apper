import React, { useContext, useEffect, useState } from 'react'
import Leftbar from "../components/Leftbar";
import Rightbar from "../components/Rightbar";
import styled from 'styled-components'
import Simulator from "../components/Simulator";
import BuilderContext, {
  BuilderMode,
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
import { getProject } from "../api/Project";

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
  useEffect(() => {
    if (!routeParams.id) {
      setLoading(false)
      return
    }
    const loadProject = async () => {
      try {
        const res = await getProject(routeParams.id)
        console.log(`Loaded project`, res)
        setLoading(false)
      } catch (e) {
        console.error('Cannot load project', routeParams)
        history.replace('/404')
      }
    }
    console.log(`Gonna get project and show builder for it`)
    loadProject()
  }, [routeParams])
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
              mode === 'edit_tabbar' ? <EditTabbar /> : null
            }
            {
              mode === 'edit_onboarding' ? <Simulator /> : null
            }
          </div>
          <div
            style={{ marginTop: 12 }}
          >
            <Button onClick={() => {
              navigator.clipboard.writeText(JSON.stringify({}, null, 2))
            }}>
              Выгрузить
            </Button>
          </div>
        </div>
        <Rightbar/>
      </Container>
    </BuilderContext.Provider>
  )
}