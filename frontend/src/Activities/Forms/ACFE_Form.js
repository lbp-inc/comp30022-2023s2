/*
ACFE online form page [Using react-Bootstrap]
From: Event detail page
Jump to: Success page / Cancel page / Fail page
*/
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import SignatureCanvas from 'react-signature-canvas'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Accordion from 'react-bootstrap/Accordion';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';

import './Forms.css';

const ACFEForm = () => {

    /* Form output fields structure */
    const [formData, setFormData] = useState({
        // Personal Details
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
        crn : 0,
        cardType: '',
        expiry: '',
        // Citizen Checks
        residentialType: '',
        residentialProveType: '',
        proveFile: null,
        // Language Background
        bornCountry: '',
        homeLanguage: '',
        EnglishLevel: '',
        haveEnglishDiff: false,
        diffAspect: '',
        isAborigin: false,
        isIslander: false,
        // Student Support
        disability: [],
        supportNeed: '',
        // Victoria Student Number
        doneVicSchool: false,
        schoolAttend: '',
        vicStudentNumber: null,
        // Edu Background
        inSecondary: false,
        secondaryCompletion: '',
        qualificationCompletion: '',
        qualificationType: '',
        // Details of Employment
        employmentStatus: '',
        employmentIndustry: '',
        occupationType: '',
        // Extra Information
        attendReason: '',
        knownFrom: '',
        // T&Cs
        wishVoting: false,
        acknowlegementAggreement: false,
        signature: '',                          // Signature store as data URL
        guardianName: '',
        guardianSignature: ''
    });

    /* Keep track of input change for fields */
    const inputChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };

    // refrence to signatures
    const applicantSignatureRef = React.createRef();
    const guardianSignatureRef = React.createRef();
    
    const clearSignature = (sigType) => {
        if (sigType === 'applicant')
            applicantSignatureRef.current.clear();
        if (sigType === 'guardian')
            guardianSignatureRef.current.clear();
    };
    
    const saveSignature = (sigType) => {
        if (sigType === 'applicant'){
            const imageData = applicantSignatureRef.current.toDataURL();
            inputChange('signature', imageData);
        }
        if (sigType === 'guardian'){
            const imageData = guardianSignatureRef.current.toDataURL();
            inputChange('guardianSignature', imageData);
        }
    };

    /* Handle disability multiselection */
    const disabilityChange = (newValue) => {
        const isChecked = formData.disability.includes(newValue);
    
        if (isChecked) {
          // Already in the array, remove it
          setFormData((prevData) => ({
            ...prevData,
            disability: prevData.disability.filter((value) => value !== newValue),
          }));
        } else {
          // Not in the array, add it
          setFormData((prevData) => ({
            ...prevData,
            disability: [...prevData.disability, newValue],
          }));
        }
      };

    /* Submit the form */
    const submitForm = (form) => {
        form.preventDefault();
        // Send it to Activity API
        window.alert(formData.bornCountry);  // Test
    };

    return (
        <>
            <div className="body_details">
                {/* Contents on top-bar */}
                <div className="color-heading top-banner">
                    <h1>ACFE Form</h1>
                </div>

                <Form onSubmit={submitForm}>
                    {/* Form main body */}
                    <Accordion defaultActiveKey="0">

                        {/* Personal Details Accordion including Emergency Contact */}
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Personal Details</Accordion.Header>
                            <Accordion.Body>
                            <Row>
                                <Col>
                                    <Form.Label>Prefix</Form.Label>
                                    <Form.Select aria-label="Default select example" onChange={(e) => inputChange('prefix', e.target.value)}>
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
                                    <Form.Select aria-label="Default select example" onChange={(e) => inputChange('gender', e.target.value)}>
                                        <option>Select...</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="other">Other, please specify</option>
                                    </Form.Select>
                                </Col>
                            </Row>

                            <Form.Label></Form.Label>
                            <FloatingLabel controlId="ACFE.fname" label="First Name">
                                <Form.Control type="name" placeholder="March" onChange={(e) => inputChange('firstName', e.target.value)} />
                            </FloatingLabel><br></br>
                            <FloatingLabel controlId="ACFE.sname" label="Surname">
                                <Form.Control type="name" placeholder="Seven" onChange={(e) => inputChange('surname', e.target.value)} />
                            </FloatingLabel><br></br>
                            <FloatingLabel controlId="ACFE.dob" label="Date of Birth">
                                <Form.Control type="date" placeholder="Seven" onChange={(e) => inputChange('dob', e.target.value)} />
                            </FloatingLabel><br></br>
                            <FloatingLabel controlId="ACFE.phoneNumber" label="Phone Number">
                                <Form.Control type="phone" placeholder="0412345678" onChange={(e) => inputChange('phone', e.target.value)} />
                            </FloatingLabel><br></br>
                            <FloatingLabel controlId="ACFE.email" label="Email Address">
                                <Form.Control type="email" placeholder="iLoveCos@starrail.me" onChange={(e) => inputChange('email', e.target.value)} />
                            </FloatingLabel>
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                label="Subscribe for next Brochure? (Also available on our website!)"
                                onChange={(e) => inputChange('prefix', e.target.checked)}
                            /><br></br>
                            <FloatingLabel controlId="ACFE.address" label="Address">
                                <Form.Control type="address" placeholder="15 Chelsea Rd" onChange={(e) => inputChange('address', e.target.value)} />
                            </FloatingLabel><br></br>
                            <FloatingLabel controlId="ACFE.suburb" label="Suburb">
                                <Form.Control type="suburb" placeholder="Chelsea" onChange={(e) => inputChange('suburb', e.target.value)} />
                            </FloatingLabel><br></br>
                            <FloatingLabel controlId="ACFE.postcode" label="Post Code">
                                <Form.Control type="postcode" placeholder="3196" onChange={(e) => inputChange('postcode', e.target.value)} />
                            </FloatingLabel><br></br>
                            <h3>Emergency Contact</h3>
                            <FloatingLabel controlId="ACFE.ECname" label="Emergency Contact Name">
                                <Form.Control type="name" placeholder="Pom-Pom" onChange={(e) => inputChange('ecName', e.target.value)} />
                            </FloatingLabel><br></br>
                            <FloatingLabel controlId="ACFE.ECrelationship" label="Relationship to you">
                                <Form.Control type="relationship" placeholder="Train Conductor" onChange={(e) => inputChange('ecRelationship', e.target.value)} />
                            </FloatingLabel><br></br>
                            <FloatingLabel controlId="ACFE.ECphoneNumber" label="Phone Number">
                                <Form.Control type="phone" placeholder="0412345678" onChange={(e) => inputChange('ecPhone', e.target.value)} />
                            </FloatingLabel><br></br>
                            <h3>Concession Cards</h3>
                            <FloatingLabel controlId="ACFE.crn" label="Centrelink CRN (Costomer Refrence Number)">
                                <Form.Control type="number" placeholder="123 456 789 0"  onChange={(e) => inputChange('crn', e.target.value)} />
                            </FloatingLabel><br></br>
                            <FloatingLabel controlId="ACFE.cardType" label="Card Type (e.g. PPS/NS/DSP)">
                                <Form.Control type="cardType" placeholder="NS" onChange={(e) => inputChange('cardType', e.target.value)} />
                            </FloatingLabel><br></br>
                            <FloatingLabel controlId="ACFE.expiryDate" label="Expiry Date">
                                <Form.Control type="date" onChange={(e) => inputChange('expiry', e.target.value)} />
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
                                    onChange={() => inputChange('residentialType', "Citizen")}
                                />
                                <Form.Check
                                    type={'radio'}
                                    name={'ResidentialType'}
                                    id={`ACFE.isPR`}
                                    label={`I am an Australian Permanent resident* (holder of a permanent Visa)`}
                                    onChange={() => inputChange('residentialType', "PR")}
                                />
                                <Form.Check
                                    type={'radio'}
                                    name={'ResidentialType'}
                                    id={`ACFE.isVisaHolder`}
                                    label={`I am  the holder of a special category visa* (sub class 444, New Zealand Citizen)`}
                                    onChange={() => inputChange('residentialType', "Visa")}
                                />
                                <Form.Check
                                    type={'radio'}
                                    name={'ResidentialType'}
                                    id={`ACFE.isETAS`}
                                    label={`I am an East Timorese Asylum Seeker*`}
                                    onChange={() => inputChange('residentialType', "ETAS")}
                                /><br />
                                <b> *Please provide one of the following accepted forms of evidence: </b><br />
                                <Form.Check
                                    inline
                                    type={'radio'}
                                    name={'ResidentialProveType'}
                                    id={`ACFE.hasMedicare`}
                                    label={`Green Medicare Card `}
                                    onChange={() => inputChange('residentialProveType', "Medicare")}
                                />
                                <Form.Check
                                    inline
                                    type={'radio'}
                                    name={'ResidentialProveType'}
                                    id={`ACFE.hasVisa`}
                                    label={`Visa details`}
                                    onChange={() => inputChange('residentialProveType', "Visa")}
                                />
                                <Form.Check
                                    inline
                                    type={'radio'}
                                    name={'ResidentialProveType'}
                                    id={`ACFE.hasCitizenship`}
                                    label={`Citizenship letter`}
                                    onChange={() => inputChange('residentialProveType', "CitizenshipLetter")}
                                />
                                <Form.Control controlId="ACFE.proveFile" type="file" size="sm" onChange={(e) => inputChange('proveFile', e.target.files[0])} />
                                </Accordion.Body>
                            </Accordion.Item>

                            {/* Language Background Accordion */}
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Language Background</Accordion.Header>
                                <Accordion.Body>
                                <FloatingLabel controlId="ACFE.bornCountry" label="What country were you born in?">
                                    <Form.Control type="contry" placeholder="Australia"  onChange={(e) => inputChange('bornCountry', e.target.value)}/>
                                </FloatingLabel><br></br>
                                <FloatingLabel controlId="ACFE.homeLanguage" label="What Language do you speak at home?">
                                    <Form.Control type="language" placeholder="English" onChange={(e) => inputChange('homeLanguage', e.target.value)} />
                                </FloatingLabel><br></br>
                                <Form.Label> How well do you speak English? </Form.Label><br />
                                <Form.Check
                                    inline
                                    type={'radio'}
                                    name={'EnglishWellness'}
                                    id={`ACFE.langWellness`}
                                    label={`Very well`}
                                    onChange={() => inputChange('EnglishLevel', "VeryWell")}
                                />
                                <Form.Check
                                    inline
                                    type={'radio'}
                                    name={'EnglishWellness'}
                                    id={`ACFE.langWellness`}
                                    label={`Well`}
                                    onChange={() => inputChange('EnglishLevel', "Well")}
                                />
                                <Form.Check
                                    inline
                                    type={'radio'}
                                    name={'EnglishWellness'}
                                    id={`ACFE.langWellness`}
                                    label={`Not well`}
                                    onChange={() => inputChange('EnglishLevel', "NotWell")}
                                />
                                <Form.Check
                                    inline
                                    type={'radio'}
                                    name={'EnglishWellness'}
                                    id={`ACFE.langWellness`}
                                    label={`What is English?`}
                                    onChange={() => inputChange('EnglishLevel', "Bad")}
                                /><br/><br/>
                                <b> Do you have any difficulty with the English Language? </b><br />
                                <Form.Check
                                    inline
                                    type={'radio'}
                                    name={'EnglishDiff'}
                                    id={`ACFE.diffEnglish`}
                                    label={`Yes`}
                                    onChange={() => inputChange('haveEnglishDiff', true)}
                                />
                                <Form.Check
                                    inline
                                    type={'radio'}
                                    name={'EnglishDiff'}
                                    id={`ACFE.diffEnglish`}
                                    label={`No`}
                                    onChange={() => inputChange('haveEnglishDiff', false)}
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
                                    onChange={() => inputChange('diffAspect', 'reading')}
                                />
                                <Form.Check
                                    inline
                                    type={'radio'}
                                    name={'EnglishDiffAspect'}
                                    id={`ACFE.diffAspect`}
                                    label={`Speaking`}
                                    onChange={() => inputChange('diffAspect', 'speaking')}
                                />
                                <Form.Check
                                    inline
                                    type={'radio'}
                                    name={'EnglishDiffAspect'}
                                    id={`ACFE.diffAspect`}
                                    label={`Writing`}
                                    onChange={() => inputChange('diffAspect', 'writing')}
                                /><br/><br/>
                                <Form.Group>
                                    <Form.Label> Are you of Aboriginal origin?   </Form.Label>
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'isAboriginal'}
                                        id={`ACFE.isAboriginal`}
                                        label={`Yes`}
                                        onChange={() => inputChange('isAborigin', true)}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'isAboriginal'}
                                        id={`ACFE.isAboriginal`}
                                        label={`No`}
                                        onChange={() => inputChange('isAborigin', false)}
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
                                        onChange={() => inputChange('isIslander', true)}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'isIslander'}
                                        id={`ACFE.isIslander`}
                                        label={`No`}
                                        onChange={() => inputChange('isIslander', false)}
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
                                        onChange={() => disabilityChange("Vision")}
                                    />
                                    <Form.Check
                                        inline
                                        type={'checkbox'}
                                        id={`ACFE.disHear`}
                                        label={`Hearing/Deaf`}
                                        onChange={() => disabilityChange("Hearing")}
                                    />
                                    <Form.Check
                                        inline
                                        type={'checkbox'}
                                        id={`ACFE.disIntell`}
                                        label={`Intellectual`}
                                        onChange={() => disabilityChange("Intellectual")}
                                    />
                                    <Form.Check
                                        inline
                                        type={'checkbox'}
                                        id={`ACFE.disBrain`}
                                        label={`Acquired Brain Impairment`}
                                        onChange={() => disabilityChange("Brain")}
                                    />
                                    <Form.Check
                                        inline
                                        type={'checkbox'}
                                        id={`ACFE.disMental`}
                                        label={`Mental Illness`}
                                        onChange={() => disabilityChange("Mental")}
                                    />
                                    <Form.Check
                                        inline
                                        type={'checkbox'}
                                        id={`ACFE.disLearn`}
                                        label={`Learning`}
                                        onChange={() => disabilityChange("Learning")}
                                    />
                                    <Form.Check
                                        inline
                                        type={'checkbox'}
                                        id={`ACFE.disPhysical`}
                                        label={`Physical`}
                                        onChange={() => disabilityChange("Physical")}
                                    />
                                    <Form.Check
                                        inline
                                        type={'checkbox'}
                                        id={`ACFE.disMed`}
                                        label={`Medical Condition`}
                                        onChange={() => disabilityChange("Medical")}
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
                                    <Form.Control type="support" placeholder="WheelChair" onChange={(e) => inputChange('supportNeed', e.target.value)} />
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
                                    onChange={() => inputChange('doneVicSchool', true)}
                                />
                                <Form.Text>
                                    I have not attended a Victorian school since 2009 or a TAFE or other VET training provider since the beginning of 2011
                                </Form.Text><br/>
                                <Form.Check
                                    type={'radio'}
                                    name={'vicSchool'}
                                    id={`ACFE.vicSchool`}
                                    label={`No`}
                                    onChange={() => inputChange('doneVicSchool', false)}
                                />
                                <Form.Text>
                                    I have attended a Victorian school since 2009.
                                </Form.Text><br/><br/>
                                <Form.Group className="mb-3" controlId="ACFE.VicSchoolAttend">
                                    <Form.Label> The most recent school you attended was </Form.Label>
                                    <Form.Control  type="vicSchool" placeholder="Fill-in if applicable" onChange={(e) => inputChange('schoolAttend', e.target.value)} />
                                </Form.Group>
                                <FloatingLabel controlId="ACFE.VicStudentNumber" label="Victorian Student Number (if known)">
                                    <Form.Control type="number"  onChange={(e) => inputChange('vicStudentNumber', e.target.value)}/>
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
                                        onChange={() => inputChange("inSecondary", true)}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'inSecondary'}
                                        id={`ACFE.inSecondary`}
                                        label={`No`}
                                        onChange={() => inputChange("inSecondary", false)}
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
                                        onChange={() => inputChange("secondaryCompletion", "N/A")}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'secondaryCompletion'}
                                        id={`ACFE.secondaryCompletion`}
                                        label={`Year 8 or below`}
                                        onChange={() => inputChange("secondaryCompletion", "Year 8 or below")}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'secondaryCompletion'}
                                        id={`ACFE.secondaryCompletion`}
                                        label={`Year 9 or equivalent`}
                                        onChange={() => inputChange("secondaryCompletion", "Year 9 or equivalent")}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'secondaryCompletion'}
                                        id={`ACFE.secondaryCompletion`}
                                        label={`Year 10`}
                                        onChange={() => inputChange("secondaryCompletion", "Year 10")}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'secondaryCompletion'}
                                        id={`ACFE.secondaryCompletion`}
                                        label={`Year 11`}
                                        onChange={() => inputChange("secondaryCompletion", "Year 11")}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'secondaryCompletion'}
                                        id={`ACFE.secondaryCompletion`}
                                        label={`Year 12`}
                                        onChange={() => inputChange("secondaryCompletion", "Year 12")}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label> <b> Have you successfully completed any of the following qualifications in AUSTRALIA? </b> </Form.Label>
                                    <Form.Check
                                        type={'radio'}
                                        name={'eduQulification'}
                                        id={`ACFE.eduQulification`}
                                        label={`Bachelor Degree (or higher) `}
                                        onChange={() => inputChange("qualificationCompletion", "Bachelor")}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'eduQulification'}
                                        id={`ACFE.eduQulification`}
                                        label={`Advanced Diploma or Associate`}
                                        onChange={() => inputChange("qualificationCompletion", "Advanced Diploma")}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'eduQulification'}
                                        id={`ACFE.eduQulification`}
                                        label={`Diploma or Associate Diploma `}
                                        onChange={() => inputChange("qualificationCompletion", "Associate Diploma")}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'eduQulification'}
                                        id={`ACFE.eduQulification`}
                                        label={`Certificate IV (or advanced Certificate/Technician)`}
                                        onChange={() => inputChange("qualificationCompletion", "IV")}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'eduQulification'}
                                        id={`ACFE.eduQulification`}
                                        label={`Certificate III l (or Trade Certificate)`}
                                        onChange={() => inputChange("qualificationCompletion", "III")}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'eduQulification'}
                                        id={`ACFE.eduQulification`}
                                        label={`Certificate II`}
                                        onChange={() => inputChange("qualificationCompletion", "II")}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'eduQulification'}
                                        id={`ACFE.eduQulification`}
                                        label={`Certificate I`}
                                        onChange={() => inputChange("qualificationCompletion", "I")}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'eduQulification'}
                                        id={`ACFE.eduQulification`}
                                        label={`Certificates (other than above)`}
                                        onChange={() => inputChange("qualificationCompletion", "Other")}
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
                                        onChange={() => inputChange("qualificationType", 'A')}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'qualificationHold'}
                                        id={`ACFE.qualificationHold`}
                                        label={`Australian Equivalent (E)`}
                                        onChange={() => inputChange("qualificationType", 'E')}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'qualificationHold'}
                                        id={`ACFE.qualificationHold`}
                                        label={`International (l)`}
                                        onChange={() => inputChange("qualificationType", 'I')}
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
                                        onChange={() => inputChange("employmentStatus", "Full Time")}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'employmentStatus'}
                                        id={`ACFE.employmentStatus`}
                                        label={`Part Time employee `}
                                        onChange={() => inputChange("employmentStatus", "Part Time")}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'employmentStatus'}
                                        id={`ACFE.employmentStatus`}
                                        label={`Self Employed - with no employees`}
                                        onChange={() => inputChange("employmentStatus", "Self Employed")}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'employmentStatus'}
                                        id={`ACFE.employmentStatus`}
                                        label={`Employer`}
                                        onChange={() => inputChange("employmentStatus", "Employer")}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'employmentStatus'}
                                        id={`ACFE.employmentStatus`}
                                        label={`Employed - unpaid family worker`}
                                        onChange={() => inputChange("employmentStatus", "Unpaid Family Worker")}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'employmentStatus'}
                                        id={`ACFE.employmentStatus`}
                                        label={`Unemployed - seeking full time work`}
                                        onChange={() => inputChange("employmentStatus", "Seekig Full Time")}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'employmentStatus'}
                                        id={`ACFE.employmentStatus`}
                                        label={`Unemployed - seeking part time work`}
                                        onChange={() => inputChange("employmentStatus", "Seeking Part Time")}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'employmentStatus'}
                                        id={`ACFE.employmentStatus`}
                                        label={`Unemployed/Retired `}
                                        onChange={() => inputChange("employmentStatus", "Unemployed")}
                                    />
                                </Form.Group><br/>
                                <Form.Group>
                                    <Form.Label> <b> If employed, in which industry area are you currently employed? </b> </Form.Label>
                                    <Form.Check
                                        type={'radio'}
                                        name={'industry'}
                                        id={`ACFE.industry`}
                                        label={`Agriculture, Forestry & Fishing (A)`}
                                        onChange={() => inputChange("employmentIndustry", "Agriculture")}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'industry'}
                                        id={`ACFE.industry`}
                                        label={`Mining(B)`}
                                        onChange={() => inputChange("employmentIndustry", "Mining")}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'industry'}
                                        id={`ACFE.industry`}
                                        label={`Manufacturing (C)`}
                                        onChange={() => inputChange("employmentIndustry", "Manufacturing")}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'industry'}
                                        id={`ACFE.industry`}
                                        label={`Electricity, Gas, Water & Waste Services (D)`}
                                        onChange={() => inputChange("employmentIndustry", "Electricity")}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'industry'}
                                        id={`ACFE.industry`}
                                        label={`Construction (E)`}
                                        onChange={() => inputChange("employmentIndustry", "Construction")}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'industry'}
                                        id={`ACFE.industry`}
                                        label={`Wholesale Trade (F)`}
                                        onChange={() => inputChange("employmentIndustry", "Wholesale")}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'industry'}
                                        id={`ACFE.industry`}
                                        label={`Retail Trade (G)`}
                                        onChange={() => inputChange("employmentIndustry", "Retail")}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'industry'}
                                        id={`ACFE.industry`}
                                        label={`Accommodation & Food Services (H)`}
                                        onChange={() => inputChange("employmentIndustry", "Accommodation")}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'industry'}
                                        id={`ACFE.industry`}
                                        label={`Transport, Postal & Warehouse (I)`}
                                        onChange={() => inputChange("employmentIndustry", "Transport")}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'industry'}
                                        id={`ACFE.industry`}
                                        label={`Information, Media & Telecommunication (J)`}
                                        onChange={() => inputChange("employmentIndustry", "Media")}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'industry'}
                                        id={`ACFE.industry`}
                                        label={`Financial & Insurance Services (K)`}
                                        onChange={() => inputChange("employmentIndustry", "Financial")}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'industry'}
                                        id={`ACFE.industry`}
                                        label={`Rental, Hiring & Real Estate Services (L)`}
                                        onChange={() => inputChange("employmentIndustry", "Rental")}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'industry'}
                                        id={`ACFE.industry`}
                                        label={`Professional, Scientific & Tech. Services (M)`}
                                        onChange={() => inputChange("employmentIndustry", "Scientific")}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'industry'}
                                        id={`ACFE.industry`}
                                        label={`Administrative & Support Services (N) `}
                                        onChange={() => inputChange("employmentIndustry", "Support Services")}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'industry'}
                                        id={`ACFE.industry`}
                                        label={`Public Administration & Safety (O)`}
                                        onChange={() => inputChange("employmentIndustry", "Public Administration")}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'industry'}
                                        id={`ACFE.industry`}
                                        label={`Education & Training (P)`}
                                        onChange={() => inputChange("employmentIndustry", "Education")}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'industry'}
                                        id={`ACFE.industry`}
                                        label={`HealthCare & Social Assistance (Q)`}
                                        onChange={() => inputChange("employmentIndustry", "HealthCare")}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'industry'}
                                        id={`ACFE.industry`}
                                        label={`Arts & Recreation Services (R)`}
                                        onChange={() => inputChange("employmentIndustry", "Recreation")}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'industry'}
                                        id={`ACFE.industry`}
                                        label={`Other Services`}
                                        onChange={() => inputChange("employmentIndustry", "Others")}
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
                                        onChange={() => inputChange("occupationType", "Manager")}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'occupation'}
                                        id={`ACFE.occupation`}
                                        label={`Professionals (2)`}
                                        onChange={() => inputChange("occupationType", "Professionals")}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'occupation'}
                                        id={`ACFE.occupation`}
                                        label={`Technicians & Trade Workers (3)`}
                                        onChange={() => inputChange("occupationType", "Technicians")}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'occupation'}
                                        id={`ACFE.occupation`}
                                        label={`Community & Personal Services ( 4)`}
                                        onChange={() => inputChange("occupationType", "Community")}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'occupation'}
                                        id={`ACFE.occupation`}
                                        label={`Clerical & Administrative Worker (5)`}
                                        onChange={() => inputChange("occupationType", "Clerical")}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'occupation'}
                                        id={`ACFE.occupation`}
                                        label={`Sales Worker (6)`}
                                        onChange={() => inputChange("occupationType", "Sales")}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'occupation'}
                                        id={`ACFE.occupation`}
                                        label={`Machinery Operator & Driver (7)`}
                                        onChange={() => inputChange("occupationType", "Machinery")}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'occupation'}
                                        id={`ACFE.occupation`}
                                        label={`Labourer (8)`}
                                        onChange={() => inputChange("occupationType", "Labourer")}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'occupation'}
                                        id={`ACFE.occupation`}
                                        label={`Other (9)`}
                                        onChange={() => inputChange("occupationType", "Other")}
                                    />
                                </Form.Group>
                            </Accordion.Body>
                        </Accordion.Item>


                        {/* Study Reason and Information Accordion */}
                        <Accordion.Item eventKey="7">
                            <Accordion.Header>Further Informations</Accordion.Header>
                            <Accordion.Body>
                                <Form.Group>
                                    <Form.Label> <b> Of the following categories, which one best describes your main reason for attending? </b> </Form.Label>
                                    <Form.Check
                                        type={'radio'}
                                        name={'studyReason'}
                                        id={`ACFE.studyReason`}
                                        label={`To get a job`}
                                        onChange={() => inputChange("attendReason", "get a job")}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'studyReason'}
                                        id={`ACFE.studyReason`}
                                        label={`It was a requirement of my job`}
                                        onChange={() => inputChange("attendReason", "job prerequisite")}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'studyReason'}
                                        id={`ACFE.studyReason`}
                                        label={`To develop my existing business`}
                                        onChange={() => inputChange("attendReason", "get skilled")}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'studyReason'}
                                        id={`ACFE.studyReason`}
                                        label={`I wanted extra skills for my job`}
                                        onChange={() => inputChange("attendReason", "job skill")}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'studyReason'}
                                        id={`ACFE.studyReason`}
                                        label={`To start my own business`}
                                        onChange={() => inputChange("attendReason", "start business")}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'studyReason'}
                                        id={`ACFE.studyReason`}
                                        label={`To get into another course of study`}
                                        onChange={() => inputChange("attendReason", "another course")}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'studyReason'}
                                        id={`ACFE.studyReason`}
                                        label={`To try for a different career`}
                                        onChange={() => inputChange("attendReason", "try different career")}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'studyReason'}
                                        id={`ACFE.studyReason`}
                                        label={`For personal reasons`}
                                        onChange={() => inputChange("attendReason", "personal reasons")}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'studyReason'}
                                        id={`ACFE.studyReason`}
                                        label={`To get a better job or promotion`}
                                        onChange={() => inputChange("attendReason", "better job")}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'studyReason'}
                                        id={`ACFE.studyReason`}
                                        label={`For self-development`}
                                        onChange={() => inputChange("attendReason", "self-development")}
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
                                        onChange={() => inputChange("knownFrom", "Friend")}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'knownFrom'}
                                        id={`ACFE.knownFrom`}
                                        label={`Work`}
                                        onChange={() => inputChange("knownFrom", "Work")}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'knownFrom'}
                                        id={`ACFE.knownFrom`}
                                        label={`Job Agency`}
                                        onChange={() => inputChange("knownFrom", "Agency")}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'knownFrom'}
                                        id={`ACFE.knownFrom`}
                                        label={`Employer`}
                                        onChange={() => inputChange("knownFrom", "Employer")}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'knownFrom'}
                                        id={`ACFE.knownFrom`}
                                        label={`Newspaper`}
                                        onChange={() => inputChange("knownFrom", "Newspaper")}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'knownFrom'}
                                        id={`ACFE.knownFrom`}
                                        label={`Longbeach PLACE Website`}
                                        onChange={() => inputChange("knownFrom", "Website")}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'knownFrom'}
                                        id={`ACFE.knownFrom`}
                                        label={`Longbeach PLACE Facebook page`}
                                        onChange={() => inputChange("knownFrom", "Facebook")}
                                    />
                                    <Form.Check
                                        inline
                                        type={'radio'}
                                        name={'knownFrom'}
                                        id={`ACFE.knownFrom`}
                                        label={`Longbeach PLACE Brochure`}
                                        onChange={() => inputChange("knownFrom", "Brochure")}
                                    />
                                    <Form.Check
                                        type={'radio'}
                                        name={'knownFrom'}
                                        id={`ACFE.knownFrom`}
                                        label={`Other`}
                                        onChange={() => inputChange("knownFrom", "Other")}
                                    />
                                    <Form.Control size="sm" type="text" placeholder="(please specify)" onChange={(e) => inputChange("knownFrom", e.target.value)}/>
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
                                    onChange={(e) => inputChange("wishVoting", e.target.checked)}
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
                                    onChange={() => inputChange('acknowlegementAggreement', true)}
                                />
                                <Form.Check
                                    inline
                                    name = 'agreement'
                                    type={'radio'}
                                    id={`ACFE.agreement`}
                                    label={`No I don't`}
                                    onChange={() => inputChange('acknowlegementAggreement', true)}
                                />
                                {/* Signature for Applicant */}
                                <FloatingLabel controlId="ACFE.Signature" label="Signature">
                                    <SignatureCanvas penColor='black' canvasProps={{width: 500, height: 200, className: 'sigCanvas'}} 
                                        onEnd={() => saveSignature('applicant')} ref={applicantSignatureRef} />
                                </FloatingLabel>
                                <Button variant="secondary" size="sm" className="float-end" onClick={() => clearSignature('applicant')}>
                                    Clear
                                </Button> <br/>

                                <b> For Applicant Under 18 Years of Age: </b><br/>
                                <FloatingLabel controlId="ACFE.guardianName" label="Parent/Guardian Name">
                                    <Form.Control type="name" placeholder='' onChange={(e) => inputChange('guardianName', e.target.value)} />
                                </FloatingLabel>
                                {/* Signature for Parent/Guardian */}
                                <FloatingLabel controlId="ACFE.Signature" label="Signature">
                                    <SignatureCanvas penColor='black' canvasProps={{width: 500, height: 200, className: 'sigCanvas'}} 
                                        onEnd={() => saveSignature('guardian')} ref={guardianSignatureRef} />
                                </FloatingLabel>
                                <Button variant="secondary" size="sm" className="float-end" onClick={() => clearSignature('guardian')}>
                                    Clear
                                </Button> <br/>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <Form.Text id="PaymentNotice" muted>
                        This registration may require a payment for few dollars.<br></br>
                    </Form.Text>

                    {/* Tester Button */}
                    <Button type="submit">Test Output!</Button>
                </Form>
            </div>
        </>
    )
};

export default ACFEForm;
