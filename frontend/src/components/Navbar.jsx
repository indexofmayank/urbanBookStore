import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useSelector} from "react-redux";

const MyNavbar = () => {
    const user = useSelector((state) => (state.users.user));

    
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Urban Books Shop</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/registration">Register</Nav.Link>
                        <Nav.Link href='/addBook'>Add Book</Nav.Link>
                        <Nav.Link href='/me'>{(!user) ? "No user" : user}</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default MyNavbar