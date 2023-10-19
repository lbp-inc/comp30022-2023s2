/*
ACFE online form page [Using react-Bootstrap]
From: Event detail page
Jump to: Success page / Cancel page / Fail page
*/
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
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
                    <Form.Group className="mb-3" controlId="ACFE.fname">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="name" placeholder="March" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="ACFE.lname">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="name" placeholder="Seven" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="ACFE.phoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="phone" placeholder="0412345678" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="ACFE.email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com.au" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="IDcopy">
                        <Form.Label>Upload a copy of your ID</Form.Label>
                        <Form.Control type="file" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>More fields to be added!</Form.Label>
                        <Form.Control type="" placeholder="Enter your ans!" rows={3} />
                    </Form.Group>
                    <Button variant="outline-primary">Register!</Button>{' '}
                </Form>
            </div>
        </>
    )
};

export default ACFEForm;
