/*
Fee for service online form page [Using react-Bootstrap]
From: Event detail page
Jump to: Success page / Cancel page / Fail page
*/
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Forms.css';

const FeeForServiceForm = () => {
    return (
        <>
            <div className="body_details">
                {/* Contents on top-bar */}
                <div className="color-heading top-banner">
                    <h1>Fee-For-Service Form</h1>
                </div>

                <Form>
                    {/* Form main body */}
                    <Form.Group className="mb-3" controlId="FFS.fname">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="name" placeholder="March" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="FFS.lname">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="name" placeholder="Seven" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="FFS.phoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="phone" placeholder="0412345678" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="FFS.email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com.au" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>More fields to be added!</Form.Label>
                        <Form.Control type="" placeholder="Enter your ans!" rows={3} />
                    </Form.Group>
                    <Form.Text id="PaymentNotice" muted>
                        This registration may require a payment for few dollars.<br></br>
                    </Form.Text>

                </Form>
            </div>
        </>
    )
};

export default FeeForServiceForm;