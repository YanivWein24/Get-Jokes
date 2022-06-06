import React from 'react'
import { Container, Row, Col } from "react-bootstrap"

const year = new Date().getFullYear();

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className="text-center py-3"> {/*py-3 = padding on y axis 3 */}
                        Copyright &copy; {year} Tech Shop
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer