import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Countrys from "../Components/Country";
import { listCountrys } from "../actions/countryActions";
import Loader from "../Components/Loader";
import Message from "../Components/Message";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const countryList = useSelector((state) => state.countryList);
  const { error, loading, countrys } = countryList;

  useEffect(() => {
    dispatch(listCountrys());
  }, [dispatch]);

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {countrys.map((country) => (
            <Col sm={12} md={6} lg={4} xl={3} key={country._id}>
              <Countrys country={country} />
            </Col>
          ))}
        </Row>
      )}
    </React.Fragment>
  );
};

export default HomeScreen;
