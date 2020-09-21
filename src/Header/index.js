import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button'

export default function() {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#">JuxtBoard</Navbar.Brand>
            <Nav className="ml-auto">
                <Button variant="primary">Login</Button>
            </Nav>
        </Navbar>
    )
}