import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMusic,
  faCalendar,
  faUserCheck,
  faCompactDisc,
} from "@fortawesome/free-solid-svg-icons";
import BasicModal from "../../components/Modal/BasicModal";
import LogoVinyl from "../../assets/png/VinylRed.png";
import LogoWhite from "../../assets/png/VinylWhite.png";
import SignInForm from "../../components/SignInForm";
import "./SigninSingUp.scss";
import SignUpForm from "../../components/SignUpForm";

export default function SigninSingUp(props) {
  const { setRefreshCheckLogin } = props;
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);

  const openModal = (content) => {
    setShowModal(true);
    setContentModal(content);
  };
  return (
    <>
      <Container className="signin-singup" fluid>
        <Row>
          <LeftComponent />
          <RightComponent
            openModal={openModal}
            setShowModal={setShowModal}
            setRefreshCheckLogin={setRefreshCheckLogin}
          />
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
  const { openModal, setShowModal, setRefreshCheckLogin } = props;

  return (
    <Col className="signin-signup__right" xs={6}>
      <div className="login-box">
        <div>
          <img src={LogoWhite} alt="LogoWhite" />
          <h2>See what your favorite djs are uploading right now</h2>
          <h3>Join To Vinyl today.</h3>
          <Button
            variant="danger"
            onClick={() =>
              openModal(<SignUpForm setShowModal={setShowModal} />)
            }
          >
            Register
          </Button>
          <Button
            variant="outline-primary"
            onClick={() =>
              openModal(
                <SignInForm setRefreshCheckLogin={setRefreshCheckLogin} />
              )
            }
          >
            Login
          </Button>
        </div>
      </div>
    </Col>
  );
}
