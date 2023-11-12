import {Alert, Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";

const BookNow = () => {
    const navigate = useNavigate();
    return (
        <>
            <Container className="p-3">
                <Row>
                    <Col sm={7} lg={9}>
                        <Alert className="my-3 m-1 h-auto">
                            <Alert.Heading><i className="bi bi-info-circle"></i> Book with Membership</Alert.Heading>
                            <p>With your membership account, you can easily book activities without having to fill the forms every single time.</p>
                        </Alert>
                    </Col>
                    <Col sm={5} lg={3} className="p-3">
                        <Container>
                            <Row className="mb-3 justify-content-center">
                                <Button>Login</Button>
                            </Row>
                            <Row className="p-0 mt-4 mb-1 text-center">
                                <Col>
                                    <p className="fw-medium">Not a member yet?</p>
                                </Col>
                            </Row>
                            <Row className="mb-3 justify-content-center">
                                <Button>Register</Button>
                            </Row>
                            <Row className="mb-3 justify-content-center">
                                <Button variant="secondary" onClick={() => navigate("/form")}>Continue as Guest</Button>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default BookNow;