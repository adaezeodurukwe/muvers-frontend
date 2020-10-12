import * as types from "../Types";

const initialState = {};

const auth = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.CREATE_USER_WITH_TICKET:
      return {
        ...state,
        createdUser: payload
      }

    case types.LOG_IN:
      return {
        ...state,
        user: payload
      }

    default:
      return state;
  }
}

export default auth;
