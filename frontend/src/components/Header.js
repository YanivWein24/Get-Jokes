import React, { useEffect } from 'react'
import Switch from 'react-switch'
import { Navbar, Nav, Container } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

const Header = ({ theme, toggleTheme, data }) => {

    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(theme))
    })

    return (
        <header>
            {/* from react-bootstrap */}
            <Navbar variant="dark" expand="lg" className="py-2 navbar" collapseOnSelect>
                <Container> {/*The container helps to make the navbar a bit more centered */}
                    <LinkContainer to="/">
                        <Navbar.Brand >Get Jokes</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-button" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto"> {/*margin-left: auto - push the links to the right*/}
                            <LinkContainer to="/" activeClassName='active-link'>
                                {/* add the className only when the link is active*/}
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/About" activeClassName='active-link'>
                                <Nav.Link>About</Nav.Link>
                            </LinkContainer>
                            {!data.email &&
                                <LinkContainer to="/Login" activeClassName='active-link'>
                                    <Nav.Link><i class="fa-solid fa-right-to-bracket"></i> Login</Nav.Link>
                                </LinkContainer>}
                            {!data.email &&
                                <LinkContainer to="/Register" activeClassName='active-link'>
                                    <Nav.Link><i class="fa-solid fa-user-plus"></i> Register</Nav.Link>
                                </LinkContainer>}
                            {data.email && <LinkContainer to="/User" activeClassName='active-link'>
                                <Nav.Link>{data.firstName}</Nav.Link>
                            </LinkContainer>}
                            {data.email && <LinkContainer to="/Logout" activeClassName='active-link'>
                                <Nav.Link>Logout</Nav.Link>
                            </LinkContainer>}
                            <div className="themeSwitch">
                                <Switch height={24} onChange={toggleTheme} checked={theme === "dark"} onColor={"#222"} offColor={"#ddd"} />
                                <p>{theme === "light" ? "Light Mode" : "Dark Mode"}</p>
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header