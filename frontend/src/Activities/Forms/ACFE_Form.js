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
                            <FloatingLabel controlId="ACFE.expiryDate" label="Expiry Date">
                                <Form.Control type="date" />
                            </FloatingLabel>
                            </Accordion.Body>
                        </Accordion.Item>

                        {/* Citizen Check Accordion */}
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>AUS Citizen Check</Accordion.Header>
                            <Accordion.Body>
                                <Form.Label>
                                To be eligible for an ACFE funded course at Longbeach PLACE, you must tick one of the following boxes and provide evidence 
                                <br/>(otherwise fee for service costs will apply)
                                </Form.Label> <br /><br />
                                <h5> RULES FOR GOVERNMENT FUNDING </h5>
                                <i>
                                To be eligible for an ACFE funded course at Longbeach PLACE, you must tick one of the following boxes and provide evidence 
                                <br/>(otherwise fee for service costs will apply)
                                </i> <br /><br />
                                <Form.Check
                                    type={'radio'}
                                    name={'ResidentialType'}
                                    id={`ACFE.isCitizen`}
                                    label={`I am an Australian Citizen*`}
                                />
                                <Form.Check
                                    type={'radio'}
                                    name={'ResidentialType'}
                                    id={`ACFE.isPR`}
                                    label={`I am an Australian Permanent resident* (holder of a permanent Visa)`}
                                />
                                <Form.Check
                                    type={'radio'}
                                    name={'ResidentialType'}
                                    id={`ACFE.isVisaHolder`}
                                    label={`I am  the holder of a special category visa* (sub class 444, New Zealand Citizen)`}
                                />
                                <Form.Check
                                    type={'radio'}
                                    name={'ResidentialType'}
                                    id={`ACFE.isETAS`}
                                    label={`I am an East Timorese Asylum Seeker*`}
                                /><br />
                                <b> *Please provide one of the following accepted forms of evidence: </b><br />
                                <Form.Check
                                    inline
                                    type={'radio'}
                                    name={'ResidentialProveType'}
                                    id={`ACFE.hasMedicare`}
                                    label={`Green Medicare Card `}
                                />
                                <Form.Check
                                    inline
                                    type={'radio'}
                                    name={'ResidentialProveType'}
                                    id={`ACFE.hasVisa`}
                                    label={`Visa details`}
                                />
                                <Form.Check
                                    inline
                                    type={'radio'}
                                    name={'ResidentialProveType'}
                                    id={`ACFE.hasCitizenship`}
                                    label={`Citizenship letter`}
                                />
                                <Form.Control controlId="ACFE.proveFile" type="file" size="sm" />
                                </Accordion.Body>
                            </Accordion.Item>

                            {/* Language Background Accordion */}
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Language Background</Accordion.Header>
                                <Accordion.Body>
                                <FloatingLabel controlId="ACFE.bornCountry" label="What country were you born in?">
                                    <Form.Control type="contry" placeholder="Australia" />
                                </FloatingLabel><br></br>
                                <FloatingLabel controlId="ACFE.homeLanguage" label="What Language do you speak at home?">
                                    <Form.Control type="contry" placeholder="English" />
                                </FloatingLabel><br></br>
                                <Form.Label> How well do you speak English? </Form.Label><br />
                                <Form.Check
                                    inline
                                    type={'radio'}
                                    name={'EnglishWellness'}
                                    id={`ACFE.langWellness`}
                                    label={`Very well`}
                                />
                                <Form.Check
                                    inline
                                    type={'radio'}
                                    name={'EnglishWellness'}
                                    id={`ACFE.langWellness`}
                                    label={`Well`}
                                />
                                <Form.Check
                                    inline
                                    type={'radio'}
                                    name={'EnglishWellness'}
                                    id={`ACFE.langWellness`}
                                    label={`Not well`}
                                />
                                <Form.Check
                                    inline
                                    type={'radio'}
                                    name={'EnglishWellness'}
                                    id={`ACFE.langWellness`}
                                    label={`What is English?`}
                                /><br/><br/>
                                <b> Do you have any difficulty with the English Language? </b><br />
                                <Form.Check
                                    inline
                                    type={'radio'}
                                    name={'EnglishDiff'}
                                    id={`ACFE.diffEnglish`}
                                    label={`Yes`}
                                />
                                <Form.Check
                                    inline
                                    type={'radio'}
                                    name={'EnglishDiff'}
                                    id={`ACFE.diffEnglish`}
                                    label={`No`}
                                /><br/>
                                <Form.Text muted>
                                    <i> (If appropriate place tick relevant box to identify where you have difficulty) </i>
                                </Form.Text><br/>
                                <Form.Check
                                    inline
                                    type={'radio'}
                                    name={'EnglishDiffAspect'}
                                    id={`ACFE.diffAspect`}
                                    label={`Reading`}
                                />
                                <Form.Check
                                    inline
                                    type={'radio'}
                                    name={'EnglishDiffAspect'}
                                    id={`ACFE.diffAspect`}
                                    label={`Speaking`}
                                />
                                <Form.Check
                                    inline
                                    type={'radio'}
                                    name={'EnglishDiffAspect'}
                                    id={`ACFE.diffAspect`}
                                    label={`Writing`}
                                /><br/><br/>
                                <Form.Group>
                                    <Form.Label> Are you of Aboriginal origin?   </Form.Label>
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'isAboriginal'}
                                        id={`ACFE.isAboriginal`}
                                        label={`Yes`}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'isAboriginal'}
                                        id={`ACFE.isAboriginal`}
                                        label={`No`}
                                    /><br/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label> Are you a Torres Strait Islander?   </Form.Label>
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'isIslander'}
                                        id={`ACFE.isIslander`}
                                        label={`Yes`}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'isIslander'}
                                        id={`ACFE.isIslander`}
                                        label={`No`}
                                    />
                                </Form.Group>
                            </Accordion.Body>
                        </Accordion.Item>

                        {/* Student Support Accordion */}
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>Student Support</Accordion.Header>
                            <Accordion.Body>
                            </Accordion.Body>
                        </Accordion.Item>

                        {/* Victoria Student Number Accordion */}
                        <Accordion.Item eventKey="4">
                            <Accordion.Header>Student Number</Accordion.Header>
                            <Accordion.Body>
                            </Accordion.Body>
                        </Accordion.Item>

                        {/* Previous Education Accordion */}
                        <Accordion.Item eventKey="5">
                            <Accordion.Header>Previous Education</Accordion.Header>
                            <Accordion.Body>
                            </Accordion.Body>
                        </Accordion.Item>

                        {/* Details of Employment Accordion */}
                        <Accordion.Item eventKey="6">
                            <Accordion.Header>Employment Details</Accordion.Header>
                            <Accordion.Body>
                            </Accordion.Body>
                        </Accordion.Item>


                        {/* Study Reason and Information Accordion */}
                        <Accordion.Item eventKey="7">
                            <Accordion.Header>Further Informations</Accordion.Header>
                            <Accordion.Body>
                            </Accordion.Body>
                        </Accordion.Item>

                        {/* Terms of Enrolment and Privacy Statement Accordion */}
                        <Accordion.Item eventKey="8">
                            <Accordion.Header> Terms & Statements </Accordion.Header>
                            <Accordion.Body>
                            </Accordion.Body>
                        </Accordion.Item>

                    </Accordion>
                </Form>
            </div>
        </>
    )
};

export default ACFEForm;
