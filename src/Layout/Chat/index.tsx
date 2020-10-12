import React, { useEffect, useState, FormEvent, ChangeEvent } from "react";
import io from "socket.io-client";
import SendIcon from "@material-ui/icons/Send";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import "./index.scss";
import Messages from "./Messages";

const url = "http://localhost:8000";
const socket = io(url);
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3ROYW1lIjoiQWRhZXplIiwibGFzdE5hbWUiOiJzb29uIiwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsInBob25lIjoiMDkwOTg4OTc2NSIsImFjY291bnRUeXBlIjoiY2xpZW50IiwiY3JlYXRlZEF0IjoiMjAyMC0wOS0xMVQwNTo0NzoyMC4wMzFaIiwidXBkYXRlZEF0IjoiMjAyMC0wOS0xMVQwNTo0NzoyMC4wMzFaIiwiaWF0IjoxNTk5ODAzMjUyfQ.YMZUGtv-1bc8VX-g_hfpzFsg3V9ttT4gZTN-0uMZ3Qc";

interface ReturnData {
  newChat: Chat;
  connection: Connection;
}

interface Chat {}

interface Connection {
  id: number;
  chat: Chat[];
}

const Chat = () => {
  const [connectionId, setConnectionId] = useState(0);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]) as any;
  useEffect(() => {
    socket.emit("authenticate", { token });
  }, []);

  useEffect(() => {
    socket.on("success", (data: ReturnData) => {
      setConnectionId(data.connection.id);
    });
  }, [setChat, setConnectionId]);

  useEffect(() => {
    socket.on("conversation", (data: ReturnData) => {
      if (data.connection) {
        setChat(data.connection.chat);
      }
      if (data.newChat) {
        setChat([...chat, data.newChat]);
      }
    });
  }, [chat, setChat]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMessage(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit(`${connectionId}-message`, {
      userId: 2,
      parentId: 1,
      senderName: "Adaeze",
      connectionId,
      message,
    });
  };

  return (
    <div className="chat">
      {chat[0] && <Messages messages={chat} />}
      <div className="chat-form">
        <form  onSubmit={handleSubmit}>
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
