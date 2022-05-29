import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

import Countrys from "../Components/Country";
import Message from "../Components/Message";
import { baseRouter } from "../Config";

const SearchResults = ({ match }) => {
  const [countrys, setCountrys] = useState([]);
  const error = "No Country Found...!";

  useEffect(() => {
    axios
      .get(`${baseRouter}/api/country/name/${match.params.name}`)
      .then(({ data }) => {
        setCountrys(data);
      })
      .catch((error) => console.error(error));
  }, [match.params.name]);

  return (
    <React.Fragment>
      {countrys.length < 1 ? (
        <Message>{error}</Message>
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

export default SearchResults;
