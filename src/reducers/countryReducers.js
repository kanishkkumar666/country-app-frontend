import {
  COUNTRY_DETAILS_FAIL,
  COUNTRY_DETAILS_REQUEST,
  COUNTRY_DETAILS_SUCCESS,
  COUNTRY_LIST_FAIL,
  COUNTRY_LIST_REQUEST,
  COUNTRY_LIST_SUCCESS,
  COUNTRY_DELETE_REQUEST,
  COUNTRY_DELETE_SUCCESS,
  COUNTRY_DELETE_FAIL,
  COUNTRY_CREATE_RESET,
  COUNTRY_CREATE_FAIL,
  COUNTRY_CREATE_SUCCESS,
  COUNTRY_CREATE_REQUEST,
  COUNTRY_UPDATE_REQUEST,
  COUNTRY_UPDATE_SUCCESS,
  COUNTRY_UPDATE_FAIL,
  COUNTRY_UPDATE_RESET,
} from "../constants/countryConstants";

export const countryListReducer = (state = { countrys: [] }, action) => {
  switch (action.type) {
    case COUNTRY_LIST_REQUEST:
      return { loading: true, countrys: [] };
    case COUNTRY_LIST_SUCCESS:
      return { loading: false, countrys: action.payload };
    case COUNTRY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const countryDetailsReducer = (
  state = { country: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case COUNTRY_DETAILS_REQUEST:
      return { ...state, loading: true };
    case COUNTRY_DETAILS_SUCCESS:
      return { loading: false, country: action.payload };
    case COUNTRY_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const countryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case COUNTRY_DELETE_REQUEST:
      return { loading: true };
    case COUNTRY_DELETE_SUCCESS:
      return { loading: false, success: true };
    case COUNTRY_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const countryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case COUNTRY_CREATE_REQUEST:
      return { loading: true };
    case COUNTRY_CREATE_SUCCESS:
      return { loading: false, success: true, country: action.payload };
    case COUNTRY_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case COUNTRY_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const countryUpdateReducer = (state = { country: {} }, action) => {
  switch (action.type) {
    case COUNTRY_UPDATE_REQUEST:
      return { loading: true };
    case COUNTRY_UPDATE_SUCCESS:
      return { loading: false, success: true, country: action.payload };
    case COUNTRY_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case COUNTRY_UPDATE_RESET:
      return { country: {} };
    default:
      return state;
  }
};
