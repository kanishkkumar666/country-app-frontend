import React, { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.userDetails);
  const { success } = useSelector((state) => state.userUpdateProfile);
  const { userInfo } = useSelector((state) => state.userSignIn);

  useEffect(() => {
    if (!userInfo) {
      history.push("/signin");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, dispatch, userInfo, user]);

  const submitHandler = (event) => {
    event.preventDefault();
    window.alert("Are you sure...!");
    dispatch(updateUserProfile({ id: user._id, name, email, password }));
  };

  return (
    <React.Fragment>
      <Container>
        <h2 className="text-light text-center">User Profile</h2>
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email">
            <Form.Label className="text-light">Name:-</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label className="text-light">Email:-</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label className="text-light">Password:-</Form.Label>
            <Form.Control
              type={"password"}
              placeholder="Enter Password"
              aria-label="password"
              aria-describedby="basic-addon2"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>
          <Button
            type="submit"
            className="mt-2"
            variant="primary"
            disabled={loading}
          >
            Update
          </Button>
        </Form>
      </Container>
    </React.Fragment>
  );
};

export default ProfileScreen;
