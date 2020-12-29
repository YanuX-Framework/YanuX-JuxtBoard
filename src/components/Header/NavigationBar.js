import React, { useEffect, useRef } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import useAuthentication from '../../hooks/useAuthentication';

export default function NavigationBar(props) {
    const { authentication, initialize, logout } = useAuthentication();

    const didMountRef = useRef(false);

    useEffect(() => {
        if (didMountRef.current) {
            if (authentication.error) {
                if (authentication.error.name === 'NotAuthenticated') {
                    alert('You are not authenticated. Please login to use the application.');
                } else if (authentication.error.message) {
                    alert(authentication.error.message);
                } else {
                    alert('Something wrong has happened with your authentication. Please try to authenticate again.');
                }
            }
        } else { didMountRef.current = true; initialize(); }
    });

    const handleLogout = () => { logout(); }

    return (
        <Navbar id="mainNav" collapseOnSelect expand="lg" className="navbar navbar-dark navbar-expand-lg sticky-top bg-dark">
            <Container>
            <Navbar.Brand className="navbar-brand" href="#page-top">JuxtBoard</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="nav navbar-nav ml-auto">
                    <Nav.Item className="nav-item">
                    {authentication.idToken && authentication.idToken.email ?
                        <Nav.Link className="nav-link js-scroll-trigger" href="#portfolio">NOTES</Nav.Link> :
                        null}
                    </Nav.Item>
                    <Nav.Item className="nav-item">
                    {authentication.idToken && authentication.idToken.email ?
                        <Nav.Link className="nav-link js-scroll-trigger" href="#distribution">DEVICES</Nav.Link> :
                        null}
                    </Nav.Item>
                    <Nav.Item className="nav-item">
                    {authentication.idToken && authentication.idToken.email ?
                        <Nav.Link className="nav-link" onClick={handleLogout}>LOGOUT</Nav.Link> :
                        <Nav.Link className="nav-link" href={authentication.loginUrl}>LOGIN</Nav.Link>}
                        </Nav.Item>                    
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}