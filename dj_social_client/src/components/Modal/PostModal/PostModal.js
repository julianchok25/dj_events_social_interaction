import React, { useState } from "react";
import { Modal, Form, Button, ModalBody } from "react-bootstrap";
import { Close } from "../../../utils/icons";
import classnames from "classnames";
import { addPostApi } from "../../../api/posts";
import { toast } from "react-toastify";

import "./PostModal.scss";

export default function PostModal(props) {
  const { show, setShow } = props;
  const [message, setMessage] = useState("");
  const maxLength = 280;

  const onSubmit = (e) => {
    e.preventDefault();

    if (message.length > 0 && message.length <= maxLength) {
      addPostApi(message)
        .then((response) => {
          if (response?.code >= 200 && response?.code < 300) {
            toast.success(response.message);
            setShow(false);
            window.location.reload();
          }
        })
        .catch(() => {
          toast.warning("Error Send Your Post, Later Again");
        });
    }
  };

  return (
    <Modal
      className="post-modal"
      show={show}
      onHide={() => setShow(false)}
      centered
      size="lg"
    >
      <Modal.Header>
        <Modal.Title>
          <Close onClick={() => setShow(false)} />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Control
            as="textarea"
            rows="6"
            placeholder="Add a comment or link"
            onChange={(e) => setMessage(e.target.value)}
          />
          <span
            className={classnames("count", {
              error: message.length > maxLength,
            })}
          >
            Words: {message.length}
          </span>
          <Button
            disabled={message.length > maxLength || message.length < 1}
            variant="danger"
            type="submit"
          >
            Posted
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
