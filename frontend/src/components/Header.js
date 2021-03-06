import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Switch from 'react-switch'
import { Navbar, Nav, Container } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import themeAction from '../actions/themeAction'

const Header = () => {

    const theme = useSelector(state => state.theme)
    const dispatch = useDispatch()

    const userData = useSelector(state => state.userData)

    useEffect(() => {
        theme !== undefined && localStorage.setItem('theme', JSON.stringify(theme))
    }, [theme])

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
                            <LinkContainer to="/about" activeClassName='active-link'>
                                <Nav.Link>About</Nav.Link>
                            </LinkContainer>
                            {userData._id ?
                                <>
                                    <LinkContainer to="/loggedUser" className="user-navlink" activeClassName='active-link'>
                                        <Nav.Link><i className="fa-solid fa-user"></i> {userData.firstName}</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/logout" activeClassName='active-link'>
                                        <Nav.Link><i className="fa-solid fa-right-from-bracket"></i> Logout</Nav.Link>
                                    </LinkContainer>
                                </>
                                :
                                <>
                                    <LinkContainer to="/login" className="login-navlink" activeClassName='active-link'>
                                        <Nav.Link><i className="fa-solid fa-right-to-bracket"></i> Login</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/register" className="register-navlink" activeClassName='active-link'>
                                        <Nav.Link><i className="fa-solid fa-user-plus"></i> Register</Nav.Link>
                                    </LinkContainer>
                                </>
                            }
                            <div className="themeSwitch">
                                <Switch height={24} onChange={() => dispatch(themeAction())} checked={theme === "dark"} onColor={"#222"} offColor={"#ddd"} />
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