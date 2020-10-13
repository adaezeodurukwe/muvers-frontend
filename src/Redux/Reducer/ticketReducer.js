import * as types from "../Types";

const initialState = {
  allTickets: []
};

const ticket = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_USER_TICKETS:
      console.log("lol")
      return {
        ...state,
        tickets: payload
      }

    case types.GET_ALL_TICKETS:
      console.log("here")
      return {
        ...state,
        allTickets: payload
      }
    
    default:
      return state;
  }
}

export default ticket;
