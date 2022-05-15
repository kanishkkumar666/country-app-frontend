import React, { useCallback, useEffect, useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import FormContainer from "../Components/FormContainer";
import { SignUp } from "../actions/userActions";
import Loader from "../Components/Loader";
import Message from "../Components/Message";

const SignUpScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const { loading, error, userInfo } = useSelector((state) => state.userSignUp);

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = useCallback(
    (event) => {
      event.preventDefault();
      if (password !== confirmPassword) {
        setMessage("Password do not Match...!");
      } else {
        window.alert("Are you sure...!");
        dispatch(SignUp(name, email, password));
      }
    },
    [dispatch, email, password, name, confirmPassword]
  );
  return (
    <React.Fragment>
      <FormContainer>
        <h1 className="text-light">Sign Up</h1>
        {error && <Message variant="danger">{error}</Message>}
        {message && <Message variant="danger">{message}</Message>}
        {loading && <Loader />}
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
              vlaue={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label className="text-light">Password:-</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="password"
                aria-label="password"
                aria-describedby="basic-addon2"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <Button
                variant="outline-secondary"
                id="button-addon2"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i
                  className={showPassword ? "fas fa-eye-slash" : "far fa-eye"}
                ></i>
              </Button>
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label className="text-light">Confirm Password:-</Form.Label>
            <Form.Control
              type={"password"}
              placeholder="confirm password"
              aria-label="password"
              aria-describedby="basic-addon2"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </Form.Group>
          <Button
            type="submit"
            className="mt-2"
            variant="primary"
            disabled={loading}
          >
            Sign Up
          </Button>
        </Form>
      </FormContainer>
    </React.Fragment>
  );
};

export default SignUpScreen;
