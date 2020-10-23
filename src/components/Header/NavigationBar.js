import React, { useEffect, useRef } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import useAuthentication from '../../hooks/useAuthentication';


export default function (props) {
    const { authentication, initialize, logout } = useAuthentication();

    const didMountRef = useRef(false);

    const customToggle = () => {

            return (
                <button data-toggle="collapse" data-target="#navbarResponsive" class="navbar-toggler navbar-toggler-right" type="button" data-toogle="collapse" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    AQUIAQUI
                    {console.log('ESTAMOS NESSA VANESSA')}
                    <i class="fa fa-bars"></i>
                    </button>
            );
    }

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
        <Navbar id="mainNav" className="navbar navbar-dark navbar-expand-lg fixed-top bg-dark">
            <Container>
            <Navbar.Brand className="navbar-brand" href="#page-top">JuxtBoard</Navbar.Brand>
            <Navbar.Toggle className="navbar-toggler navbar-toggler-right" data-target="#navbarResponsive" data-toogle="collapse" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><i class="fa fa-bars"></i></Navbar.Toggle>
            <Navbar.Collapse id="navbarResponsive" className="collapse navbar-collapse show">
                <Nav className="nav navbar-nav ml-auto">
                    <Nav.Item className="nav-item">
                    {authentication.idToken && authentication.idToken.email ?
                        <Nav.Link className="nav-link js-scroll-trigger" href="#portfolio">NOTES</Nav.Link> :
                        null}
                    </Nav.Item>
                    <Nav.Item className="nav-item">
                    {authentication.idToken && authentication.idToken.email ?
                        <Nav.Link className="nav-link js-scroll-trigger" href="#collection2">DEVICES</Nav.Link> :
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