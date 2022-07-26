import React from 'react'
import { Container, Card, Row, Col, FormGroup, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import Google from '../Google.png'
import { useSelector, useDispatch } from 'react-redux'
import loginRegisterActions from '../actions/loginRegisterActions'

function Register() {

    const RegisterState = useSelector(state => state.loginRegister)
    const dispatch = useDispatch()

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
                                <h3>Welcome {RegisterState.firstName} {RegisterState.lastName}!</h3>
                                <FormGroup>
                                    <label htmlFor="firstName" className="registerFname">First Name:</label>
                                    <input type="text" className="form-control" name="firstName" placeholder="First" required={true} onChange={(event) => dispatch(loginRegisterActions("updateFirstName", event.target.value))} />
                                </FormGroup>
                                <FormGroup>
                                    <label htmlFor="lastName" className="registerLname">Last Name:</label>
                                    <input type="text" className="form-control" name="lastName" placeholder="Last" required={true} onChange={(event) => dispatch(loginRegisterActions("updateLastName", event.target.value))} />
                                </FormGroup>
                                <FormGroup>
                                    <label htmlFor="email" className="registerEmail">Email:</label>
                                    <input type="email" className="form-control" name="email" placeholder="Email" required={true} />
                                </FormGroup>
                                <FormGroup>
                                    <label htmlFor="password" className="registerPassword">Password:</label>
                                    <input type={RegisterState.showPassword ? "text" : "password"} className="form-control" name="password" placeholder="Password" required={true} />
                                    <input type="checkbox" className="showPassword" value={RegisterState.showPassword} checked={RegisterState.showPassword} onChange={() => dispatch(loginRegisterActions("showPassword"))} name="showPassword" />
                                    <label htmlFor="showPassword" className="showPassword" onClick={() => dispatch(loginRegisterActions("showPassword"))}>Show Password</label>
                                </FormGroup>
                                <Button type="submit" className="registerButton">Register</Button>
                                <p className="sign-in-up-redirect">Already a member? <Link to="/Login">Sign In</Link></p>
                            </form>
                        </div>
                    </Card>
                </Col>

                <div className="col-sm-4">
                    <Card className="googleLogin">
                        <div className="card-body">
                            <a className="btn btn-block btn-social btn-google" href="/auth/google" role="button">
                                <img className="googleImage" src={Google} alt="google Img" />
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