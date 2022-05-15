import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import {
  listCountrys,
  deleteCountry,
  createCountry,
} from "../actions/countryActions";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import Paginate from "../Components/Paginate";
import { COUNTRY_CREATE_RESET } from "../constants/countryConstants";

const CountryListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const countryList = useSelector((state) => state.countryList);
  const { loading, error, countrys, page, pages } = countryList;

  const countryDelete = useSelector((state) => state.countryDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = countryDelete;

  const countryCreate = useSelector((state) => state.countryCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    country: createdCountry,
  } = countryCreate;

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  useEffect(() => {
    dispatch({ type: COUNTRY_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      history.push("/signin");
    }

    if (successCreate) {
      history.push(`/admin/country/${createdCountry._id}/edit`);
    } else {
      dispatch(listCountrys("", pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdCountry,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure...!")) {
      dispatch(deleteCountry(id));
    }
  };

  const createCountryHandler = () => {
    dispatch(createCountry());
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <h1 className="text-center text-light">COUNTRY</h1>
        </Col>
        </Row><Row>
        <Col className="text-right">
          <Button className="my-3" onClick={createCountryHandler}>
            <i className="fas fa-plus"></i> CREATE PRODUCT
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table className="table-sm text-light text-center">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>CONTINENT</th>
                <th>RATING</th>
                <th>REVIEWS</th>
                <th>DESCRIPTION</th>
                <th>CREATED AT</th>
                <th>UPDATED AT</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {countrys.map((country) => (
                <tr key={country._id}>
                  <td>{country._id}</td>
                  <td>{country.name}</td>
                  <td>{country.continent}</td>
                  <td>{country.rating}</td>
                  <td>{country.numReviews}</td>
                  <td>{country.description}</td>
                  <td>{country.createdAt}</td>
                  <td>{country.updatedAt}</td>
                  <td>
                    <LinkContainer to={`/admin/country/${country._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i> EDIT
                      </Button>
                    </LinkContainer>
                    <br></br>
                    <br></br>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(country._id)}
                    >
                      <i className="fas fa-trash"></i> DELETE
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </React.Fragment>
  );
};

export default CountryListScreen;
