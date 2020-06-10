import React, { Children } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./BasicLayout.scss";

export default function BasicLayout(props) {
  const { children, className } = props;
  console.log(props);
  return (
    <Container className={`basic-layout ${className}`}>
      <Row>
        <Col xs={3} className="basic-layout__menu">
          <h2>Menu...</h2>
        </Col>
        <Col xs={9} className="basic-layout__content">
          {children}
        </Col>
      </Row>
    </Container>
  );
}
