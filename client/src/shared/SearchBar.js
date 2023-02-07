import React, { useRef } from "react";
import { FormGroup, Form, Col } from "reactstrap";
import "./search-bar.css";
const SearchBar = ({
  info,
  setInfo,
  dis,
  loc,
  num,
  setNum,
  setLoc,
  setDis,
  data,
}) => {
  const searchHandler = () => {
    if (loc == "" || dis == "" || num == "") {
      return alert("All fields are required");
    } else {
      setInfo(
        data.filter(
          (x) => x.city == loc && x.distance == dis && x.maxGroupSize == num
        )
      );
    }
  };
  return (
    <Col lg="12">
      <div className="search__bar">
        <Form className="d-flex align-items-center gap-4">
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              {" "}
              <i className="ri-map-pin-line"></i>
            </span>
            <div>
              <h6>Location</h6>
              <input
                type="text"
                placeholder="Where are you going"
                value={loc}
                onChange={(e) => setLoc(e.target.value)}
              />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              {" "}
              <i className="ri-map-pin-time-line"></i>
            </span>
            <div>
              <h6>Distance</h6>
              <input
                type="number"
                placeholder="Distance k/m"
                value={dis}
                onChange={(e) => setDis(e.target.value)}
              />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              {" "}
              <i className="ri-group-line"></i>
            </span>
            <div>
              <h6>Max People</h6>
              <input
                type="number"
                placeholder="0"
                value={num}
                onChange={(e) => setNum(e.target.value)}
              />
            </div>
          </FormGroup>
          <span className="search__icon" type="submit">
            <i className="ri-search-line" onClick={searchHandler}></i>
          </span>
        </Form>
      </div>
    </Col>
  );
};

export default SearchBar;
