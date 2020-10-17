import * as types from "../Types";

const initialState = {
  allTickets: []
};

const ticket = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_USER_TICKETS:
      return {
        ...state,
        tickets: payload
      }

    case types.GET_ALL_TICKETS:
      return {
        ...state,
        allTickets: payload
      }

    case types.CREATE_TICKET:
      const ticketsClone = [...state.tickets];
      ticketsClone.push(payload);
      
      return {
        ...state,
        tickets: ticketsClone
      }

      case types.ADMIN_UPDATE_TICKET:
        const tickets = state.allTickets.map(ticket => {
          if (ticket.id === payload[0].id) {
            
            return payload[0]
          } else {
            return ticket
          }
        })
      return {
        ...state,
        allTickets: tickets
      }

      case types.UPDATE_TICKET:
        const ticketlist = state.tickets.map(ticket => {
          if (ticket.id === payload[0].id) {
            
            return payload[0]
          } else {
            return ticket
          }
        })
      return {
        ...state,
        tickets: ticketlist
      }
    
    default:
      return state;
  }
}

export default ticket;
