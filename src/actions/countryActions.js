import axios from "axios";
import {
  COUNTRY_DETAILS_FAIL,
  COUNTRY_DETAILS_REQUEST,
  COUNTRY_DETAILS_SUCCESS,
  COUNTRY_LIST_FAIL,
  COUNTRY_LIST_REQUEST,
  COUNTRY_LIST_SUCCESS,
  COUNTRY_DELETE_SUCCESS,
  COUNTRY_DELETE_REQUEST,
  COUNTRY_DELETE_FAIL,
  COUNTRY_CREATE_REQUEST,
  COUNTRY_CREATE_SUCCESS,
  COUNTRY_CREATE_FAIL,
  COUNTRY_UPDATE_REQUEST,
  COUNTRY_UPDATE_SUCCESS,
  COUNTRY_UPDATE_FAIL,
} from "../constants/countryConstants";

// export const listCountrys = () => async (dispatch) => {
//   try {
//     dispatch({ type: COUNTRY_LIST_REQUEST });

//     const { data } = await axios.get("api/country");
//     dispatch({
//       type: COUNTRY_LIST_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: COUNTRY_LIST_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

export const listCountrys =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: COUNTRY_LIST_REQUEST });
      const { data } = await axios.get(
        `https://countrys-app.herokuapp.com/api/country?keyword=${keyword}&pageNumber=${pageNumber}`
      );
      dispatch({
        type: COUNTRY_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: COUNTRY_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listCountryDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: COUNTRY_DETAILS_REQUEST });
    const { data } = await axios.get(`https://countrys-app.herokuapp.com/api/country/${id}`);
    dispatch({
      type: COUNTRY_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COUNTRY_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCountry = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COUNTRY_DELETE_REQUEST,
    });

    const {
      userSignIn: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`https://countrys-app.herokuapp.com/api/country/${id}`, config);

    dispatch({
      type: COUNTRY_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: COUNTRY_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createCountry = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: COUNTRY_CREATE_REQUEST,
    });

    const {
      userSignIn: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`https://countrys-app.herokuapp.com/api/country`, {}, config);

    dispatch({
      type: COUNTRY_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COUNTRY_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCountry = (country) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COUNTRY_UPDATE_REQUEST,
    });

    const {
      userSignIn: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `https://countrys-app.herokuapp.com/api/country/${country._id}`,
      country,
      config
    );

    dispatch({
      type: COUNTRY_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COUNTRY_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
