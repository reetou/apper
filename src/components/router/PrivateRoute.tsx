import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { checkAuth } from "../../api/Auth";
import AuthContext from "../../store/AuthContext";

export default function PrivateRoute({ children, ...rest }: any) {
  const { authenticated } = useContext(AuthContext)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}