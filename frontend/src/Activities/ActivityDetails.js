import React from "react";
import {Container, Row, Col, Image, Button} from "react-bootstrap";

const ActivityDetails = ({activity}) => {
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Image src={activity.image} alt={activity.name} fluid />
                    </Col>
                    <Col>
                        <Row >
                            <p>{activity.time}</p>
                            <p>{activity.duration}</p>
                            <p>${activity.cost}</p>
                        </Row>
                        <Row>
                            <Button>Book Now</Button>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <h2>Description</h2>
                    <p>{activity.description}</p>
                </Row>
            </Container>




        </>
    )
}

export default ActivityDetails;