import React, { useEffect, useRef } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import useAuthentication from '../../hooks/useAuthentication';


export default function () {
    const { authentication, initialize, logout } = useAuthentication();

    const didMountRef = useRef(false)

    useEffect(() => {
        if (didMountRef.current) {
            console.log('AUTHENTICATION ERROR:', authentication.error);
            if (authentication.error) {
                if (authentication.error.name === 'NotAuthenticated') {
                    alert('You are not authenticated. Please login to use the application.');
                } else if (authentication.error.message) {
                    alert(authentication.error.message);
                } else {
                    alert('Something wrong has happened with your authentication. Please try to authenticate again.');
                }
            }
        } else {
            didMountRef.current = true;
            initialize();
        }
    }, [authentication, initialize]);

    const handleLogout = () => { logout(); }

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#">JuxtBoard</Navbar.Brand>
            <Nav className="ml-auto">
                {authentication.idToken && authentication.idToken.email ?
                    <Nav.Link onClick={handleLogout}>Logout: {authentication.idToken.email}</Nav.Link> :
                    <Nav.Link href={authentication.loginUrl}>Login</Nav.Link>}
            </Nav>
        </Navbar>
    )
}