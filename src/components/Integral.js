import React, { useState } from "react"
import { Card, Button, Alert, Container } from "react-bootstrap"
import { useAuthentication } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import Navigation from "./Navigation"

export default function Integral() {
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

  return (
    <>
      <Navigation />
      <Container>
        
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {user.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        
      </Container>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  )
}