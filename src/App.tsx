import React, { useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom'
import Builder from "./pages/Builder";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import 'rc-slider/assets/index.css';
import Projects from "./pages/Projects";
import ProjectOverview from "./pages/ProjectOverview";
require('react-web-vector-icons/fonts');


function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <BrowserRouter>
        <Switch>
          <Route path="/builder" component={Builder} />
          <Route path="/projects" exact component={Projects} />
          <Route path="/projects/:id/builder" component={Builder} />
          <Route path="/projects/:id/overview" component={ProjectOverview} />
        </Switch>
      </BrowserRouter>
    </DndProvider>
  );
}

export default App;
