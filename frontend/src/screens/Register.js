import React from 'react'
import { Container, Card, Row, Col, form, FormGroup, Button } from "react-bootstrap"


function Register() {
    return (
        <Container className="mt-5">
            <h1>Register</h1>
            <Row>
                <Col className="sm-8">
                    <Card>
                        <div className="card-body">
                            {/* Makes POST request to /Register route */}
                            <form action="/Register" method="POST">
                                <FormGroup>
                                    <label for="email">Email</label>
                                    <input type="email" className="form-control" name="username" />
                                </FormGroup>
                                <FormGroup>
                                    <label for="password">Password</label>
                                    <input type="password" className="form-control" name="password" />
                                </FormGroup>
                                <Button type="submit" className="btn-dark">Register</Button>
                            </form>
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

export default Register