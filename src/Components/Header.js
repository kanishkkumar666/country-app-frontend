import React, { useContext } from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { MyContext } from "./AppContext";
import { SignOut } from "../actions/userActions";

const Header = ({ history }) => {
  const { countryName, setCountryName } = useContext(MyContext);

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userSignIn);

  const signOutHandler = () => {
    window.alert("Are you sure...!");
    dispatch(SignOut());
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // if(countryName.trim()){
    if (countryName) {
      history.push(`/name/${countryName.toLowerCase()}`);
    } else {
      history.push("/");
    }
  };

  return (
    <React.Fragment>
      <header>
        <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>
                <i className="fa fa-home"></i>
              </Navbar.Brand>
            </LinkContainer>
            <Navbar.Brand>Country App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar" />
            <Form onSubmit={submitHandler} className="d-flex">
              <FormControl
                type="text"
                placeholder="Country Name"
                name="countryName"
                // value={countryName}
                className="mr-sm-2 ml-sm-5"
                aria-label="Search"
                onChange={(event) => setCountryName(event.target.value)}
              />
              <Button className="btn btn-dark" type="submit">
                <i className="fa fa-search"></i>
                Search
              </Button>
            </Form>
            <Navbar.Collapse id="basic-navbar">
              <Nav className="ms-auto">
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title="Continent"
                  menuVariant="dark"
                >
                  <LinkContainer to="/continent/asia/">
                    <NavDropdown.Item>Asia</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/continent/africa">
                    <NavDropdown.Item>Africa</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/continent/europe">
                    <NavDropdown.Item>Europe</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/continent/north america">
                    <NavDropdown.Item>North America</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/continent/south america">
                    <NavDropdown.Item>South America</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/continent/australia-oceania">
                    <NavDropdown.Item>Australia/Oceania</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/continent/antarctica">
                    <NavDropdown.Item>Antarctica</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>

                {userInfo ? (
                  <Nav>
                    <NavDropdown menuVariant="dark" title={userInfo.name}>
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>
                          <i className="fas fa-user-tie"></i> Profile
                        </NavDropdown.Item>
                      </LinkContainer>
                      {userInfo && userInfo.isAdmin && (
                        <NavDropdown
                          menuVariant="dark"
                          title="Admin"
                          id="adminmenu"
                        >
                          <LinkContainer to="/userlist">
                            <NavDropdown.Item>Users List</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to="/admin/countrylist">
                            <NavDropdown.Item>Country List</NavDropdown.Item>
                          </LinkContainer>
                        </NavDropdown>
                      )}
                    </NavDropdown>
                    <Nav.Link onClick={signOutHandler}>
                      {/* <i className="fas fa-user-tie"></i> SIGN OUT */}
                    </Nav.Link>
                  </Nav>
                ) : (
                  <Nav>
                    {/* <LinkContainer to="/signin">
                      <Nav.Link>
                        <i className="fas fa-user-tie"></i> SIGN IN
                      </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/signup">
                      <Nav.Link>
                        <i className="fas fa-user-tie"></i> SIGN UP
                      </Nav.Link>
                    </LinkContainer> */}
                  </Nav>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </React.Fragment>
  );
};

export default Header;
