import React from "react";
import "./commonSection.css";
import TourCard from "./../shared/TourCard";
import SearchBar from "./../shared/SearchBar";

import { Container, Row, Col } from "reactstrap";
const CommonSection = ({ title }) => {
  return (
    <section className="common__section">
      <Container>
        <Row>
          <Col lg="12">
            <h1 style={{ textAlign: "center" }}>{title}</h1>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CommonSection;
