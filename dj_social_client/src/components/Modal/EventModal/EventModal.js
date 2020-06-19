import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { Close } from "../../../utils/icons";

import "./EventModal.scss";

export default function EventModal(props) {
  const { show, setShow, title, children } = props;

  return (
    <Modal
      className="config-modal"
      show={show}
      onHide={() => setShow(false)}
      centered
      size="lg"
    >
      <Modal.Header>
        <Modal.Title>
          <Close onClick={() => setShow(false)} />
          <h2>{title}</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}
