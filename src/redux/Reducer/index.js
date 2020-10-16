import { combineReducers } from "redux";
import auth from "./authReducer";
import ticket from "./ticketReducer";
import error from "./errorReducer";
import chat from "./chatReducer";

const roorReducer = combineReducers({
  auth,
  ticket,
  error,
  chat
})

export default roorReducer