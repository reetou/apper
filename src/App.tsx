import React, { useEffect, useState } from 'react';
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
import PrivateRoute from "./components/router/PrivateRoute";
import AuthContext from './store/AuthContext';
import { checkAuth } from "./api/Auth";
import NewProject from "./pages/NewProject";

require('react-web-vector-icons/fonts');

if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize('UA-164205978-3');
}


function App() {
  const [authenticated, setAuthenticated] = useState<boolean>(false)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    const checkAuthenticated = async () => {
      try {
        const res = await checkAuth()
        console.log(`Res`, res)
        setAuthenticated(true)
        setUser(res.user)
      } catch (e) {
        console.error(`Cannot check auth`)
      }
      setLoading(false)
    }
    checkAuthenticated()
  }, [])
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        authenticated,
        setAuthenticated,
      }}
    >
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter>
          {
            loading
              ? (
                <div style={{ textAlign: 'center' }}>Loading...</div>
              )
              : (
                <Switch>
                  <Route exact path="/" component={Main} />
                  <Route path="/register" component={Register} />
                  <Route path="/login" component={Login} />
                  <Route path="/password/reset" component={ResetPassword} />
                  <Route path="/demo" component={Builder} />
                  <PrivateRoute path="/projects/new" exact component={NewProject} />
                  <PrivateRoute path="/projects" exact component={Projects} />
                  <PrivateRoute path="/projects/:id/preview" component={Builder} />
                  <PrivateRoute path="/projects/:id/build" component={ProjectBuild} />
                  <Route path="/404" component={NotFound} />
                  <Redirect from="*" to="/404" />
                </Switch>
              )
          }
        </BrowserRouter>
      </DndProvider>
    </AuthContext.Provider>
  );
}

export default App;
