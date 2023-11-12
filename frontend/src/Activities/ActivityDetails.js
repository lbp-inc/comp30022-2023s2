import React, {useEffect, useState} from "react";
import {Container, Row, Col, Image, Button, Placeholder} from "react-bootstrap";
import Layout from "../Layout";
import {useParams} from "react-router-dom";
import Api from "../Api";
import Modal from "react-bootstrap/Modal";
import BookNow from "./BookNow";

const ActivityDetails = () => {
    let { activityId } = useParams();
    const [activity, setActivity] = useState([]);
    useEffect(() => {
        (async () => setActivity(await Api.getActivityAsync(activityId)))();
    }, [activityId]);

    const [showLoginModal, setShowLoginModal] = useState(false);

    const formatPrice = (price) => {
        if (!price) return "";
        return price.toLocaleString([], { style: "currency", currency: "AUD" });
    }

    const formatDate = (dateTime) => {
        if (!dateTime) return "";
        return new Date(dateTime).toLocaleDateString();
    }

    const formatTime = (dateTime) => {
        if (!dateTime) return "";
        return new Date(dateTime).toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"});
    }

    // startTime in ISO DateTime object
    // duration in minutes
    const toStartEndTime = (startTime, duration) => {
        if (!startTime || !duration) return "";
        const startTimeObj = new Date(startTime);
        const endTimeObj = new Date(startTimeObj.getTime() + duration * 60000);
        return `${formatTime(startTimeObj)} - ${formatTime(endTimeObj)}`;
    }

    return (
        <>
            <Layout>
                <Container className="pt-5 mt-5">
                    <Row>
                        <Col className="p-3" sm>
                            <Image src={activity.image} alt={activity.name} fluid />
                        </Col>
                        <Col className="p-3 fs-5" sm>
                            <Row>
                                <Col>
                                    <p><i className="bi bi-calendar me-2"></i>{formatDate(activity.time)}</p>
                                    <p><i className="bi bi-clock me-2"></i>{toStartEndTime(activity.time, activity.duration)}</p>
                                    <p><i className="bi bi-geo-alt-fill me-2"></i>{activity.location}</p>
                                    <p className="price-tag fs-2 fw-medium">{formatPrice(activity.cost)}</p>
                                </Col>
                            </Row>
                            <Row sm="auto">
                                <Col>
                                    <Button onClick={() => setShowLoginModal(true)}>Book Now</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="p-3">
                            <h2>Description</h2>
                            <p>{activity.description}</p>
                        </Col>
                    </Row>
                </Container>
            </Layout>

            <Modal show={showLoginModal} size="lg" onHide={() => setShowLoginModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Book Now</Modal.Title>
                </Modal.Header>
                <BookNow/>
            </Modal>

        </>
    )
}

export default ActivityDetails;