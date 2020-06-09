import React from "react";
import { Modal } from "react-bootstrap";
import Logo3 from "../../assets/png/logo3.png";

import "./BasicModal.scss";

export default function BasicModal(props) {
  const { show, setShow, children } = props;
  return (
    <Modal
      className="basic-modal"
      show={show}
      onHide={() => setShow(false)}
      centered
      size="lg"
    >
      <Modal.Header>
        <Modal.Title>
          <img src={Logo3} alt="Djs" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}
