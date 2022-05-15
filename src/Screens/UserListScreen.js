import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Table } from "react-bootstrap";
// import { LinkContainer } from "react-router-bootstrap";

import { listUsers, deleteUser } from "../actions/userActions";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import Paginate from "../Components/Paginate";
// import { USER_CREATE_RESET } from "../constants/userConstants";

const UserListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const usersList = useSelector((state) => state.usersList);
  const { loading, error, users, page, pages } = usersList;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  useEffect(() => {
    // dispatch({ type: USER_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      history.push("/signin");
    }
    if (successDelete) {
      history.push(`/userList`);
    } else {
      dispatch(listUsers("", pageNumber));
    }
  }, [dispatch, history, userInfo, successDelete, pageNumber]);

  const deleteHandler = (id) => {
    alert("Are You Sure...!");
    dispatch(deleteUser(id));
    window.location = "/userList";
  };
  
  return (
    <React.Fragment>
      <Row>
        <Col>
          <h1 className="text-center text-light">USERS</h1>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
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
                <th>EMAIL</th>
                {/* <th>IS ADMIN</th> */}
                <th>CREATED DATE</th>
                <th>UPDATED DATE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  {/* <td>{user.isAdmin}</td> */}
                  <td>{user.createdAt}</td>
                  <td>{user.updatedAt}</td>
                  <td>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(user._id)}
                    >
                      <i className="fas fa-trash"></i>DELETE
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

export default UserListScreen;
