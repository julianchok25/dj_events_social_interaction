import React from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { Close } from "../../../assets/svg/close.svg";

import "./EventModal.scss";

export default function EventModal(props) {
  const { show, setShow, title, children } = props;
  return (
    <div
      className="event-modal"
      show={show}
      onHide={() => setShow(false)}
      centered
      size="lg"
    >
      <Modal>
        <Modal.Header>
          <Modal.Title>
            <h2>Create Event...</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
      </Modal>
    </div>
  );
}
