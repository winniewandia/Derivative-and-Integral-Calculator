import React from "react"
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import '../styles/Navigation.css'

export default function Navigation() {
    return (
        <Navbar className="nav-margin-bottom nav-bg">
        <Container>
          <Navbar.Brand href="#home">
            <img src="assets/appIcon.png" alt="appIcon" width="150" height="30" />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#derivative">Derivative</Nav.Link>
            <Nav.Link href="#integral">Integral</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
}