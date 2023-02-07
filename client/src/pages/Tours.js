import React, { useState, useEffect } from "react";
import CommonSection from "../shared/CommonSection";
import "../styles/tour.css";
import Newsletter from "./../shared/Newsletter";

import { Container, Row, Col } from "reactstrap";
import SearchBar from "../shared/SearchBar";
import TourCard from "../shared/TourCard";
import { useDispatch, useSelector } from "react-redux";
import { listToursAction } from "../redux/action/appAction";
import Error from "../components/features/Error";
import Loader from "../components/features/Loader";
import data from "../assets/data/tours";
const Tours = () => {
  const dispatch = useDispatch();
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  useEffect(() => {
    const pages = Math.ceil(5 / 4);
    setPageCount(pages);
  }, [page]);

  useEffect(() => {
    dispatch(listToursAction());
  }, []);

  const listTours = useSelector((state) => state.listTours);
  const { loading, error, tours } = listTours;
  const [info, setInfo] = useState([]);
  const [loc, setLoc] = useState("");
  const [dis, setDis] = useState(null);
  const [num, setNum] = useState(null);
  console.log(tours);
  useEffect(() => {
    setInfo(data);
  }, []);
  return (
    <>
      <CommonSection title={"All Tours"} />
      <section>
        <Container>
          <Row>
            <SearchBar
              num={num}
              setNum={setNum}
              loc={loc}
              setLoc={setLoc}
              dis={dis}
              setDis={setDis}
              info={info}
              setInfo={setInfo}
              data={data}
            />
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Container>
          <Row>
            {error && <Error error={error} />}
            {loading && <Loader />}
            {info?.map((tour) => (
              <Col lg="3" key={tour.id}>
                <TourCard tour={tour} />
              </Col>
            ))}
            <Col lg="12">
              <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                {[...Array(pageCount).keys()].map((number) => (
                  <span
                    className={page == number ? "active__page" : ""}
                    key={number}
                    onClick={() => setPage(number)}
                    style={{ cursor: "pointer" }}
                  >
                    {number + 1}
                  </span>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Tours;
