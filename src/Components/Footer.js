import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="card text-white bg-black mb-3">
        <Container>
          <Row className="card text-white bg-black mb-3">
            <Col>
              <LinkContainer to="/aboutus" className="text-light">
                <Nav.Link>ABOUT US</Nav.Link>
              </LinkContainer>
            </Col>
          </Row>
          <Row>
            <Col className="text-center py-3">
              Copyright &copy; Kanishk Kumar
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
