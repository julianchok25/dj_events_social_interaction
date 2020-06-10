import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMusic,
  faCalendar,
  faUserCheck,
  faCompactDisc,
} from "@fortawesome/free-solid-svg-icons";
import BasicModal from "../../Components/BasicModal/BasicModal";
import SignUpForm from "../../Components/SignUpForm";
import LogoVinyl from "../../assets/png/VinylRed.png";
import Logo2 from "../../assets/png/logo2.png";
import "./SigninSingUp.scss";

export default function SigninSingUp() {
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContenModal] = useState(null);

  const openModal = (content) => {
    setShowModal(true);
    setContenModal(content);
  };
  return (
    <>
      <Container className="signin-singup" fluid>
        <Row>
          <LeftComponent />
          <RightComponent openModal={openModal} setShowModal={setShowModal} />
        </Row>
      </Container>
      <BasicModal show={showModal} setShow={setShowModal}>
        {contentModal}
      </BasicModal>
    </>
  );
}

function LeftComponent() {
  return (
    <Col className="signin-signup__left" xs={6}>
      <img src={LogoVinyl} alt="Vinyl" />
      <div>
        <h2>
          <FontAwesomeIcon icon={faMusic} />
          Listen to what interests you.
        </h2>
        <h2>
          <FontAwesomeIcon icon={faCalendar} />
          Schedule your Events.
        </h2>
        <h2>
          <FontAwesomeIcon icon={faUserCheck} />
          Hire your favorite djs.
        </h2>
        <h2>
          <FontAwesomeIcon icon={faCompactDisc} />
          Make your music known.
        </h2>
      </div>
    </Col>
  );
}

function RightComponent(props) {
  const { setShowModal, openModal } = props;
  return (
    <Col className="signin-signup__right" xs={6}>
      <div>
        <img src={Logo2} alt="LogoWhite" />
        <h2>See what your favorite djs are uploading right now</h2>
        <h3>Join To Vinyl today.</h3>
        <Button
          variant="danger"
          onClick={() => openModal(<SignUpForm setShowModal={setShowModal} />)}
        >
          Register
        </Button>
        <Button
          variant="outline-primary"
          onClick={() => openModal(<h2>Formulario de login </h2>)}
        >
          Login
        </Button>
      </div>
    </Col>
  );
}
