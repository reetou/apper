import React, { useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom'
import BuilderContext, {
  BuilderMode,
  CustomComponent, CustomComponentData, CustomComponentProps,
  CustomPage,
  DEFAULT_PAGE,
  ICustomListViewItem
} from './store/BuilderContext';
import Builder from "./pages/Builder";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from 'immutability-helper'
import 'rc-slider/assets/index.css';
import { COMPONENTS_WITH_LIST_ITEMS } from "./components/mobile_components";

function App() {
  const [mode, setMode] = useState<BuilderMode>('simulator')
  const [selectedElement, setSelectedElement] = useState<any>()
  const [pages, setPages] = useState<CustomPage[]>([DEFAULT_PAGE])
  const [openedPage, setOpenedPage] = useState<CustomPage>(DEFAULT_PAGE)
  const [draggingItemId, setDraggingItemId] = useState()
  const [editingComponent, setEditingComponent] = useState()
  const [editingListViewId, setEditingListViewId] = useState()
  const [editingListViewItems, setEditingListViewItems] = useState<ICustomListViewItem[]>([])
  useEffect(() => {
    if (!editingListViewId) {
      setEditingListViewItems([])
    } else {
      setEditingListViewItems(editingComponent?.data?.childComponents || [])
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
  return (
    <BuilderContext.Provider
      value={{
        mode,
        setMode,
        selectedElement,
        setSelectedElement,
        pages,
        setPages,
        openedPage,
        setOpenedPage,
        onAddComponent,
        updateComponent,
        draggingItemId,
        setDraggingItemId,
        editingComponent,
        setEditingComponent,
        editingListViewId,
        setEditingListViewId,
        editingListViewItems,
        setEditingListViewItems,
        toggleEditingListViewItems,
      }}
    >
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Builder} />
          </Switch>
        </BrowserRouter>
      </DndProvider>
    </BuilderContext.Provider>
  );
}

export default App;
