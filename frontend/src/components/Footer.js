import React from 'react'
import { Container, Row, Col } from "react-bootstrap"

const year = new Date().getFullYear()

const Footer = () =>
    <footer>
        <Container>
            <Row>
                <Col className="text-center py-3 fade-in"> {/*py-3 = padding on y axis 3 */}
                    Copyright &copy; {year} Yaniv Weinshtein
                </Col>
            </Row>
        </Container>
    </footer>

export default Footer