import { combineReducers } from "redux";
import auth from "./authReducer";
import ticket from "./ticketReducer";

const roorReducer = combineReducers({
  auth,
  ticket
})

export default roorReducer