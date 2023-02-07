import {
  LIST_TOURS_FAIL,
  LIST_TOURS_REQUEST,
  LIST_TOURS_SUCCESS,
  LIST_TOUR_FAIL,
  LIST_TOUR_REQUEST,
  LIST_TOUR_SUCCESS,
} from "../type";
const initialState = {};

export const listToursReducer = (state = { tours: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case LIST_TOURS_REQUEST:
      return {
        loading: true,
      };
    case LIST_TOURS_SUCCESS:
      return {
        loading: false,
        tours: payload,
      };
    case LIST_TOURS_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
export const listTourReducer = (state = { tour: {} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case LIST_TOUR_REQUEST:
      return {
        loading: true,
      };
    case LIST_TOUR_SUCCESS:
      return {
        loading: false,
        tour: payload,
      };
    case LIST_TOUR_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
