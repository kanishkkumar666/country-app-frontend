import React, { useEffect } from "react";
import { Row, Col, Image, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Rating from "../Components/Rating";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { listCountryDetails } from "../actions/countryActions";

const MovieScreen = ({ match }) => {
  const dispatch = useDispatch();
  const countryDetails = useSelector((state) => state.countryDetails);
  const { error, loading, country } = countryDetails;

  useEffect(() => {
    dispatch(listCountryDetails(match.params.id));
  }, [match.params.id, dispatch]);

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <br />
            <Image src={country.image} alt={country.name} fluid width="400" height="400" />
            <hr />
            <Link className="btn btn-danger my-3" to="/">
              <i className="fa fa-arrow-circle-left"></i> Back
            </Link>
          </Col>
          <Col md={6}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3 className="text-center">{country.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <h5 className="text-center">Continent: {country.continent}</h5>
              </ListGroup.Item>
              <ListGroup.Item className="text-center">
                <Rating
                  value={country.rating}
                  text={`${country.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item className="border-0 justify-text-center">
                Description: {country.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </React.Fragment>
  );
};

export default MovieScreen;
