import React from "react"
import Signup from "./Signup"
import { Container } from "react-bootstrap"
import { AuthenticationProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Derivative from "./Derivative"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import Integral from "./Integral"
import "../styles/App.css"

function App() {
  return (
    // <Container
    //   className="d-flex align-items-center justify-content-center containerMinHeight"
    // >
    //   <div className="w-100 containerDivMaxWidth">
        <Router>
          <AuthenticationProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Derivative} />
              <PrivateRoute exact path="/integral" component={Integral} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthenticationProvider>
        </Router>
    //   </div>
    // </Container>
  )
}

export default App
