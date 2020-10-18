import React, { ChangeEvent, useState } from "react";
import {
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@material-ui/core";
import DialogWrapper from "../../../components/DialogWrapper";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/Actions";
import "../SignUp/index.scss";

const SignIn = ({ handleClose, open }) => {
  const dispatch = useDispatch();
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const handleDetails = ({ target: { value, name } }) => {
    const newValue = {};
    newValue[name] = value;
    setDetails({ ...details, ...newValue });
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(details));
  };

  return (
    <DialogWrapper title="Sign In" handleClose={handleClose} open={open}>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <div className="d-flex flex-column">
            <TextField
              label="email"
              value={details.email}
              onChange={handleDetails}
              name="email"
              className="mb-2"
              required
            />
            <TextField
              label="Password"
              value={details.password}
              onChange={handleDetails}
              name="password"
              className="mb-2"
              type="password"
              required
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="secondary" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </form>
    </DialogWrapper>
  );
};

export default SignIn;
