import React, { useState } from 'react';
import { DialogContent, DialogActions, Button, TextField } from '@material-ui/core';
import DialogWrapper from '../DialogBox.js/index.js';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/Actions/index.js';
import "../SignUp/index.scss";
import { useHistory } from 'react-router-dom';

const SignIn = ({ handleClose, open }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [details, setDetails] = useState({
    email: "",
    password: "",
  })

  const redirect = () => {
    history.push("/tickets")
  }

  const handleDetails = ({ target: { value, name } }) => {
    const newValue = {}
    newValue[name] = value
    setDetails({ ...details, ...newValue })
  }

  const handleSubmit = () => {
    console.log(details);
    dispatch(login(details, redirect));
  }

  return (
    <DialogWrapper title="Sign In" handleClose={handleClose} open={open}>
      <DialogContent>
        <div className="d-flex flex-column">
          <TextField
            label="email"
            value={details.email}
            onChange={handleDetails}
            name="email"
            className="mb-2"
          />
          <TextField
            label="Password"
            value={details.password}
            onChange={handleDetails}
            name="password"
            className="mb-2"
            type="password"
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="secondary" variant="contained">Submit</Button>
      </DialogActions>
    </DialogWrapper>
  )
}

export default SignIn
