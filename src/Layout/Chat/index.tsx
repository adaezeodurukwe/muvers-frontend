import React, { useEffect, useState, FormEvent, ChangeEvent } from "react";
import io from "socket.io-client";
import SendIcon from '@material-ui/icons/Send';
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import "./index.scss"

const url = "http://localhost:8000";
const socket = io(url);
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3ROYW1lIjoiQWRhZXplIiwibGFzdE5hbWUiOiJzb29uIiwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsInBob25lIjoiMDkwOTg4OTc2NSIsImFjY291bnRUeXBlIjoiY2xpZW50IiwiY3JlYXRlZEF0IjoiMjAyMC0wOS0xMVQwNTo0NzoyMC4wMzFaIiwidXBkYXRlZEF0IjoiMjAyMC0wOS0xMVQwNTo0NzoyMC4wMzFaIiwiaWF0IjoxNTk5ODAzMjUyfQ.YMZUGtv-1bc8VX-g_hfpzFsg3V9ttT4gZTN-0uMZ3Qc";

const Chat = () => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    socket.emit("authenticate", { token });
  }, []);

  useEffect(() => {}, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMessage(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="chat">
      <form className="chat-form" onSubmit={handleSubmit}>
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
  );
};

export default Chat;
