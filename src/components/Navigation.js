import React, { useState } from "react"
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import '../styles/Navigation.css'
import { NavLink, useHistory } from "react-router-dom"
import { useAuthentication } from "../contexts/AuthContext"


export default function Navigation() {
  const [hoveredLink, setHoveredLink] = useState('');
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
  }}

    return (
        <Navbar className="nav-margin-bottom nav-bg">
        <Container>
          <Navbar.Brand>
            <img src="assets/appIcon.png" alt="appIcon" width="150" height="30" />
          </Navbar.Brand>
          <Nav className="me-auto">
            <NavLink
            className="nav-link nav-font"
            to="/update-profile"
            activeStyle={{color: '#99F49E'}}
            onMouseEnter={() => setHoveredLink('updateProfile')}
            onMouseLeave={() => setHoveredLink('')}
            style={hoveredLink === 'updateProfile' ? {textDecoration: 'underline'} : {}}
            >
              {user.email}
            </NavLink>
            <NavLink to="/"
            exact
            className="nav-link nav-font"
            activeStyle={{color: '#99F49E'}}
            onMouseEnter={() => setHoveredLink('derivative')}
            onMouseLeave={() => setHoveredLink('')}
            style={hoveredLink === 'derivative' ? {textDecoration: 'underline'} : {}}
            >
              Derivative
            </NavLink>
            <NavLink
            to="/integral"
            className="nav-link nav-font"
            activeStyle={{color: '#99F49E'}}
            onMouseEnter={() => setHoveredLink('integral')}
            onMouseLeave={() => setHoveredLink('')}
            style={hoveredLink === 'integral' ? {textDecoration: 'underline'} : {}}
            >
              Integral
            </NavLink>
            <NavLink
            to="/login"
            className="nav-link nav-font"
            onClick={(e) => {
              e.preventDefault(); // Prevent default link behavior
              handleLogout(); // Call your logout function
            }}
            style={{color: 'red'}}
            >
              Log Out
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
    );
}