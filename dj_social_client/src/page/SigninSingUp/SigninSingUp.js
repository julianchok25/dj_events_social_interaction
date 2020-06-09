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
import LogoVinyl from "../../assets/png/VinylRed.png";
import Logo2 from "../../assets/png/logo2.png";
import "./SigninSingUp.scss";

export default function SigninSingUp() {
  const [showModal, setShowModal] = useState(false);
  const [contenModal, setContenModal] = useState(null);
  return (
    <>
      <Container className="signin-singup" fluid>
        <Row>
          <LeftComponent />
          <RightComponent />
        </Row>
      </Container>
      <BasicModal show={showModal} set={setShowModal} children={contenModal}>
        <h1>Modal Content</h1>
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

function RightComponent() {
  return (
    <Col className="signin-signup__right" xs={6}>
      <div>
        <img src={Logo2} alt="LogoWhite" />
        <h2>See what your favorite djs are uploading right now</h2>
        <h3>Join To Vinyl today.</h3>
        <Button variant="danger">Register</Button>
        <Button variant="outline-primary">Login</Button>
      </div>
    </Col>
  );
}
