import React from "react";

import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import "./SignUpForm.scss";

export default function SingUpForm(props) {
  const { setShowModal } = props;

  const onSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  return (
    <div className="Sign-up-form">
      <h2>Create your account</h2>
      <form onSubmit={onSubmit}>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control type="text" placeholder="Name" />
            </Col>
            <Col>
              <Form.Control type="text" placeholder="Last Name" />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Form.Control type="email" placeholder="E-mail" />
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control type="password" placeholder="password" />
            </Col>
            <Col>
              <Form.Control type="password" placeholder="Repeat password" />
            </Col>
          </Row>
        </Form.Group>
        <Button variant="primary" tipe="submit">
          Register
        </Button>
      </form>
    </div>
  );
}
