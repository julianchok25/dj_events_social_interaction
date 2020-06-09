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
      <h2>Crea tu cuenta</h2>
      <form onSubmit={onSubmit}>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control type="text" placeholder="Nombre" />
            </Col>
            <Col>
              <Form.Control type="text" placeholder="Apellidos" />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Form.Control type="email" placeholder="Correo electronico" />
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control type="password" placeholder="Repetir contraseña" />
            </Col>
            <Col>
              <Form.Control type="text" placeholder="Apellidos" />
            </Col>
          </Row>
        </Form.Group>
        <button variant="primary" tipe="submit">
          Registrarse
        </button>
      </form>
    </div>
  );
}
