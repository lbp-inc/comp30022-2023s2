/*
Fee for service online form page [Using react-Bootstrap]
From: Event detail page
Jump to: Success page / Cancel page / Fail page
*/
import React, {useEffect, useState} from 'react';
import SignatureCanvas from 'react-signature-canvas'
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Accordion from 'react-bootstrap/Accordion';
import {useAccordionButton} from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';

import './Forms.css';
import BookingForm from "./BookingForm";

const FeeForServiceForm = () => {

    // Data receiving from database for user profile
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Send a request to obtain personal information
                const response = await fetch("http://localhost:8000/api/users/getInfo", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                    body: JSON.stringify({token: localStorage.getItem('token')}),
                });
                const responseData = await response.json();

                if (response.status === 200) {
                    // Fetch successful
                    setUserInfo(responseData["data"])
                    setLoading(false);
                    console.log("Fetch successful")
                } else {
                    // Fetch failed
                    console.log("Fetch failed")
                }
            } catch (error) {
                console.error('Fetch personal info request error:', error);
            }
        }
        fetchProfile();

        setFormData({
            ...formData,
            prefix: (!userInfo.prefix) ? 'Mr' : userInfo.prefix,
            gender: (!userInfo.gender) ? '' : (userInfo.gender==="Male" ? "Male" : (userInfo.gender==="Female" ? "Female" : "Other")),
            firstName: (!userInfo.firstName) ? '' : userInfo.firstName,
            surname: (!userInfo.surname) ? '' : userInfo.surname,
            dob: (!userInfo.birthday) ? '' : userInfo.birthday,
            phone: (!userInfo.phone) ? '' : userInfo.phone,
            email: (!userInfo.email) ? '' : userInfo.email,
            address: (!userInfo.address) ? '' : userInfo.address,
            suburb: (!userInfo.suburb) ? '' : userInfo.suburb,
            postcode: (!userInfo.postcode) ? '' : userInfo.postcode,
            ecName: (!userInfo.ecName) ? '' : userInfo.ecName,
            ecRelationship: (!userInfo.ecRelationship) ? '' : userInfo.ecRelationship,
            ecPhone: (!userInfo.ecPhone) ? '' : userInfo.ecPhone,
        });
    }, []);


    /* Form output fields structure */
    const [formData, setFormData] = useState({
        prefix: '',
        gender: '',
        firstName: '',
        surname: '',
        dob: '',
        phone: '',
        email: '',
        subscribeForBrochure: false,
        address: '',
        suburb: '',
        postcode: '',
        ecName: '',
        ecRelationship: '',
        ecPhone: '',
        wishVote: '',
        volunteeringAgreement: null,
        mcAgreement: '',
        signature: ''                       // store as data URL (base64 png)
    });

    /* Keep track of input change for fields */
    const inputChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };

    const signatureRef = React.createRef();

    const clearSignature = () => {
        signatureRef.current.clear();
    };

    const saveSignature = () => {
        const imageData = signatureRef.current.toDataURL();
        inputChange('signature', imageData);
    };

    /* Submit the form */
    const SubmitForm = (form) => {
        //const [formComplete, setFormComplete] = useState(false);
        form.preventDefault();
        // Send it to Activity API
        window.alert(formData.prefix);  // Test
        // Check form completion
        // TODO
        // Update user profile if changed
        try {
            const dataToSend = {
                token: localStorage.getItem('token'),
                prefix: formData.prefix,
                gender: formData.gender,
                firstName: formData.firstName,
                surname: formData.surname,
                dob: formData.dob,
                phone: formData.phone,
                email: formData.email,
                address: formData.address,
                suburb: formData.suburb,
                postcode: formData.postcode,
                ecName: formData.ecName,
                ecRelationship: formData.ecRelationship,
                ecPhone: formData.ecPhone,
            };
            // Send form values to backend for updating personal info
            const response = async () => fetch("http://localhost:8000/api/users/updateInfo", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(dataToSend),
            });

            if (response.status === 200) {
                // Update successful
                console.log("Update successful.")
            } else {
                // Update failed
                console.log("Update failed.")
            }

        } catch (error) {
            console.error('Update personal info request error: ', error);
        }
    };

    return (
        <BookingForm onSubmit={SubmitForm}>
            <BookingForm.Section sectionId="s1" sectionName="Personal Details">
                <Row>
                    <Col>
                        <Form.Label>Prefix</Form.Label>
                        <Form.Select aria-label="Default select example" defaultValue={formData.prefix}
                                     onChange={(e) => inputChange('prefix', e.target.value)}>
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
                        <Form.Select aria-label="Default select example" defaultValue={formData.gender}
                                     onChange={(e) => inputChange('gender', e.target.value)}>
                            <option>Select...</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </Form.Select>
                    </Col>
                </Row>

                <Form.Label></Form.Label>
                <FloatingLabel controlId="FFS.fname" label="First Name" defaultValue={formData.firstName}
                               onChange={(e) => inputChange('firstName', e.target.value)}>
                    <Form.Control type="name" placeholder="March"/>
                </FloatingLabel><br></br>
                <FloatingLabel controlId="FFS.sname" label="Surname" defaultValue={formData.surname}
                               onChange={(e) => inputChange('suename', e.target.value)}>
                    <Form.Control type="name" placeholder="Seven"/>
                </FloatingLabel><br></br>
                <FloatingLabel controlId="FFS.dob" label="Date of Birth" defaultValue={formData.dob}
                               onChange={(e) => inputChange('dob', e.target.value)}>
                    <Form.Control type="date" placeholder="Seven"/>
                </FloatingLabel><br></br>
                <FloatingLabel controlId="FFS.phoneNumber" label="Phone Number" defaultValue={formData.phone}
                               onChange={(e) => inputChange('phone', e.target.value)}>
                    <Form.Control type="phone" placeholder="0412345678"/>
                </FloatingLabel><br></br>
                <FloatingLabel controlId="FFS.email" label="Email Address" defaultValue={formData.email}
                               onChange={(e) => inputChange('email', e.target.value)}>
                    <Form.Control type="email" placeholder="iLoveCos@starrail.me"/>
                </FloatingLabel>
                <Form.Check
                    type="switch"
                    id="FFS.subscribeForBrochure"
                    label="Subscribe for next Brochure? (Also available on our website!)"
                    onChange={(e) => inputChange('subscribeForBrochure', e.target.checked)}
                /><br></br>
                <FloatingLabel controlId="FFS.address" label="Address">
                    <Form.Control type="address" placeholder="15 Chelsea Rd" defaultValue={formData.address}
                                  onChange={(e) => inputChange('address', e.target.value)}/>
                </FloatingLabel><br></br>
                <FloatingLabel controlId="FFS.suburb" label="Suburb">
                    <Form.Control type="suburb" placeholder="Chelsea" defaultValue={formData.suburb}
                                  onChange={(e) => inputChange('suburb', e.target.value)}/>
                </FloatingLabel><br></br>
                <FloatingLabel controlId="FFS.postcode" label="Post Code">
                    <Form.Control type="postcode" placeholder="3196" defaultValue={formData.postcode}
                                  onChange={(e) => inputChange('postcode', e.target.value)}/>
                </FloatingLabel>
            </BookingForm.Section>
            <BookingForm.Section sectionId="s2" sectionName="Emergency Contact">
                <FloatingLabel controlId="FFS.ECname" label="Emergency Contact Name">
                    <Form.Control type="name" placeholder="Pom-Pom"  defaultValue={formData.ecName}
                                  onChange={(e) => inputChange('ecName', e.target.value)}/>
                </FloatingLabel><br></br>
                <FloatingLabel controlId="FFS.ECrelationship" label="Relationship to you">
                    <Form.Control type="relationship" placeholder="Star Train Conductor" defaultValue={formData.ecRelationship}
                                  onChange={(e) => inputChange('ecRelationship', e.target.value)}/>
                </FloatingLabel><br></br>  defaultValue={formData.ecPhone}
                <FloatingLabel controlId="FFS.ECphoneNumber" label="Phone Number">
                    <Form.Control type="phone" placeholder="0412345678"
                                  onChange={(e) => inputChange('ecPhone', e.target.value)}/>
                </FloatingLabel>
            </BookingForm.Section>
            <BookingForm.Section sectionId="s3" sectionName="Volunteering Information">
                <h4><u> Membership Fees </u></h4>
                <p>
                    <b>The Governance Committee has decided not to charge a membership fee for 2023.</b> Usually, it is
                    a Governance Committee policy that all participants pay an annual membership fee of $10.00 upon
                    their first enrolment for the calendar year (Jan pt -Dec 3l5t) with an option of applying for a
                    voting membership. Annual Membership Fee is non-refundable. <b>Membership Fee will be reviewed for
                    2024.</b>
                </p>
                <Form.Check
                    type={'checkbox'}
                    id={`FFS.wishVoting`}
                    label={`I wish to apply for voting membership. (Information is available at reception)`}
                    onChange={(e) => inputChange('wishVote', e.target.checked)}
                /> <br></br>
                <h4><u> Volunteering </u></h4>
                <Card>
                    <Card.Header>
                    </Card.Header>
                    <Card.Body>
                        {/* Only appears when ticked checkbox */}
                        <h4> I DO / DO NOT </h4>
                        <Form.Text muted>
                            Please select appropriate answer <br></br>
                        </Form.Text>
                        <p>
                            Allow photographs/videos of me to be taken, or any of the written work that is completed as
                            part of my classes at Longbeach PLACE, to be used for display on TV screens, web pages or
                            brochures/posters, video/audio, newsletters, newspaper articles or Annual Reports.
                        </p>
                        <Form.Group>
                            <Form.Check
                                inline
                                name='volunteerAgreement'
                                type={'radio'}
                                id={`FFS.volunteerAgreementY`}
                                label={`Yes I do`}
                                onChange={() => inputChange('volunteeringAgreement', true)}
                            />
                            <Form.Check
                                inline
                                name='volunteerAgreement'
                                type={'radio'}
                                id={`FFS.volunteerAgreementN`}
                                label={`No I don't`}
                                onChange={() => inputChange('volunteeringAgreement', false)}
                            />
                        </Form.Group>
                    </Card.Body>
                </Card><br></br>
                <h4><u> Member's Code of Conduct </u></h4>
                <h5> Each Participant has the right to </h5>
                <ul>
                    <li>Be shown respect by others</li>
                    <li>Actively participate in a non-threatening environment</li>
                    <li>Participate in a safe and healthy environment</li>
                    <li>Be afforded personal privacy and confidentiality</li>
                    <li>Be informed of policies and procedures</li>
                    <li>Be given information on the services available</li>
                    <li>Be given the opportunity to have input into decision making</li>
                    <li>Have cultural, religious, and per~onal differences respected</li>
                </ul>
                <h5> Each Participant has the responsibility to </h5>
                <ul>
                    <li>Abide by Longbeach PLACE Inc. policies and requirements</li>
                    <li>Act in a responsible way</li>
                    <li>Act in a responsible way</li>
                    <li>Ensure the rights of others are not compromised</li>
                    <li>Respect the personal space of others</li>
                    <li>Show respect for other people's property</li>
                    <li>Leave facilities in a clean and tidy condition after use</li>
                </ul>
                <Form.Check
                    type={'checkbox'}
                    id={`FFS.MCCAgreement`}
                    label={`I have read and agree to abide by the Member's Code.`}
                    onChange={(e) => inputChange('mcAgreement', e.target.checked)}
                /><br/>
                {/* Signature */}
                <FloatingLabel controlId="FFS.Signature" label="Signature">
                    <SignatureCanvas penColor='black' canvasProps={{width: 500, height: 200, className: 'sigCanvas'}}
                                     onEnd={saveSignature} ref={signatureRef}/>
                </FloatingLabel>
                <Button variant="secondary" size="sm" className="float-end" onClick={clearSignature}>
                    Clear
                </Button> <br/>
            </BookingForm.Section>

            <Form.Text id="PaymentNotice" muted>
                This registration may require a payment for few dollars.<br></br>
            </Form.Text>

            {/* Tester Button */}
            <Button type="submit">Test Output!</Button>
        </BookingForm>
    )
};

export default FeeForServiceForm;
