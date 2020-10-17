import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";
import io from "socket.io-client";
import { Send as SendIcon } from "@material-ui/icons";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import { ChatReturnData, Connection } from "../../../models";
import {
  addNewChat,
  getUser,
  setAdminConnections,
} from "../../../redux/Actions";

// const url = "http://localhost:8000";
const url = "https://muvers-backend.herokuapp.com/";
const socket = io(url);
const token = localStorage.getItem("moovers_token");

const Chat = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState([]) as any;
  const [connectionId, setConnectionId] = useState(0);
  const { adminConnections } = useSelector(
    (store: RootStateOrAny) => store.chat
  );
  const { user } = useSelector((store: RootStateOrAny) => store.auth);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    socket.emit("authenticate", { token });
  }, []);

  useEffect(() => {
    socket.on("conversation", (data: ChatReturnData) => {
      if (data.newChat) {
        const messageCopy = [...message];
        messageCopy[data.newChat.connectionId] = "";
        setMessage(messageCopy);
        dispatch(addNewChat(data.newChat));
      }
    });
  }, [dispatch, setMessage]);

  useEffect(() => {
    socket.on("admin_connections", (data: any) => {
      dispatch(setAdminConnections(data));
    });
  }, [dispatch]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: number
  ) => {
    setConnectionId(id);
    const newMessage = [...message];
    const { value } = e.target;
    newMessage[id] = value;
    setMessage(newMessage);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit(`${connectionId}-message`, {
      userId: user.id,
      parentId: 1,
      senderName: "Admin",
      connectionId,
      message: message[connectionId],
    });
  };
  const getChats = () => {
    if (!adminConnections || !adminConnections[0]) {
      return <div>No Messages</div>;
    }
    return adminConnections.map((connection: Connection, index: number) => {
      return (
        <Card className="w-30" key={index.toString()}>
          <CardHeader
            title={`${connection.user.firstName} ${connection.user.lastName}`}
          />

          <CardContent className="admin-chatbox">
            <ScrollToBottom>
              {connection.chat.map((chat) => (
                <div
                  className={user?.id === chat.userId ? "sent" : "recieved"}
                  key={chat.id}
                >
                  {chat.message}
                </div>
              ))}
            </ScrollToBottom>
          </CardContent>

          <CardActions>
            <form className="w-100" onSubmit={handleSubmit}>
              <TextField
                label="Enter text"
                onChange={(e) => handleInputChange(e, connection.id)}
                required
                className="w-100 ml-0"
                value={message[connection.id]}
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
          </CardActions>
        </Card>
      );
    });
  };

  return (
    <div>
      <h3 className="mb-3">Messages</h3>
      <span className="d-flex flex-wrap">{getChats()}</span>
    </div>
  );
};

export default Chat;
