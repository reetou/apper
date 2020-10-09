import React, { useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom'
import BuilderContext, { BuilderMode, CustomComponent, CustomPage, DEFAULT_PAGE } from './store/BuilderContext';
import Builder from "./pages/Builder";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from 'immutability-helper'

function App() {
  const [mode, setMode] = useState<BuilderMode>('simulator')
  const [selectedElement, setSelectedElement] = useState<any>()
  const [pages, setPages] = useState<CustomPage[]>([DEFAULT_PAGE])
  const [openedPage, setOpenedPage] = useState<CustomPage>(DEFAULT_PAGE)
  const [draggingItemId, setDraggingItemId] = useState()
  const [editingComponent, setEditingComponent] = useState()
  const [editComponentForm, setEditComponentForm] = useState()
  const onAddComponent = (component: CustomComponent) => {
    console.log(`Pushing component`, component)
    setOpenedPage((prevPage) => {
      const newState = update(prevPage, {
        components: { $push: [component] },
      })
      return newState
    })
  }
  const updateComponent = (newProps?: object) => {
    if (!editingComponent) {
      return
    }
    setEditingComponent((prevComponent?: CustomComponent) => {
      if (!prevComponent) {
        return prevComponent
      }
      return update(prevComponent, {
        props: {
          $merge: newProps
        }
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
            data: {
              $merge: editComponentForm
            }
          }
        }
      })
    })
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
        editComponentForm,
        setEditComponentForm,
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
