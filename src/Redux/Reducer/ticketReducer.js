import * as types from "../Types";

const initialState = {};

const ticket = (state = initialState, {type, payload}) => {
  switch (type) {
    case types.GET_ALL_TICKETS:
      return {
        ...state,
        tickets: payload
      }
    default:
      return state;
  }
}

export default ticket;
