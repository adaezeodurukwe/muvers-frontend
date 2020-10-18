import * as types from "../Types";

const initialState = {
  chat: []
};

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
      let newChat;
      if (state.chat && state.chat[0]) {
        newChat = [...state.chat, ...payload]
      } else {
        newChat = payload
      }
      return {
        ...state,
        chat: newChat
      }

    default:
      return state;
  }
}

export default chat;
