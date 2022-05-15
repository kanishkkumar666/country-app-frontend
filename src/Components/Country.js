import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import Rating from "./Rating";

const Country = ({ country }) => {
  return (
    <React.Fragment>
      <Card className="rounded border-0 my-3 p-3">
        <Card.Img
          src={country.image}
          alt={country.name}
          className="border border-dark"
          width="200"
          height="200"
        />
        <Card.Body>
          <Card.Title className="text-center text-uppercase text-dark">
            <b>{country.name}</b>
          </Card.Title>
        </Card.Body>
        <Button>
          <Link
            to={`/country/${country._id}`}
            className="text-decoration-none text-uppercase text-light text-center"
          >
            <b>More Details</b>
          </Link>
        </Button>
        <Card.Text className="text-uppercase text-center text-dark">
          <Rating
            value={country.rating}
            text={`${country.numReviews} reviews`}
          />
        </Card.Text>
      </Card>
    </React.Fragment>
  );
};

export default Country;
