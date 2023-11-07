/*
Fee for service online form page [Using react-Bootstrap]
From: Event detail page
Jump to: Success page / Cancel page / Fail page
*/
import React, { useState } from 'react';
import SignatureCanvas from 'react-signature-canvas'
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './Forms.css';

const FeeForServiceForm = () => {
    
    function CustomToggle({ children, eventKey }) {
        const [isChecked, setIsChecked] = useState(false);
        
        const toggleAccordion = useAccordionButton(eventKey, () => {
            setIsChecked(!isChecked);
        });
        
        return (
            <div>
            <Form.Check
                type="checkbox"
                id={`FFS.volunteering`}
                label={`I would like to know more about Volunteering opportunities at Longbeach PLACE.`}            
                checked={isChecked}
                onChange={toggleAccordion}
            />
            </div>
        );
    }
    
    return (
        <>
            <div className="body_details">
                {/* Contents on top-bar */}
                <div className="color-heading top-banner">
                    <h1>Fee-For-Service Form</h1>
                </div>

                <Form>
                    {/* Form main body */}
                    <Accordion defaultActiveKey="0">

                        {/* Personal Details Accordion */}
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
                            <FloatingLabel controlId="FFS.fname" label="First Name">
                                <Form.Control type="name" placeholder="March" />
                            </FloatingLabel><br></br>
                            <FloatingLabel controlId="FFS.sname" label="Surname">
                                <Form.Control type="name" placeholder="Seven" />
                            </FloatingLabel><br></br>
                            <FloatingLabel controlId="FFS.dob" label="Date of Birth">
                                <Form.Control type="date" placeholder="Seven" />
                            </FloatingLabel><br></br>
                            <FloatingLabel controlId="FFS.phoneNumber" label="Phone Number">
                                <Form.Control type="phone" placeholder="0412345678" />
                            </FloatingLabel><br></br>
                            <FloatingLabel controlId="FFS.email" label="Email Address">
                                <Form.Control type="email" placeholder="iLoveCos@starrail.me" />
                            </FloatingLabel>
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                label="Subscribe for next Brochure? (Also available on our website!)"
                            /><br></br>
                            <FloatingLabel controlId="FFS.address" label="Address">
                                <Form.Control type="address" placeholder="15 Chelsea Rd" />
                            </FloatingLabel><br></br>
                            <FloatingLabel controlId="FFS.suburb" label="Suburb">
                                <Form.Control type="suburb" placeholder="Chelsea" />
                            </FloatingLabel><br></br>
                            <FloatingLabel controlId="FFS.postcode" label="Post Code">
                                <Form.Control type="postcode" placeholder="3196" />
                            </FloatingLabel>
                            </Accordion.Body>
                        </Accordion.Item>

                        {/* Emergency Contact Accordion */}
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Emergency Contact</Accordion.Header>
                            <Accordion.Body>
                                <FloatingLabel controlId="FFS.ECname" label="Emergency Contact Name">
                                    <Form.Control type="name" placeholder="Pom-Pom" />
                                </FloatingLabel><br></br>
                                <FloatingLabel controlId="FFS.ECrelationship" label="Relationship to you">
                                    <Form.Control type="relationship" placeholder="" />
                                </FloatingLabel><br></br>
                                <FloatingLabel controlId="FFS.ECphoneNumber" label="Phone Number">
                                    <Form.Control type="phone" placeholder="0412345678" />
                                </FloatingLabel>
                            </Accordion.Body>
                        </Accordion.Item>

                        {/* Membership 'n' Voluntering */}
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Membership, Member's Code of Conduct &#38; Volunteering</Accordion.Header>
                            <Accordion.Body>
                            <h4> <u> Membership Fees </u> </h4>
                                <p>
                                    <b>The Governance Committee has decided not to charge a membership fee for 2023.</b> Usually, it is a Governance Committee policy that all participants pay an annual membership fee of $10.00 upon their first enrolment for the calendar year (Jan pt -Dec 3l5t) with an option of applying for a voting membership. Annual Membership Fee is non-refundable. <b>Membership Fee will be reviewed for 2024.</b> 
                                </p>
                                <Form.Check
                                    type={'checkbox'}
                                    id={`FFS.wishVoting`}
                                    label={`I wish to apply for voting membership. (Information is available at reception)`}
                                /> <br></br>
                                <h4> <u> Voluntering </u> </h4>
                                <Accordion defaultActiveKey="">
                                    <Card>
                                        <Card.Header>
                                            <CustomToggle eventKey="v"></CustomToggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="v">
                                            <Card.Body>
                                                {/* Only appears when ticked checkbox */}
                                                <h4> I DO / DO NOT </h4>
                                                <Form.Text muted>
                                                Please select appropriate answer <br></br>
                                                </Form.Text>
                                                <p>
                                                    Allow photographs/videos of me to be taken, or any of the written work that is completed as part of my classes at Longbeach PLACE, to be used for display on TV screens, web pages or brochures/posters, video/audio, newsletters, newspaper articles or Annual Reports. 
                                                </p>
                                                <Form.Check
                                                    inline
                                                    name = 'volunteerAgreement'
                                                    type={'radio'}
                                                    id={`FFS.volunteerAggrement`}
                                                    label={`Yes I do`}
                                                />
                                                <Form.Check
                                                    inline
                                                    name = 'volunteerAgreement'
                                                    type={'radio'}
                                                    id={`FFS.volunteerAggrement`}
                                                    label={`No I don't`}
                                                />
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion><br></br>
                                <h4> <u> Member's Code of Conduct </u> </h4>
                                <h5> Each Participant has the right to </h5>
                                <ul>
                                    <li>Be shown respect by others</li>
                                    <li>Actively participate in a non-threatening environment </li>
                                    <li>Participate in a safe and healthy environment</li>
                                    <li>Be afforded personal privacy and confidentiality </li>
                                    <li>Be informed of policies and procedures </li>
                                    <li>Be given information on the services available</li>
                                    <li>Be given the opportunity to have input into decision making </li>
                                    <li>Have cultural, religious, and per~onal differences respected </li>
                                </ul>
                                <h5> Each Participant has the responsibility to </h5>
                                <ul>
                                    <li>Abide by Longbeach PLACE Inc. policies and requirements</li>
                                    <li>Aact in a responsible way</li>
                                    <li>Act in a responsible way</li>
                                    <li>Ensure the rights of others are not compromised</li>
                                    <li>Respect the personal space of others </li>
                                    <li>Show respect for other people's property</li>
                                    <li>Leave facilities in a clean and tidy condition after use </li>
                                </ul>
                                <Form.Check
                                    type={'checkbox'}
                                    id={`FFS.MCCAggrement`}
                                    label={`I have read and agree to abide by the Member's Code.`}
                                />
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion><br></br>

                    {/* Signature */}
                    <FloatingLabel controlId="FFS.Signature" label="Signature">
                        <SignatureCanvas penColor='blue'
                                         canvasProps={{width: 500, height: 200, className: 'sigCanvas'}} />
                    </FloatingLabel>
                    
                    <Form.Text id="PaymentNotice" muted>
                        This registration may require a payment for few dollars.<br></br>
                    </Form.Text>
                </Form>
            </div>
        </>
    )
};

export default FeeForServiceForm;
