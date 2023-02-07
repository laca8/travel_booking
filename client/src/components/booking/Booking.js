import React, { useState } from "react";
import {
  FormGroup,
  Form,
  ListGroup,
  List,
  ListGroupItem,
  Button,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import "./booking.css";
const Booking = ({ tour, averageRate }) => {
  const navigator = useNavigate();
  const { price, reviews } = tour;

  const [credintials, setCredintials] = useState({
    userId: "01",
    email: "example@gmail.com",
    fullName: "",
    phone: "",
    guestSize: 1,
    bookAt: "",
  });
  const handleChange = (e) => {
    setCredintials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleClick = (e) => {
    e.preventDefault();
    console.log(credintials);
    navigator("/thank-you");
    //console.log(price);
  };
  const serviceFee = 10;
  const totalAmount =
    Number(price) * Number(credintials.guestSize) + Number(serviceFee);
  return (
    <div className="booking">
      <div className="booking__top d-flex justify-content-between">
        <h3>
          ${price} <span>/per person</span>
        </h3>
        <span className="tour__rating d-flex align-items-center">
          <i className="ri-star-s-fill"></i>
          {averageRate == 0 ? null : averageRate} ({reviews?.length})
        </span>
      </div>
      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form" onSubmit={handleClick}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="number"
              placeholder="Phone"
              id="phone"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              placeholder=""
              id="bookAt"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Guest"
              id="guestSize"
              required
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </div>
      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0  px-0">
            <h5 className="d-flex align-items-center gap-1">
              ${price} <i className="ri-close-line"></i>1 person
            </h5>
            <span>$ {price}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0  px-0">
            <h5>Service charge</h5>
            <span>$ {serviceFee}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0  px-0 total">
            <h5>Total</h5>
            <span>$ {totalAmount}</span>
          </ListGroupItem>
        </ListGroup>
        <Button className="btn primary__btn w-100 mt-4" onClick={handleClick}>
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default Booking;
