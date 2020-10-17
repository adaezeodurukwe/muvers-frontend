import axios from "axios";
import * as types from "../Types";

export const setAdminConnections = (data) => async dispatch => {
  dispatch({
    type: types.SET_ADMIN_CONNECTIONS,
    payload: data.connections
  })
}

export const addNewChat = (newChat) => dispatch => {
  dispatch({
    type: types.ADD_NEW_CHAT,
    payload: newChat
  })
}

export const clearSuccess = () => dispatch => {
  dispatch({
    type: types.CLEAR_USER_CREATION_SUCCESS
  })
}

export const createUser = (data) => async dispatch => {
  try {
    const res = await axios.post("/user", data);
    dispatch({
      type: types.CREATE_USER_WITH_TICKET,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: types.ERROR,
      payload: error.response.data
    })
  }
}

export const getUser = () => async dispatch => {
  try {
    const res = await axios.get("/currentUser");
    dispatch({
      type: types.GET_USER,
      payload: res.data.data
    })
  } catch (error) {
    dispatch({
      type: types.ERROR,
      payload: error.response.data
    })
  }
}

export const login = (data) => async dispatch => {
  try {
    const res = await axios.post("/login", data);
    dispatch({
      type: types.LOG_IN,
      payload: res.data.data
    })
    window.location.replace("/tickets")
  } catch (error) {
    dispatch({
      type: types.ERROR,
      payload: error.response.data
    })
  }
}

export const getUserTickets = () => async dispatch => {
  try {
    const res = await axios.get("/tickets");
    dispatch({
      type: types.GET_USER_TICKETS,
      payload: res.data.data
    })
  } catch (error) {
    dispatch({
      type: types.ERROR,
      payload: error.response.data
    })
  }
}

export const getAllTickets = () => async dispatch => {
  try {
    const res = await axios.get("/admin/tickets");
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

export const createTicket = (data, callback) => async dispatch => {
  try {
    const res = await axios.post("/ticket", data);
    dispatch({
      type: types.CREATE_TICKET,
      payload: res.data.data
    })
    callback();
  } catch (error) {
    dispatch({
      type: types.ERROR,
      payload: error.response.data
    })
  }
}

export const updateTicket = (data, id, callback, isAdmin) => async dispatch => {
  const url = isAdmin ? `admin/ticket/${id}` : `/ticket/${id}`
  const type = isAdmin ? types.ADMIN_UPDATE_TICKET : types.UPDATE_TICKET

  try {
    const res = await axios.put(url, data);
    dispatch({
      type,
      payload: res.data.data
    })
    callback();
  } catch (error) {
    console.log({ error });
    dispatch({
      type: types.ERROR,
      payload: error.response.data
    })
  }
}