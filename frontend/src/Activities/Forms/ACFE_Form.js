/*
ACFE online form page [Using react-Bootstrap]
From: Event detail page
Jump to: Success page / Cancel page / Fail page
*/
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Accordion from 'react-bootstrap/Accordion';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './Forms.css';

const ACFEForm = () => {
    return (
        <>
            <div className="body_details">
                {/* Contents on top-bar */}
                <div className="color-heading top-banner">
                    <h1>ACFE Form</h1>
                </div>

                <Form>
                    {/* Form main body */}
                    <Accordion defaultActiveKey="0">

                        {/* Personal Details Accordion including Emergency Contact */}
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Personal Details</Accordion.Header>
                            <Accordion.Body>
                            <Row>
                                <Col>
                                    <Form.Label>Prefix</Form.Label>
                                    <Form.Select aria-label="Default select example">
                                        <option>Select...</option>
                                        <option value="Mr">Mr</option>
                                        <option value="Mrs">Mrs</option>
                                        <option value="Ms">Ms</option>
                                        <option value="Dr">Dr</option>
                                        <option value="">None</option>
                                        <option value="Other">Other, please specify</option>
                                    </Form.Select>
                                </Col>
                                <Col>
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Select aria-label="Default select example">
                                        <option>Select...</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="other">Other, please specify</option>
                                    </Form.Select>
                                </Col>
                            </Row>

                            <Form.Label></Form.Label>
                            <FloatingLabel controlId="ACFE.fname" label="First Name">
                                <Form.Control type="name" placeholder="March" />
                            </FloatingLabel><br></br>
                            <FloatingLabel controlId="ACFE.sname" label="Surname">
                                <Form.Control type="name" placeholder="Seven" />
                            </FloatingLabel><br></br>
                            <FloatingLabel controlId="ACFE.dob" label="Date of Birth">
                                <Form.Control type="date" placeholder="Seven" />
                            </FloatingLabel><br></br>
                            <FloatingLabel controlId="ACFE.phoneNumber" label="Phone Number">
                                <Form.Control type="phone" placeholder="0412345678" />
                            </FloatingLabel><br></br>
                            <FloatingLabel controlId="ACFE.email" label="Email Address">
                                <Form.Control type="email" placeholder="iLoveCos@starrail.me" />
                            </FloatingLabel>
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                label="Subscribe for next Brochure? (Also available on our website!)"
                            /><br></br>
                            <FloatingLabel controlId="ACFE.address" label="Address">
                                <Form.Control type="address" placeholder="15 Chelsea Rd" />
                            </FloatingLabel><br></br>
                            <FloatingLabel controlId="ACFE.suburb" label="Suburb">
                                <Form.Control type="suburb" placeholder="Chelsea" />
                            </FloatingLabel><br></br>
                            <FloatingLabel controlId="ACFE.postcode" label="Post Code">
                                <Form.Control type="postcode" placeholder="3196" />
                            </FloatingLabel><br></br>
                            <h3>Emergency Contact</h3>
                            <FloatingLabel controlId="ACFE.ECname" label="Emergency Contact Name">
                                <Form.Control type="name" placeholder="Pom-Pom" />
                            </FloatingLabel><br></br>
                            <FloatingLabel controlId="ACFE.ECrelationship" label="Relationship to you">
                                <Form.Control type="relationship" placeholder="" />
                            </FloatingLabel><br></br>
                            <FloatingLabel controlId="ACFE.ECphoneNumber" label="Phone Number">
                                <Form.Control type="phone" placeholder="0412345678" />
                            </FloatingLabel><br></br>
                            <h3>Concession Cards</h3>
                            <FloatingLabel controlId="ACFE.crn" label="Centrelink CRN (Costomer Refrence Number)">
                                <Form.Control type="number" placeholder="123 456 789 0" />
                            </FloatingLabel><br></br>
                            <FloatingLabel controlId="ACFE.cardType" label="Card Type (e.g. PPS/NS/DSP)">
                                <Form.Control type="cardType" placeholder="NS" />
                            </FloatingLabel><br></br>
                            <FloatingLabel controlId="ACFE.expiry" label="Expiry Date">
                                <Form.Control type="date" />
                            </FloatingLabel>
                            </Accordion.Body>
                        </Accordion.Item>

                        {/* Citizen Check Accordion */}
                        <Accordion.Item eventKey="1">
                            {/* TODO: */}
                        </Accordion.Item>
                    </Accordion>
                </Form>
            </div>
        </>
    )
};

export default ACFEForm;
