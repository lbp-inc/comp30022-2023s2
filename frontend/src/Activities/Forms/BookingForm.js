import React, {createContext, useContext, useEffect, useState} from 'react';
import {Alert, CardBody, CardHeader, Container, Nav, NavLink} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./Forms.css";
import Form from "react-bootstrap/Form";
import ACFEForm from "./ACFE_Form";
import Card from "react-bootstrap/Card";

// Create a Context for the formKeys
const FormContext = createContext();
const BookingForm = ({ children, style, onSubmit }) => {

    const [formSections, setFormSections] = useState([]);

    // Function to add a formKey
    const addFormSection = (section) => {
        if (!formSections.some(x => x.id === section.id)) {
            setFormSections([section, ...formSections]);
        }
    };

    document.body.dataset.bsSpy = "scroll";
    document.body.dataset.bsTarget="#form-nav";
    document.body.dataset.bsSmoothScroll="true";

    return (
        <FormContext.Provider value={{ addFormSection }}>
            <Form onSubmit={onSubmit}>

                <Alert className="h-auto">
                    <Alert.Heading>
                        <i className="bi bi-info-circle"></i> Enrolment Form
                    </Alert.Heading>
                    <p className="mb-1">Please fill in the enrolment form to complete booking.</p>
                    <p>Payment will be handled at the reception.</p>
                </Alert>

                <Card className="sticky-top" style={{background: "white"}}>
                    <Nav variant="pills" id="form-nav" fill>
                        {formSections.map((section, index) => (
                            <Nav.Item>
                                <NavLink className="me-1 my-1" href={`#${section.id}`} key={index}>{section.name}</NavLink>
                            </Nav.Item>
                        ))}
                    </Nav>
                </Card>
                <div className="p-0" tabIndex="0">
                    {children}
                </div>

            </Form>
        </FormContext.Provider>
    );
};

const Section = ({ children, sectionId, sectionName }) => {
    const { addFormSection } = useContext(FormContext);
    const formSection = {id: sectionId, name: sectionName};
    // Use an effect to add the formKey when the component mounts
    useEffect(() => {
        addFormSection(formSection);
    }, [formSection, addFormSection]);

    return (
        <Card className="mb-4 p-4" id={sectionId}>
            <h2>{sectionName}</h2>
            {children}
        </Card>
    );
};

const Header = ({children}) => ({children})

BookingForm.Header = Header;
BookingForm.Section = Section;

export default BookingForm;