import React from 'react'
import { Navbar, Nav, Container } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

const Header = () => {
    return (
        <header>
            {/* from react-bootstrap */}
            <Navbar bg="success" variant="dark" expand="lg" className="py-2" collapseOnSelect>
                <Container> {/*The container helps to make the navbar a bit more centered */}
                    <LinkContainer to="/">
                        <Navbar.Brand >Get Jokes</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto"> {/*margin-left: auto - push the links to the right*/}
                            <LinkContainer to="/">
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/About">
                                <Nav.Link>About</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header