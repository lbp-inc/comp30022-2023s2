import React from 'react';

const Form = ({ children }) => {
    return (
        <div className="form">
            {children}
        </div>
    );
};

const Item = ({ children, formKey }) => {
    return (
        <div className="form-header" id={formKey}>
            {children}
        </div>
    );
};

Form.Item = Item;

export default Form;