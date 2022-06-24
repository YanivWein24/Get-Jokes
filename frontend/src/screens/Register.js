import React, { useState } from 'react'
import Google from '../Google.png'
import { Container, Card, Row, Col, FormGroup, Button } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"


function Register({ isLightTheme }) {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")


    return (
        <Container className="fade-in mt-3">
            <h1 className="register-title">Register</h1>
            <p className="register-message">Create a free account to store all your favorite jokes in a personal collection!</p>
            <Row>
                <Col className="sm-8">
                    <Card className="registerForm">
                        <div className="card-body">
                            {/* Makes POST request to /Register route */}
                            <form action="/Register" method="POST">
                                <h3>Welcome {firstName} {lastName}!</h3>
                                <FormGroup>
                                    <label htmlFor="fname" className="registerFname">First Name:</label>
                                    <input type="text" className="form-control" name="firstName" placeholder="First" required={true} onChange={(e) => setFirstName(e.target.value)} />
                                </FormGroup>
                                <FormGroup>
                                    <label htmlFor="lname" className="registerLname">Last Name:</label>
                                    <input type="text" className="form-control" name="lastName" placeholder="Last" required={true} onChange={(e) => setLastName(e.target.value)} />
                                </FormGroup>
                                <FormGroup>
                                    <label htmlFor="email" className="registerEmail">Email:</label>
                                    <input type="email" className="form-control" name="email" placeholder="Email" required={true} />
                                </FormGroup>
                                <FormGroup>
                                    <label htmlFor="password" className="registerPassword">Password:</label>
                                    <input type="password" className="form-control" name="password" placeholder="Password" required={true} />
                                </FormGroup>
                                <Button type="submit" className="registerButton" variant={isLightTheme ? "success" : "info"}>Register</Button>
                                <p className="sign-in-up-redirect">Already a member? <a href="/Login">Sign In</a></p>
                            </form>
                        </div>
                    </Card>
                </Col>

                <div className="col-sm-4">
                    <Card className="googleLogin">
                        <div className="card-body">
                            <a className="btn btn-block btn-social btn-google" href="/auth/google" role="button">
                                <img src={Google} style={{ height: "1.5rem", width: "1.5rem" }} />
                                Sign Up With Google
                            </a>
                        </div>
                    </Card>
                    <Card className="facebookLogin">
                        <div className="card-body">
                            <a className="btn btn-block btn-social btn-facebook" href="/auth/facebook" role="button">
                                <i className="fab fa-facebook"></i>
                                Sign Up With Facebook
                            </a>
                        </div>
                    </Card>
                </div>
            </Row>
        </Container >

    )
}

export default Register