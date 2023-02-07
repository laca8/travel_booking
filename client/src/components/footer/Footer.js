import React from "react";
import { Container, Col, Row } from "reactstrap";
const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            Copyright &copy; Travel Booking
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
