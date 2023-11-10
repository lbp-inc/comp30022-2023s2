/*
ACFE online form page [Using react-Bootstrap]
From: Event detail page
Jump to: Success page / Cancel page / Fail page
*/
import Form from 'react-bootstrap/Form';
import SignatureCanvas from 'react-signature-canvas'
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
                                <b> Do you consider yourself to have following disability? </b> <br/>
                                <Form.Text muted>
                                    <i> You may tick none or multiple </i>
                                </Form.Text><br/>
                                <Form.Group>
                                    <Form.Check
                                        inline
                                        type={'checkbox'}
                                        id={`ACFE.disVision`}
                                        label={`Vision`}
                                    />
                                    <Form.Check
                                        inline
                                        type={'checkbox'}
                                        id={`ACFE.disHear`}
                                        label={`Hearing/Deaf`}
                                    />
                                    <Form.Check
                                        inline
                                        type={'checkbox'}
                                        id={`ACFE.disIntell`}
                                        label={`Intellectual`}
                                    />
                                    <Form.Check
                                        inline
                                        type={'checkbox'}
                                        id={`ACFE.disBrain`}
                                        label={`Acquired Brain Impairment`}
                                    />
                                    <Form.Check
                                        inline
                                        type={'checkbox'}
                                        id={`ACFE.disMental`}
                                        label={`Mental Illness`}
                                    />
                                    <Form.Check
                                        inline
                                        type={'checkbox'}
                                        id={`ACFE.disLearn`}
                                        label={`Learning`}
                                    />
                                    <Form.Check
                                        inline
                                        type={'checkbox'}
                                        id={`ACFE.disPhysical`}
                                        label={`Physical`}
                                    />
                                    <Form.Check
                                        inline
                                        type={'checkbox'}
                                        id={`ACFE.disMed`}
                                        label={`Medical Condition`}
                                    /> <br/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label> Do you have a condition that may affect your participation in class?  </Form.Label>
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'haveCondition'}
                                        id={`ACFE.haveCondition`}
                                        label={`Yes`}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'haveCondition'}
                                        id={`ACFE.haveCondition`}
                                        label={`No`}
                                    />
                                </Form.Group>
                                <Form.Text>
                                    If you have any needs that would cause a barrier to your learning or assessment, please let us know. We will work with you to identify what reasonable adjustments or flexibility you may need to participate. 
                                </Form.Text><br/>
                                <FloatingLabel controlId="ACFE.supportNeeded" label="If yes, what support would you require?">
                                    <Form.Control type="support" placeholder="WheelChair" />
                                </FloatingLabel>
                                <Form.Text muted>
                                    <i> ( eg: I need wheelchair access) </i>
                                </Form.Text><br/>
                            </Accordion.Body>
                        </Accordion.Item>

                        {/* Victoria Student Number Accordion */}
                        <Accordion.Item eventKey="4">
                            <Accordion.Header>Student Number</Accordion.Header>
                            <Accordion.Body>
                                <b> To be completed by all students aged up to 24 years </b> <br/>
                                <Form.Text>
                                    Have you attended any Victorian school since 2009 or done any training with a vocational education & training (VET) registered training organisation or an Adult and community Education provider in Victoria since 2011? 
                                </Form.Text><br/><br/>
                                <Form.Check
                                    type={'radio'}
                                    name={'vicSchool'}
                                    id={`ACFE.vicSchool`}
                                    label={`Yes`}
                                />
                                <Form.Text>
                                    I have not attended a Victorian school since 2009 or a TAFE or other VET training provider since the beginning of 2011
                                </Form.Text><br/>
                                <Form.Check
                                    type={'radio'}
                                    name={'vicSchool'}
                                    id={`ACFE.vicSchool`}
                                    label={`No`}
                                />
                                <Form.Text>
                                    I have attended a Victorian school since 2009.
                                </Form.Text><br/><br/>
                                <Form.Group className="mb-3" controlId="ACFE.VicSchoolAttend">
                                    <Form.Label> The most recent school you attended was </Form.Label>
                                    <Form.Control  type="vicSchool" placeholder="Fill-in if applicable" />
                                </Form.Group>
                                <FloatingLabel controlId="ACFE.VicStudentNumber" label="Victorian Student Number (if known)">
                                    <Form.Control type="number" />
                                </FloatingLabel>
                                <i> Students who are enrolling for the first time since the VSN number was introduced will be provided with one  </i>
                            </Accordion.Body>
                        </Accordion.Item>

                        {/* Previous Education Accordion */}
                        <Accordion.Item eventKey="5">
                            <Accordion.Header>Previous Education</Accordion.Header>
                            <Accordion.Body>
                                <Form.Group>
                                    <Form.Label> <b> Are you still attending a Secondary School? </b> </Form.Label>
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'inSecondary'}
                                        id={`ACFE.inSecondary`}
                                        label={`Yes`}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'inSecondary'}
                                        id={`ACFE.inSecondary`}
                                        label={`No`}
                                    /><br/>
                                </Form.Group>
                                <FloatingLabel controlId="ACFE.leaveSecondary" label="Year you leave secondary school">
                                    <Form.Control type="number" placeholder='' />
                                </FloatingLabel> <Form.Text muted> <i> e.g. 1972 </i> </Form.Text><br/>
                                <Form.Group>
                                    <Form.Label> What level did you complete at Secondary School? </Form.Label>
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'secondaryCompletion'}
                                        id={`ACFE.secondaryCompletion`}
                                        label={`Did not go to School`}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'secondaryCompletion'}
                                        id={`ACFE.secondaryCompletion`}
                                        label={`Year 8 or below`}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'secondaryCompletion'}
                                        id={`ACFE.secondaryCompletion`}
                                        label={`Year 9 or equivalent`}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'secondaryCompletion'}
                                        id={`ACFE.secondaryCompletion`}
                                        label={`Year 10`}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'secondaryCompletion'}
                                        id={`ACFE.secondaryCompletion`}
                                        label={`Year 11`}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'secondaryCompletion'}
                                        id={`ACFE.secondaryCompletion`}
                                        label={`Year 12`}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label> <b> Have you successfully completed any of the following qualifications in AUSTRALIA? </b> </Form.Label>
                                    <Form.Check
                                        type={'radio'}
                                        name={'eduQulification'}
                                        id={`ACFE.eduQulification`}
                                        label={`Bachelor Degree (or higher) `}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'eduQulification'}
                                        id={`ACFE.eduQulification`}
                                        label={`Advanced Diploma or Associate`}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'eduQulification'}
                                        id={`ACFE.eduQulification`}
                                        label={`Diploma or Associate Diploma `}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'eduQulification'}
                                        id={`ACFE.eduQulification`}
                                        label={`Certificate IV (or advanced Certificate/Technician)`}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'eduQulification'}
                                        id={`ACFE.eduQulification`}
                                        label={`Certificate III l (or Trade Certificate)`}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'eduQulification'}
                                        id={`ACFE.eduQulification`}
                                        label={`Certificate II`}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'eduQulification'}
                                        id={`ACFE.eduQulification`}
                                        label={`Certificate I`}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'eduQulification'}
                                        id={`ACFE.eduQulification`}
                                        label={`Certificates (other than above)`}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label> <b> What kind of qualification do you hold? </b> </Form.Label>
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'qualificationHold'}
                                        id={`ACFE.qualificationHold`}
                                        label={`Australian Qualification (A)`}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'qualificationHold'}
                                        id={`ACFE.qualificationHold`}
                                        label={`Australian Equivalent (E)`}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'qualificationHold'}
                                        id={`ACFE.qualificationHold`}
                                        label={`International (l)`}
                                    />
                                </Form.Group>
                            </Accordion.Body>
                        </Accordion.Item>

                        {/* Details of Employment Accordion */}
                        <Accordion.Item eventKey="6">
                            <Accordion.Header>Employment Details</Accordion.Header>
                            <Accordion.Body>
                            <Form.Group>
                                    <Form.Label> <b> Of the following categories, which one BEST describes your current employment status? </b> </Form.Label>
                                    <Form.Check
                                        type={'radio'}
                                        name={'employmentStatus'}
                                        id={`ACFE.employmentStatus`}
                                        label={`Full Time employee`}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'employmentStatus'}
                                        id={`ACFE.employmentStatus`}
                                        label={`Part Time employee `}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'employmentStatus'}
                                        id={`ACFE.employmentStatus`}
                                        label={`Self Employed - with no employees`}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'employmentStatus'}
                                        id={`ACFE.employmentStatus`}
                                        label={`Employer`}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'employmentStatus'}
                                        id={`ACFE.employmentStatus`}
                                        label={`Employed - unpaid family worker`}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'employmentStatus'}
                                        id={`ACFE.employmentStatus`}
                                        label={`Unemployed - seeking full time work`}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'employmentStatus'}
                                        id={`ACFE.employmentStatus`}
                                        label={`Unemployed - seeking part time work`}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'employmentStatus'}
                                        id={`ACFE.employmentStatus`}
                                        label={`Unemployed/Retired `}
                                    />
                                </Form.Group><br/>
                                <Form.Group>
                                    <Form.Label> <b> If employed, in which industry area are you currently employed? </b> </Form.Label>
                                    <Form.Check
                                        type={'radio'}
                                        name={'industry'}
                                        id={`ACFE.industry`}
                                        label={`Agriculture, Forestry & Fishing (A)`}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'industry'}
                                        id={`ACFE.industry`}
                                        label={`Mining(B)`}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'industry'}
                                        id={`ACFE.industry`}
                                        label={`Manufacturing (C)`}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'industry'}
                                        id={`ACFE.industry`}
                                        label={`Electricity, Gas, Water & Waste Services (D)`}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'industry'}
                                        id={`ACFE.industry`}
                                        label={`Construction (E)`}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'industry'}
                                        id={`ACFE.industry`}
                                        label={`Wholesale Trade (F)`}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'industry'}
                                        id={`ACFE.industry`}
                                        label={`Retail Trade (G)`}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'industry'}
                                        id={`ACFE.industry`}
                                        label={`Accommodation & Food Services (H)`}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'industry'}
                                        id={`ACFE.industry`}
                                        label={`Transport, Postal & Warehouse (I)`}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'industry'}
                                        id={`ACFE.industry`}
                                        label={`Information, Media & Telecommunication (J)`}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'industry'}
                                        id={`ACFE.industry`}
                                        label={`Financial & Insurance Services (K)`}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'industry'}
                                        id={`ACFE.industry`}
                                        label={`Rental, Hiring & Real Estate Services (L)`}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'industry'}
                                        id={`ACFE.industry`}
                                        label={`Professional, Scientific & Tech. Services (M)`}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'industry'}
                                        id={`ACFE.industry`}
                                        label={`Administrative & Support Services (N) `}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'industry'}
                                        id={`ACFE.industry`}
                                        label={`Public Administration & Safety (O)`}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'industry'}
                                        id={`ACFE.industry`}
                                        label={`Education & Training (P)`}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'industry'}
                                        id={`ACFE.industry`}
                                        label={`HealthCare & Social Assistance (Q)`}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'industry'}
                                        id={`ACFE.industry`}
                                        label={`Arts & Recreation Services (R)`}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'industry'}
                                        id={`ACFE.industry`}
                                        label={`Other Services`}
                                    />
                                </Form.Group> <br/>
                                <Form.Group>
                                    <Form.Label> <b> Occupation Type Identified: </b> </Form.Label><br/>
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'occupation'}
                                        id={`ACFE.occupation`}
                                        label={`Manager (1)`}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'occupation'}
                                        id={`ACFE.occupation`}
                                        label={`Professionals (2)`}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'occupation'}
                                        id={`ACFE.occupation`}
                                        label={`Technicians & Trade Workers (3)`}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'occupation'}
                                        id={`ACFE.occupation`}
                                        label={`Community & Personal Services ( 4)`}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'occupation'}
                                        id={`ACFE.occupation`}
                                        label={`Clerical & Administrative Worker (5)`}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'occupation'}
                                        id={`ACFE.occupation`}
                                        label={`Sales Worker (6)`}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'occupation'}
                                        id={`ACFE.occupation`}
                                        label={`Machinery Operator & Driver (7)`}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'occupation'}
                                        id={`ACFE.occupation`}
                                        label={`Labourer (8)`}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'occupation'}
                                        id={`ACFE.occupation`}
                                        label={`Other (9)`}
                                    />
                                </Form.Group>
                            </Accordion.Body>
                        </Accordion.Item>


                        {/* Study Reason and Information Accordion */}
                        <Accordion.Item eventKey="7">
                            <Accordion.Header>Further Informations</Accordion.Header>
                            <Accordion.Body>
                                <Form.Group>
                                    <Form.Label> <b> What kind of qualification do you hold? </b> </Form.Label>
                                    <Form.Check
                                        type={'radio'}
                                        name={'studyReason'}
                                        id={`ACFE.studyReason`}
                                        label={`To get a job`}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'studyReason'}
                                        id={`ACFE.studyReason`}
                                        label={`It was a requirement of my job`}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'studyReason'}
                                        id={`ACFE.studyReason`}
                                        label={`To develop my existing business`}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'studyReason'}
                                        id={`ACFE.studyReason`}
                                        label={`I wanted extra skills for my job`}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'studyReason'}
                                        id={`ACFE.studyReason`}
                                        label={`To start my own business`}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'studyReason'}
                                        id={`ACFE.studyReason`}
                                        label={`To get into another course of study`}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'studyReason'}
                                        id={`ACFE.studyReason`}
                                        label={`To try for a different career`}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'studyReason'}
                                        id={`ACFE.studyReason`}
                                        label={`For personal reasons`}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'studyReason'}
                                        id={`ACFE.studyReason`}
                                        label={`To get a better job or promotion`}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'studyReason'}
                                        id={`ACFE.studyReason`}
                                        label={`For self-development`}
                                    />
                                </Form.Group> <br/>
                                <Form.Group>
                                    <Form.Label> <b> Where did you find out about this course? </b> </Form.Label>
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'knownFrom'}
                                        id={`ACFE.knownFrom`}
                                        label={`Friend`}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'knownFrom'}
                                        id={`ACFE.knownFrom`}
                                        label={`Work`}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'knownFrom'}
                                        id={`ACFE.knownFrom`}
                                        label={`Job Agency`}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'knownFrom'}
                                        id={`ACFE.knownFrom`}
                                        label={`Employer`}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'knownFrom'}
                                        id={`ACFE.knownFrom`}
                                        label={`Newspaper`}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'knownFrom'}
                                        id={`ACFE.knownFrom`}
                                        label={`Longbeach PLACE Website`}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'knownFrom'}
                                        id={`ACFE.knownFrom`}
                                        label={`Longbeach PLACE Facebook page`}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'knownFrom'}
                                        id={`ACFE.knownFrom`}
                                        label={`Longbeach PLACE Brochure`}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'knownFrom'}
                                        id={`ACFE.knownFrom`}
                                        label={`Other`}
                                    />
                                    <Form.Control size="sm" type="text" placeholder="(please specify)" />
                                </Form.Group>
                            </Accordion.Body>
                        </Accordion.Item>

                        {/* Terms of Enrolment and Privacy Statement Accordion */}
                        <Accordion.Item eventKey="8">
                            <Accordion.Header> Terms & Statements </Accordion.Header>
                            <Accordion.Body>
                                <h4> <u> Membership Fees </u> </h4>
                                <p>
                                    <b>The Governance Committee has decided not to charge a membership fee for 2023.</b> Usually, it is a Governance Committee policy that all participants pay an annual membership fee of $10.00 upon their first enrolment for the calendar year (Jan pt -Dec 3l5t) with an option of applying for a voting membership. Annual Membership Fee is non-refundable. <b>Membership Fee will be reviewed for 2024.</b>
                                </p>
                                <Form.Check
                                    type={'checkbox'}
                                    id={`ACFE.wishVoting`}
                                    label={`I wish to apply for voting membership. (Information is available at reception)`}
                                /> <br></br>

                                <h4> <u> Payments </u> </h4>
                                <p>
                                    Payments must accompany completed registration form with evidence of residency to confirm place. Early enrolment is essential. Enrolments close when classes are filled. Classes will commence on the date shown unless otherwise notified.
                                </p>

                                <h4> <u> Refunds </u> </h4>
                                <p>
                                    <b>Please choose your course carefully. Longbeach PLACE is not responsible for changes in your circumstances.</b> A refund will be issued if at least 5 working days' notice is given prior to the course start date. An administration fee of $10 will apply and be deducted from the refund. In the event that Longbeach PLACE has to cancel a course due to low enrolments, you will be notified prior to the start date and a full refund will be issued as soon as possible. If Longbeach PLACE defers a course and the new dates are not suitable, a full refund will be issued. <b><u>Please Note</u>: NO REFUND OR TRANSFER will be available after a course has started</b> (due to our Not-for-Profit status).
                                </p>

                                <h4> <u> Privacy Statement </u> </h4>
                                <p>
                                    <b>I understand that:</b> Longbeach PLACE Inc is required to provide the Victorian Government, through the Department of Education and Training, with student and training activity data which may include information I provide in this enrolment form. Information is required to be provided in accordance with the Victorian VET Student Statistical Collection Guidelines (Which are available at <a href="http://www.education.vic.gov.au/training/organisations/rto/Pages/datacollection.aspx">here</a>). The Department may use the information provided to it for planning, administration, policy development, program evaluation, resource allocation, reporting and/or research activities. For these and other lawful purposes, the Department may also disclose information to its consultants, advisers, other government agencies, professional bodies and/or other organisations. I have been advised by the training organisation that I may be contacted and requested to participate in a National Centre for Vocational Education Research survey or a Department-endorsed project or audit or review. 
                                </p>
                                <p>
                                    Longbeach PLACE Inc will not give personal information about you to anyone else without your written permission. This is the law known as the Privacy Act (2001).
                                </p>
                                <p>
                                    The Education and Training Reform Act 2006 requires Longbeach PLACE Inc to collect and disclose my personal information for a number of purposes including the allocation to me of a Victorian Student Number and updating my personal information on the Victorian Student Register (applies to persons aged 29 and under)
                                </p>
                                <p>
                                    For more information in relation to how student information may be used or disclosed please contact Longbeach PLACE Inc Privacy Officer on phone 9776 1386 or email <u>admin@longbeachplace.org.au</u>
                                </p>

                                <h4> Signature & Declaration </h4>
                                <ul>
                                    <li> If there is an emergency I allow those in charge to make decisions for my safety or well-being, including ambulance travel, medical treatment, and hospitalisation. </li>
                                    <li> I understand that I have to pay for all my own medical bills and expenses. </li>
                                    <li> I understand that Longbeach PLACE Inc. will let me know about any planned excursions. </li>
                                    <li> I acknowledge and agree to the terms described in this privacy statement. </li>
                                    <li> I understand that Longbeach PLACE has a Privacy and Grievance Policy and is committed to keeping personal information secure. Students may access the Privacy and Grievance Police from the Longbeach PLACE website, and may access their personal records upon request. </li>
                                    <li> I have read and understood the refund policy and I agree to abide by the Member's Code. </li>
                                    <li> I declare that all the information I have provided on this form is true and correct. </li>
                                </ul>
                                <h4> I DO / DO NOT </h4>
                                <Form.Text muted>
                                Please select appropriate answer <br></br>
                                </Form.Text>
                                <p>
                                    Allow photographs/videos of me to be taken, or any of the written work that is completed as part of my classes at Longbeach PLACE, to be used for display on TV screens, web pages or brochures/posters, video/audio, newsletters, newspaper articles or Annual Reports. 
                                </p>
                                <Form.Check
                                    inline
                                    name = 'agreement'
                                    type={'radio'}
                                    id={`ACFE.aggrement`}
                                    label={`Yes I do`}
                                />
                                <Form.Check
                                    inline
                                    name = 'agreement'
                                    type={'radio'}
                                    id={`ACFE.agreement`}
                                    label={`No I don't`}
                                />
                                {/* Signature for Applicant */}
                                <FloatingLabel controlId="FFS.Signature" label="Signature">
                                    <SignatureCanvas penColor='blue'
                                                    canvasProps={{width: 500, height: 200, className: 'sigCanvas'}} />
                                </FloatingLabel> <br/>

                                <b> For Applicant Under 18 Years of Age: </b><br/>
                                <FloatingLabel controlId="ACFE.guardianName" label="Parent/Guardian Name">
                                    <Form.Control type="name" placeholder='' />
                                </FloatingLabel>
                                {/* Signature for Parent/Guardian */}
                                <FloatingLabel controlId="FFS.Signature" label="Signature">
                                    <SignatureCanvas penColor='blue'
                                                    canvasProps={{width: 500, height: 200, className: 'sigCanvas'}} />
                                </FloatingLabel>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <Form.Text id="PaymentNotice" muted>
                        This registration may require a payment for few dollars.<br></br>
                    </Form.Text>
                </Form>
            </div>
        </>
    )
};

export default ACFEForm;
