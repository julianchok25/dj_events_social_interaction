import React, { Children } from "react";
import { Container, Row, Col, Navbar } from "react-bootstrap";
import SuperiorMenu from "../../components/SuperiorMenu";
import "./BasicLayout.scss";

export default function BasicLayout(props) {
  const { children, className, setRefreshCheckLogin } = props;
  return (
    <Container className={`basic-layout ${className}`}>
      <Row>
        <Col xs={3} className="basic-layout__menu">
          <SuperiorMenu setRefreshCheckLogin={setRefreshCheckLogin} />
        </Col>
        <Col xs={9} className="basic-layout__content">
          {children}
        </Col>
      </Row>
    </Container>
  );
}
