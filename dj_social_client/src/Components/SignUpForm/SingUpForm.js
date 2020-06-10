import React, { useState } from "react";

import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import "./SignUpForm.scss";

export default function SingUpForm(props) {
  const { setShowModal } = props;
  const { formData, setFormData } = useState(initialFormValue());

  const onSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);
    console.log(formData);
  };

  const onChange = (e) => {
    console.log(e.target.name);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="Sign-up-form">
      <h2>Create your account</h2>
      <form onSubmit={onSubmit} onChange={onChange}>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control type="text" placeholder="Name" name="name" />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Last Name"
                name="lastName"
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Form.Control type="email" placeholder="E-mail" name="email" />
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="password"
                placeholder="password"
                name="password"
              />
            </Col>
            <Col>
              <Form.Control
                type="password"
                placeholder="Repeat password"
                name=" "
              />
            </Col>
          </Row>
        </Form.Group>
        <Button variant="danger" tipe="submit">
          Register
        </Button>
      </form>
    </div>
  );
}

function initialFormValue() {
  return {
    name: "",
    latsName: "",
    email: "",
    password: "",
    repeatPasword: "",
  };
}
