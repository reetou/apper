import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import Builder from "./pages/Builder";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import 'rc-slider/assets/index.css';
import Projects from "./pages/Projects";
import ProjectBuild from "./pages/ProjectBuild";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./pages/Main";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import ReactGA from 'react-ga';

require('react-web-vector-icons/fonts');

if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize('UA-164205978-3');
}


function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/password/reset" component={ResetPassword} />
          <Route path="/demo" component={Builder} />
          <Route path="/projects" exact component={Projects} />
          <Route path="/projects/:id/preview" component={Builder} />
          <Route path="/projects/:id/build" component={ProjectBuild} />
          <Route path="/404" component={NotFound} />
          <Redirect from="*" to="/404" />
        </Switch>
      </BrowserRouter>
    </DndProvider>
  );
}

export default App;
