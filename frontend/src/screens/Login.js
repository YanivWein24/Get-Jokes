import React, { useState } from 'react'
import axios from 'axios'
import { Container, Card, Row, Col, form, FormGroup, Button } from "react-bootstrap"


function LogIn() {

    const [data, setData] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    // const getUser = () => {
    //     axios({
    //         method: "POST",
    //         withCredentials: true,
    //         url: "http://localhost:5000/user"
    //     }).then((res) => setData(res))
    // }

    return (
        <Container className="fade-in mt-5">
            <h1>Log In</h1>
            <Row>
                <Col className="sm-8">
                    <Card>
                        <div className="card-body">
                            {/* Makes POST request to /LogIn route */}
                            <form action="/Login" method="POST">
                                <FormGroup>
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" name="email" required={true} placeholder="Email" onChange={e => setEmail(e.target.value)} />
                                </FormGroup>
                                <FormGroup>
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" name="password" required={true} placeholder="Password" onChange={e => setPassword(e.target.value)} />
                                </FormGroup>
                                <Button type="submit" className="btn-dark my-3">Log In</Button>
                            </form>
                            <p>Don't have an account? <a href="/Register">Sign Up</a></p>
                        </div>
                    </Card>
                </Col>

                <div className="col-sm-4">
                    <div className="card">
                        <div className="card-body">
                            <a className="btn btn-block btn-social btn-google" href="/auth/google" role="button">
                                <i className="fab fa-google"></i>
                                Sign In With Google
                            </a>
                        </div>
                    </div>
                    <Card>
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