import React, { useState } from "react"
import { Card, Button, Alert, Container, Form } from "react-bootstrap"
import { useAuthentication } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import Navigation from "./Navigation"

export default function Derivative() {
  const [calculate, setCalculate] = useState(false)
  const [error, setError] = useState("")
  const { user, logout } = useAuthentication()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  const handleCalculate = () => {
    setCalculate(true)
  }

  return (
    <>
      <Navigation />
      <Container
      className="d-flex align-items-center justify-content-center containerMinHeight"
    >
      <div className="w-100 d-flex flex-row">
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">History</h2>
          </Card.Body>
        </Card>
      <Card>
        <Card.Body>
          <Form onSubmit={handleCalculate}>
            <Form.Group className="mb-3">
              <Form.Label>Enter Variable</Form.Label>
              <Form.Control type="text" placeholder="Enter your variable" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Enter Polynomial</Form.Label>
              <Form.Control type="text" placeholder="Enter your polynomial" required />
            </Form.Group>
            <Button variant="primary" className="w-50" type="submit">
              Calculate derivative
            </Button>
            <Form.Group className="mb-3">
              <Form.Label>Derivative of the polynomial is:</Form.Label>
              <Form.Label>2x + 3</Form.Label>

            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          <strong>Email:</strong> {user.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      </div>
      </Container>
      
        
      {/* //     <h2 className="text-center mb-4">Profile</h2>
      //     {error && <Alert variant="danger">{error}</Alert>}
      //     <strong>Email:</strong> {user.email}
      //     <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
      //       Update Profile
      //     </Link>
        
      
      // <div className="w-100 text-center mt-2">
      //   <Button variant="link" onClick={handleLogout}>
      //     Log Out
      //   </Button>
      // </div> */}
    </>
  )
}
