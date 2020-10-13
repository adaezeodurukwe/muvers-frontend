import axios from "axios";
import { handleError } from "../../utils";
import * as types from "../Types";

export const createUser = (data) => async dispatch => {
  try {
    const res = await axios.post("/user", data);
    dispatch({
      type: types.CREATE_USER_WITH_TICKET,
      payload: res.data
    })
  } catch (error) {
    handleError(error)
  }
}

export const login = (data) => async dispatch => {
  try {
    const res = await axios.post("/login", data);
    console.log(res);
    localStorage.setItem("moovers_token", res.data.data.token)
    dispatch({
      type: types.LOG_IN,
      payload: res.data
    })
  } catch (error) {
    handleError(error)
  }
}

export const getUserTickets = () => async dispatch => {
  try {
    const res = await axios.get("/tickets");
    console.log(res);
    dispatch({
      type: types.GET_USER_TICKETS,
      payload: res.data.data
    })
  } catch (error) {
    handleError(error)
  }
}

export const getAllTickets = () => async dispatch => {
  try {
    const res = await axios.get("/admin/tickets");
    console.log(res);
    dispatch({
      type: types.GET_ALL_TICKETS,
      payload: res.data.data
    })
  } catch (error) {
    dispatch({
      type: types.ERROR,
      payload: error.response.data
    })
  }
}