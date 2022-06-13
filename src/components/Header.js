import React, { useEffect } from 'react'
import Switch from 'react-switch'
import { Navbar, Nav, Container } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

const Header = (props) => {
    const { theme, toggleTheme } = props

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
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto"> {/*margin-left: auto - push the links to the right*/}
                            <LinkContainer to="/">
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/About">
                                <Nav.Link>About</Nav.Link>
                            </LinkContainer>
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