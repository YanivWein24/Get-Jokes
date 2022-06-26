import React, { useState } from 'react'
import Google from '../Google.png'
import { Container, Card, Row, Col, FormGroup, Button } from "react-bootstrap"



function LogIn({ isLightTheme }) {

    const [passwordVisible, setPasswordVisible] = useState(false)

    return (
        <Container className="fade-in mt-5">
            <Row>
                <Col className="sm-8">
                    <Card className="loginForm">
                        <div className="card-body">
                            {/* Makes POST request to /LogIn route */}
                            <form action="/Login" method="POST">
                                <FormGroup>
                                    <h1 className="login-title">Log In</h1>
                                    <label htmlFor="email" className="loginEmail">Email:</label>
                                    <input type="email" className="form-control" name="email" required={true} placeholder="Email" />
                                </FormGroup>
                                <FormGroup>
                                    <label htmlFor="password" className="loginPassword">Password:</label>
                                    <input type={passwordVisible ? "text" : "password"} className="form-control" name="password" required={true} placeholder="Password" />
                                    <input type="checkbox" className="showPassword" value={passwordVisible} checked={passwordVisible} onChange={() => setPasswordVisible(!passwordVisible)} name="showPassword" />
                                    <label htmlFor="showPassword" className="showPassword" onClick={() => setPasswordVisible(!passwordVisible)}>Show Password</label>
                                    {/* <input type="checkbox" className="showPassword" >Show Password</input> */}
                                </FormGroup>
                                <Button type="submit" className="loginButton" variant={isLightTheme ? "success" : "info"}>Log In</Button>
                            </form>
                            <p className="sign-in-up-redirect">Don't have an account? <a href="/Register">Sign Up</a></p>
                        </div>
                    </Card>
                </Col>

                <div className="col-sm-4">
                    <Card className="googleLogin">
                        <div className="card-body">
                            <a className="btn btn-block btn-social btn-google" href="/auth/google" role="button">
                                <img src={Google} alt="google" style={{ height: "1.5rem", width: "1.5rem" }} />
                                Sign In With Google
                            </a>
                        </div>
                    </Card>
                    <Card className="facebookLogin">
                        <div className="card-body">
                            <a className="btn btn-block btn-social btn-facebook" href="/auth/facebook" role="button">
                                <i className="fab fa-facebook"></i>
                                Sign In With Facebook
                            </a>
                        </div>
                    </Card>
                </div>
            </Row>
        </Container>

    )
}

export default LogIn