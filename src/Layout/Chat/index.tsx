import React, { useEffect } from "react";
import io from "socket.io-client";

const url = "http://localhost:8000";
const socket = io(url, {
  transportOptions: {
    polling: {
      extraHeaders: {
        authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3ROYW1lIjoiQWRhZXplIiwibGFzdE5hbWUiOiJzb29uIiwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsInBob25lIjoiMDkwOTg4OTc2NSIsImFjY291bnRUeXBlIjoiY2xpZW50IiwiY3JlYXRlZEF0IjoiMjAyMC0wOS0xMVQwNTo0NzoyMC4wMzFaIiwidXBkYXRlZEF0IjoiMjAyMC0wOS0xMVQwNTo0NzoyMC4wMzFaIiwiaWF0IjoxNTk5ODAzMjUyfQ.YMZUGtv-1bc8VX-g_hfpzFsg3V9ttT4gZTN-0uMZ3Qc"
      }
    }
  }
})
const Chat = () => {
  useEffect(() => {
    socket.emit("make-connection");
  }, [])

  return <div></div>;
};

export default Chat;
