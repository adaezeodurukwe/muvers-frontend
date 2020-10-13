import { combineReducers } from "redux";
import auth from "./authReducer";
import ticket from "./ticketReducer";
import error from "./errorReducer";

const roorReducer = combineReducers({
  auth,
  ticket,
  error
})

export default roorReducer