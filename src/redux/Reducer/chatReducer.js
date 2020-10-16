import * as types from "../Types";

const initialState = {};

const chat = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_ADMIN_CONNECTIONS:
      return {
        ...state,
        adminConnections: payload
      }

    case types.ADD_NEW_CHAT:
      const newAdminConnections = state.adminConnections.map(connection => {
        if (connection.id === payload.connectionId) {
          connection.chat.push(payload)
        }
        return connection
      })
      return {
        ...state,
        adminConnections: newAdminConnections
      }

    default:
      return state;
  }
}

export default chat;
