import TestForm from "./TestForm";
import formKeys from "./Form";
import React from "react";
import Form from "./Form"

const TestFormUI = ({children, form}) => {
    // Extract the formKey values from the form object
    const formKeys = [];

    React.Children.forEach(form.props.children, (child) => {
        window.alert(child);
        if (child.props.children) {
            formKeys.push(child.props.formKey);
        }
    });

    return (
        <>
            <h1>TestForm UI</h1>
            <div className="row">
                <div className="col-4">
                    <nav id="navbar-example3" className="h-100 flex-column align-items-stretch pe-4 border-end">
                        <nav className="nav nav-pills flex-column">
                            {formKeys.map((key) => (
                                <a className="nav-link" href={`#${key}`} key={key}>
                                    Item {formKeys.indexOf(key) + 1}
                                </a>
                            ))}
                        </nav>
                    </nav>
                </div>
            </div>
            {form}
        </>
    )
}

export default TestFormUI;