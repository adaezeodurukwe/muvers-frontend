import * as types from "../Types";

const initialState = {
  loggedIn: !!(localStorage.moovers_token),
};

const auth = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.CREATE_USER_WITH_TICKET:
      return {
        ...state,
        createdUser: payload,
        userCreated: true
      }

    case types.CLEAR_USER_CREATION_SUCCESS:
      return {
        ...state,
        userCreated: false
      }

    case types.LOG_IN:
    localStorage.setItem("moovers_token", payload.token)
    localStorage.setItem("moovers_isAdmin", payload.user.accountType === "client" ? false : true)
      return {
        ...state,
        user: payload,
        loggedIn: true
      }
    case types.GET_USER:
        return {
          ...state,
          user: payload
        }
    default:
      return state;
  }
}

export default auth;
