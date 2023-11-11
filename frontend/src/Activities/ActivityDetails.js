import React, {useEffect, useState} from "react";
import {Container, Row, Col, Image, Button} from "react-bootstrap";
import Layout from "../Layout";
import {useParams} from "react-router-dom";
import Api from "../Api";

const ActivityDetails = () => {
    let { activityId } = useParams();
    const [activity, setActivity] = useState([]);
    useEffect(() => {
        (async () => setActivity(await Api.getActivityAsync(activityId)))();
    }, [activityId]);

    return (
        <>
            <Layout>
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
            </Layout>



        </>
    )
}

export default ActivityDetails;