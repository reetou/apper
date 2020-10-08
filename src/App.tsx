import React, { useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom'
import BuilderContext, { BuilderMode, CustomComponent, CustomPage } from './store/BuilderContext';
import Builder from "./pages/Builder";

const DEFAULT_PAGES: CustomPage[] = [
  {
    components: [],
    name: 'Default page',
    margin: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
    backgroundColor: '#FFFFFF',
    pageType: 'screen',
  }
]

function App() {
  const [mode, setMode] = useState<BuilderMode>('simulator')
  const [selectedElement, setSelectedElement] = useState<any>()
  const [pages, setPages] = useState<CustomPage[]>(DEFAULT_PAGES)
  const [openedPage, setOpenedPage] = useState<CustomPage | null>(null)
  useEffect(() => {
    if (!openedPage) {
      setOpenedPage(pages[0])
    }
  }, [pages])
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
        setOpenedPage
      }}
    >
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Builder} />
        </Switch>
      </BrowserRouter>
    </BuilderContext.Provider>
  );
}

export default App;
