import React from 'react'
import { Container, Card, Row, Col, FormGroup, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import loginRegisterActions from '../actions/loginRegisterActions'
import Google from '../Google.png'


function LogIn() {

    const showPassword = useSelector(state => state.loginRegister.showPassword)
    const dispatch = useDispatch()

    return (
        <Container className="fade-in mt-5">
            <Row>
                <Col className="sm-8">
                    <Card className="loginForm">
                        <div className="card-body">
                            <form to="/Login" method="POST">
                                <FormGroup>
                                    <h1 className="login-title">Log In</h1>
                                    <label htmlFor="email" className="loginEmail">Email:</label>
                                    <input type="email" className="form-control" name="email" required={true} placeholder="Email" />
                                </FormGroup>
                                <FormGroup>
                                    <label htmlFor="password" className="loginPassword">Password:</label>
                                    <input type={showPassword ? "text" : "password"} className="form-control" name="password" required={true} placeholder="Password" />
                                    <input type="checkbox" className="showPassword" value={showPassword} checked={showPassword} onChange={() => dispatch(loginRegisterActions("showPassword"))} name="showPassword" />
                                    <label htmlFor="showPassword" className="showPassword" onClick={() => dispatch(loginRegisterActions("showPassword"))}>Show Password</label>
                                </FormGroup>
                                <Button type="submit" className="loginButton">Log In</Button>
                            </form>
                            <p className="sign-in-up-redirect">Don't have an account? <Link to="/Register">Sign Up</Link></p>
                        </div>
                    </Card>
                </Col>

                <div className="col-sm-4">
                    <Card className="googleLogin">
                        <div className="card-body">
                            <a className="btn btn-block btn-social btn-google" href="/auth/google" role="button">
                                <img className="googleImage" src={Google} alt="google" />
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
        </Container >
    )
}

export default LogIn