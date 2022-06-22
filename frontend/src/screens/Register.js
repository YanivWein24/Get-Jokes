import React, { useState } from 'react'
import { Container, Card, Row, Col, FormGroup, Button } from "react-bootstrap"


function Register({ isLightTheme }) {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")


    return (
        <Container className="fade-in mt-5">
            <h1>Register</h1>
            <p>Create a free account to be able to save all your favorite jokes!</p>
            <Row>
                <Col className="sm-8">
                    <Card>
                        <div className="card-body">
                            {/* Makes POST request to /Register route */}
                            <form action="/Register" method="POST">
                                <h3>Welcome {firstName} {lastName}!</h3>
                                <FormGroup>
                                    <label htmlFor="fname">First Name</label>
                                    <input type="text" className="form-control" name="firstName" placeholder="First" required={true} onChange={(e) => setFirstName(e.target.value)} />
                                </FormGroup>
                                <FormGroup>
                                    <label htmlFor="lname">Last Name</label>
                                    <input type="text" className="form-control" name="lastName" placeholder="Last" required={true} onChange={(e) => setLastName(e.target.value)} />
                                </FormGroup>
                                <FormGroup>
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" name="email" placeholder="Email" required={true} />
                                </FormGroup>
                                <FormGroup>
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" name="password" placeholder="Password" required={true} />
                                </FormGroup>
                                <Button type="submit" className="my-3 registerButton" variant={isLightTheme ? "success" : "info"}>Register</Button>
                                <p>Already a member? <a href="/Login">Sign In</a></p>
                            </form>
                        </div>
                    </Card>
                </Col>

                <div className="col-sm-4">
                    <div className="card">
                        <div className="card-body">
                            <a className="btn btn-block btn-social btn-google" href="/auth/google" role="button">
                                <i className="fab fa-google"></i>
                                Sign Up With Google
                            </a>
                        </div>
                    </div>
                    <Card>
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