import React, {createContext, useContext, useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./Forms.css";

// Create a Context for the formKeys
const FormContext = createContext();
const NavigableForm = ({ children }) => {

    const [formSections, setFormSections] = useState([]);

    // Function to add a formKey
    const addFormSection = (section) => {
        if (!formSections.some(x => x.id === section.id)) {
            setFormSections([section, ...formSections]);
        }
    };

    return (
        <FormContext.Provider value={{ addFormSection }}>
            <Container>
                <Row>
                    <Col md="auto">
                        <nav className="nav nav-pills flex-column" id="form-nav">
                            {formSections.map((section, index) => (
                                <a className="nav-link ms-3 my-1" href={`#${section.id}`} key={index}>{section.name}</a>
                            ))}
                        </nav>
                    </Col>
                    <Col>
                        <div className="form-scrollable"
                             data-bs-spy="scroll"
                             data-bs-target="#form-nav"
                             data-bs-smooth-scroll="true"
                             tabIndex="0">
                            {children}
                        </div>
                    </Col>
                </Row>
            </Container>
        </FormContext.Provider>
    );
};

const Item = ({ children, sectionId, sectionName }) => {
    const { addFormSection } = useContext(FormContext);
    const formSection = {id: sectionId, name: sectionName};
    // Use an effect to add the formKey when the component mounts
    useEffect(() => {
        addFormSection(formSection);
    }, [formSection, addFormSection]);

    return (
        <div className="form-header" id={sectionId}>
            {children}
        </div>
    );
};

NavigableForm.Item = Item;

export default NavigableForm;