import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Message from "../Components/Message";
import Loader from "../Components/Loader";
import FormContainer from "../Components/FormContainer";
import { listCountryDetails, updateCountry } from "../actions/countryActions";
import { COUNTRY_UPDATE_RESET } from "../constants/countryConstants";

const CountryEditScreen = ({ match, history }) => {
  const countryId = match.params.id;

  const [name, setName] = useState("");
  const [continent, setContinent] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [numReviews, setNumReviews] = useState(0);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const countryDetails = useSelector((state) => state.countryDetails);
  const { loading, error, country } = countryDetails;

  const countryUpdate = useSelector((state) => state.countryUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = countryUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: COUNTRY_UPDATE_RESET });
      history.push("/admin/countrylist");
    } else {
      if (!country.name || country._id !== countryId) {
        dispatch(listCountryDetails(countryId));
      } else {
        setName(country.name);
        setContinent(country.continent);
        setImage(country.image);
        setRating(country.rating);
        setNumReviews(country.numReviews);
        setDescription(country.description);
      }
    }
  }, [dispatch, history, countryId, country, successUpdate]);

  const uploadFileHandler = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("https://country-app-backends.herokuapp.com/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    window.alert("Are you sure...!");
    dispatch(
      updateCountry({
        _id: countryId,
        name,
        continent,
        image,
        rating,
        description,
        numReviews,
      })
    );
  };
  
  return (
    <React.Fragment>
      <Link className="btn btn-danger my-3" to="/">
        <i className="fa fa-arrow-circle-left"></i> Back
      </Link>
      <FormContainer>
        <h1 className="text-light text-center">Edit Country</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="continent">
              <Form.Label>Continent</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Continent"
                value={continent}
                onChange={(event) => setContinent(event.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(event) => setImage(event.target.value)}
              ></Form.Control> */}
            {/* <Form.File
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandler} 
              ></Form.File>*/}
            {/* <Form.Control
                type="file"
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandler}
              /> */}
            {uploading && <Loader />}
            {/* </Form.Group> */}

            <Form.Group controlId="rating">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Rating"
                value={rating}
                onChange={(event) => setRating(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="numReviews">
              <Form.Label>No Of Reviews</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter No Of Reviews"
                value={numReviews}
                onChange={(event) => setNumReviews(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </React.Fragment>
  );
};

export default CountryEditScreen;
