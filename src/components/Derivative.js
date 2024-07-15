import React, { useState } from "react"
import { Card, Button, Alert, Container, Form } from "react-bootstrap"
import { useAuthentication } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import Navigation from "./Navigation"
import '../styles/Derivative.css'

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
      <div
      className="d-flex justify-content-center container-bg w-100"
    >
      <div className="w-100 d-flex flex-row align-items-start">
        <div className="d-flex flex-column card-flex-aside card-margin">
        <h2 className="text-center mb-4">Profile</h2>

        <Card style={{marginBottom: '20px'}}>
        <Card.Body>
          <strong>Email:</strong> {user.email}
          <Link to="/update-profile" className="btn w-100 mt-3" style={{backgroundColor: '#99F49E', border: '#99F49E'}}>
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <h2 className="text-center mb-4">History</h2>
        <Card className="">
          <Card.Body>
            No history available
          </Card.Body>
        </Card>
        </div>
        <div className="d-flex flex-column card-flex-middle card-margin">
        <Card style={{marginBottom: '20px'}}>
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
            <Button className="btn mt-3 w-100" type="submit" style={{backgroundColor: '#99F49E', border: '#99F49E', color: 'black'}}>
              Derive
            </Button>
            <Form.Group className="mb-3">
              <Form.Label>Derivative of the polynomial is:</Form.Label>
              <Form.Label>2x + 3</Form.Label>

            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
      <h2 className="text-center mb-4">Step-by-step guide</h2>
      <Card className="card-margin">
        <Card.Body>
        <p>Consider a polynomial <i>P(x)</i>. To find its derivative <i>P'(x)</i>:</p>
<ul>
  <li>Apply the power rule to each term: <i>d/dx [x<sup>n</sup>] = n x<sup>n-1</sup></i></li>
  <li>For the first term, <i>ax<sup>n</sup></i>: derivative is <i>nax<sup>n-1</sup></i></li>
  <li>For the second term, <i>bx<sup>m</sup></i>: derivative is <i>mbx<sup>m-1</sup></i></li>
  <li>For the third term, <i>c &middot; x<sup>p</sup></i>: derivative is <i>pcx<sup>p-1</sup></i></li>
  <li>The fourth term is a constant: derivative is 0</li>
  <li>Combine these derived terms to get the derivative <i>P'(x)</i></li>
</ul>


        </Card.Body>
      </Card>
      </div>
      <div className="d-flex flex-column card-flex-aside card-margin">
      <h2 className="text-center mb-4">Examples</h2>
        <Card style={{marginBottom: '20px'}}>
          <Card.Body>
            <p><strong>Example 1:</strong> Find the derivative of the polynomial <i>3x<sup>2</sup> + 2x + 1</i>.</p>
            <p><strong>Ans:</strong><i> 6x + 2</i></p>

          </Card.Body>
        </Card>
        <Card style={{marginBottom: '20px'}}>
          <Card.Body>
            <p><strong>Example 2:</strong> Find the derivative of the polynomial <i>5x<sup>3</sup> + 4x<sup>2</sup> + 3x + 2</i>.</p>
            <p><strong>Ans:</strong><i> 15x<sup>2</sup> + 8x + 3</i></p>
          </Card.Body>
        </Card>
        <Card style={{marginBottom: '20px'}}>
          <Card.Body>
            <p><strong>Example 3:</strong> Find the derivative of the polynomial <i>2x<sup>4</sup> + 3x<sup>3</sup> + 4x<sup>2</sup> + 5x + 6</i>.</p>
            <p><strong>Ans:</strong><i> 8x<sup>3</sup> + 9x<sup>2</sup> + 8x + 5</i></p>
          </Card.Body>
        </Card>
      </div>
      </div>
      </div>
      
        
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
