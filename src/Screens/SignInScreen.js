import React, { useCallback, useEffect, useState } from "react";
import { Form, Button, InputGroup, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import FormContainer from "../Components/FormContainer";
import { SignIn } from "../actions/userActions";
import Loader from "../Components/Loader";
import Message from "../Components/Message";

const SignInScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, userInfo } = useSelector((state) => state.userSignIn);

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(SignIn(email, password));
    },
    [dispatch, email, password]
  );

  return (
    <React.Fragment>
      <FormContainer>
        <h1 className="text-light">Sign In</h1>
        {error && <Message varient="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
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
            <InputGroup className="mb-3">
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Password"
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
          <Button type="submit" variant="primary" disabled={loading}>
            Sign In
          </Button>
        </Form>
      </FormContainer>
    </React.Fragment>
  );
};

export default SignInScreen;
