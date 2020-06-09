import React from "react";
import { Form, Button, Spinner, FormGroup } from "react-bootstrap";
import "./SignInForm.scss";

export default function SignInForm() {
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Login...");
  };

  return (
    <div className="sign-in-form">
      <h2>Access</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Control type="email" placeholder="Email" />
        </Form.Group>
        <FormGroup>
          <Form.Control type="password" placeholder="Password" />
        </FormGroup>
        <Button variant="danger" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}
