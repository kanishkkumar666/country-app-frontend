import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  countryListReducer,
  countryDetailsReducer,
  countryDeleteReducer,
  countryCreateReducer,
  countryUpdateReducer,
} from "./reducers/countryReducers";
import {
  userSignInReducer,
  userSignUpReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  usersListReducer,
  userDeleteReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
  countryList: countryListReducer,
  countryDetails: countryDetailsReducer,
  userSignIn: userSignInReducer,
  userSignUp: userSignUpReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userDetails: userDetailsReducer,
  countryDelete: countryDeleteReducer,
  countryCreate: countryCreateReducer,
  countryUpdate: countryUpdateReducer,
  userDelete: userDeleteReducer,
  usersList: usersListReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userSignIn: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
