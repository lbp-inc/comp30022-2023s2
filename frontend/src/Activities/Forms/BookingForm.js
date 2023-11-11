import React, {createContext, useContext, useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./Forms.css";
import Form from "react-bootstrap/Form";

// Create a Context for the formKeys
const FormContext = createContext();
const NavigableForm = ({ children, style, onSubmit }) => {

    const [formSections, setFormSections] = useState([]);

    // Function to add a formKey
    const addFormSection = (section) => {
        if (!formSections.some(x => x.id === section.id)) {
            setFormSections([section, ...formSections]);
        }
    };

    return (
        <FormContext.Provider value={{ addFormSection }}>
            <Form onSubmit={onSubmit}>
                <Container style={style}>
                    <Row>
                        <Col md="auto">
                            <nav className="nav nav-pills flex-column" id="form-nav">
                                {formSections.map((section, index) => (
                                    <a className="nav-link ms-3 my-1" href={`#${section.id}`} key={index}>{section.name}</a>
                                ))}
                            </nav>
                        </Col>
                        <Col>
                            <div className="form-scrollable py-1 px-5"
                                 data-bs-spy="scroll"
                                 data-bs-target="#form-nav"
                                 data-bs-smooth-scroll="true"
                                 tabIndex="0">
                                {children}
                            </div>
                        </Col>
                    </Row>
                </Container>
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
        <div className="mb-3" id={sectionId}>
            <h2>{sectionName}</h2>
            {children}
        </div>
    );
};

NavigableForm.Section = Section;

export default NavigableForm;