import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuthentication } from "../contexts/AuthContext"

export default function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useAuthentication()

  return (
    <Route
      {...rest}
      render={props => {
        return user ? <Component {...props} /> : <Redirect to="/login" />
      }}
    ></Route>
  )
}
