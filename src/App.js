import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { MyContext } from "./Components/AppContext";
import Header from "./Components/Header";
import HomeScreen from "./Screens/HomeScreen";
import CountryScreen from "./Screens/CountryScreen";
import Continent from "./Screens/Continent";
import SearchResult from "./Screens/SearchResults";
import SignInScreen from "./Screens/SignInScreen";
import SignUpScreen from "./Screens/SignUpScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import AboutUsScreen from "./Screens/AboutUsScreen";
import CountryListScreen from "./Screens/CountryListScreen";
import CountryEditScreen from "./Screens/CountryEditScreen";
import UserListScreen from "./Screens/UserListScreen";
import Footer from "./Components/Footer";

const App = () => {
  const [countryName, setCountryName] = useState({ countryName: "" });

  return (
    <React.Fragment>
      <MyContext.Provider value={{ countryName, setCountryName }}>
        <Router>
          <Route render={({ history }) => <Header history={history} />} />
          <main className="py-3 bg-dark">
            <Container>
              <Route path="/" component={HomeScreen} exact />
              <Route path="/country/:id" component={CountryScreen} />
              <Route path="/continent/:continent" component={Continent} />
              <Route path="/name/:name" component={SearchResult} />
              <Route path="/signin" component={SignInScreen} />
              <Route path="/signup" component={SignUpScreen} />
              <Route path="/profile" component={ProfileScreen} />
              <Route path="/aboutus" component={AboutUsScreen} />
              <Route path="/admin/countrylist" component={CountryListScreen} />
              {/* <Route
                path="/admin/countrylist/:pageNumber"
                component={CountryListScreen}
              /> */}
              <Route
                path="/admin/country/:id/edit"
                component={CountryEditScreen}
              />
              <Route path="/userList" component={UserListScreen} />
              {/* <Route
                path="/admin/user/:pageNumber"
                component={UserEditScreen}
              /> */}
            </Container>
          </main>
          <Footer />
        </Router>
      </MyContext.Provider>
    </React.Fragment>
  );
};

export default App;
