import * as types from "../Types";

const initialState = {};

const error = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.ERROR:
      return {
        ...state,
        error: payload
      }

    default:
      return state;
  }
}

export default error;
