import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const BookNow = () => {
    return (
        <>
            <Container className="p-3">
                <Row>
                    <Col>
                        <h3>Book with Membership</h3>
                        <p>With your membership account, you can easily book activities without having to fill the forms every single time.</p>
                    </Col>
                    <Col md="auto">
                        <Container>
                            <Row className="mb-3">
                                <Button>Login</Button>
                            </Row>
                            <Row className="p-0 mt-4 mb-1 text-center">
                                <h5>Not a member yet?</h5>
                            </Row>
                            <Row className="mb-3">
                                <Button>Register</Button>
                            </Row>
                            <Row className="mb-3">
                                <Button variant="secondary">Continue as Guest</Button>
                            </Row>
                        </Container>

                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default BookNow;