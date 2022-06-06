import React from 'react'
import { Navbar, Nav, Container } from "react-bootstrap"

const Header = () => {
    return (
        <header>
            {/* from react-bootstrap */}
            <Navbar bg="success" variant="dark" expand="lg" collapseOnSelect>
                <Container> {/*The container helps to make the navbar a bit more centered */}
                    <Navbar.Brand >Get Jokes</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto"> {/*margin-left: auto - push the links to the right*/}
                            <Nav.Link><i></i> Home</Nav.Link>
                            <Nav.Link><i></i> About</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header