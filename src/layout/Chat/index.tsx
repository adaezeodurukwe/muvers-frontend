import React, { useEffect, useState, FormEvent, ChangeEvent } from "react";
import SendIcon from "@material-ui/icons/Send";
import io from "socket.io-client";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import Messages from "./Messages";
import { addChat, getUser, setChat } from "../../redux/Actions";
import { ChatReturnData } from "../../models";
import "./index.scss";

// const url = "http://localhost:8000";
const url = "https://muvers-backend.herokuapp.com/";
const socket = io(url);
const token = localStorage.getItem("moovers_token");

const Chat = () => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(0);
  const [senderName, setSenderName] = useState(0);
  const [connectionId, setConnectionId] = useState(0);
  const [message, setMessage] = useState("");
  const { user, loggedIn } = useSelector((store: RootStateOrAny) => store.auth);
  const { chat } = useSelector((store: RootStateOrAny) => store.chat);

  useEffect(() => {
    if (user) {
      setUserId(user.id);
      setSenderName(user.email);
      socket.emit("authenticate", { token });
    }
  }, [user]);

  useEffect(() => {
    if (loggedIn) {
      dispatch(getUser());
    }
  }, [dispatch, loggedIn]);

  useEffect(() => {
    socket.on("success", (data: ChatReturnData) => {
      setConnectionId(data.connection.id);
      dispatch(setChat(data.connection.chat));
    });
  }, [dispatch, setConnectionId]);

  useEffect(() => {
    socket.on("conversation", (data: ChatReturnData) => {
      if (data.newChat) {
        setMessage("");
        dispatch(addChat([data.newChat]));
      }
    });
  }, [dispatch]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMessage(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit(`${connectionId}-message`, {
      userId,
      parentId: 1,
      senderName,
      connectionId,
      message,
    });
  };

  return (
    <div className="chat">
      {chat && chat[0] && <Messages messages={chat} />}
      <div className="chat-form">
        <form onSubmit={handleSubmit}>
          <TextField
            label="Enter text"
            onChange={handleInputChange}
            required
            className="ml-3"
            value={message}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit">
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default Chat;
