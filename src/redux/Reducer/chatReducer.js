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

    case types.SET_CHAT: 
      return {
        ...state,
        chat: payload
      }

    case types.ADD_CHAT: 
      const newChat = [...state.chat, ...payload]
      return {
        ...state,
        chat: newChat
      }

    default:
      return state;
  }
}

export default chat;
