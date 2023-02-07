import {
  LIST_TOURS_FAIL,
  LIST_TOURS_REQUEST,
  LIST_TOURS_SUCCESS,
  LIST_TOUR_FAIL,
  LIST_TOUR_REQUEST,
  LIST_TOUR_SUCCESS,
} from "../type";
import axios from "axios";

export const listToursAction = () => async (dispatch) => {
  dispatch({
    type: LIST_TOURS_REQUEST,
  });
  try {
    const { data } = await axios.get("/api/tour");
    dispatch({
      type: LIST_TOURS_SUCCESS,
      payload: data,
    });
    console.log(data);
  } catch (error) {
    dispatch({
      type: LIST_TOURS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listTourAction = (id) => async (dispatch, getState) => {
  dispatch({
    type: LIST_TOUR_REQUEST,
  });
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        token: userInfo.token,
      },
    };
    const { data } = await axios.get(`/api/tour/${id}`);
    dispatch({
      type: LIST_TOUR_SUCCESS,
      payload: data,
    });
    // console.log(data);
  } catch (error) {
    dispatch({
      type: LIST_TOUR_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
