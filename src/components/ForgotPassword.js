import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuthentication } from "../contexts/AuthContext"
import { Link } from "react-router-dom"
import "../styles/ForgotPassword.css"

export default function ForgotPassword() {
  const emailRef = useRef()
  const { resetPassword } = useAuthentication()
  const [error, setError] = useState("")
  const [reason, setReason] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setReason("")
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setReason("Check your mail to reset your password")
    } catch(err) {
      console.log(err)
      setError(err.message);
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
          <h2 className="text-center mb-4">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {reason && <Alert variant="info">{reason}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} placeholder="Enter your email" required />
            </Form.Group>
            <Button variant="outline-primary" disabled={loading} className="w-100" type="submit">
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Login with new password</Link>
          </div>
        </Card.Body>
      </Card>
      </div>
      </Container>
    </>
  )
}
