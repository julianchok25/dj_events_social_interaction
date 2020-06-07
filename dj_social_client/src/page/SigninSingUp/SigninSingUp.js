import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import LogoVinyl from "../../assets/png/VinylRed.png";
import "./SigninSingUp.scss";

export default function SigninSingUp() {
  return (
    <Container className="signin-singup" fluid>
      <Row>
        <LeftComponent />
        <RightComponent />
      </Row>
    </Container>
  );
}

function LeftComponent() {
  return (
    <Col className="signin-signup__left" xs={6}>
      <img src={LogoVinyl} alt="Vinyl" />
      <div>
        <h2> Listen to what interests you.</h2>
        <h2> Schedule your Events.</h2>
        <h2> Hire your favorite djs.</h2>
        <h2> Make your music known.</h2>
      </div>
    </Col>
  );
}

function RightComponent() {
  return (
    <Col className="signin-signup__right" xs={6}>
      <h1>RightComponent...</h1>
    </Col>
  );
}
