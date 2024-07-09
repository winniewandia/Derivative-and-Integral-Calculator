import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuthentication } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import "../styles/Login.css"

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuthentication()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch(err) {
      let errorMessage;
      try {
        const errorObj = JSON.parse(err.message);
        errorMessage = errorObj.error && errorObj.error.message ? errorObj.error.message : "An unexpected error occurred";
      } catch (parseError) {
        // If parsing fails, use the original error message or a default message
        errorMessage = err.message || "An unexpected error occurred";
      }
      setError(errorMessage);
    }

    setLoading(false)
  }

  return (
    <>
    <Container
      className="d-flex align-items-center justify-content-center containerMinHeight"
    >
      <div className="w-100 containerDivMaxWidth">
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} placeholder="Enter your email" required />
            </Form.Group>
            <Form.Group id="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} placeholder="Enter your password" required />
            </Form.Group>
            <Button variant="outline-primary" disabled={loading} className="w-100" type="submit">
              Login
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
      </div>
      </Container>
    </>
  )
}
