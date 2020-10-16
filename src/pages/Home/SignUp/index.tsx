import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import clsx from "clsx";
import { DialogContent, DialogActions, Button, TextField } from '@material-ui/core'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import DialogWrapper from '../DialogBox.js/index.js';
import { createUser } from '../../../redux/Actions/index.js';
import "./index.scss";


const SignUP = ({ handleClose, open }) => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    plan: ""
  })
  const [stage, setStage] = useState(1);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const getTitle = () => {
    let title;
    if (stage === 1) {
      title = "Select Preferred Date and time"
    }
    if (stage === 2) {
      title = "Select plan"
    }
    if (stage === 3) {
      title = "Enter Details"
    }
    return title;
  }

  const handleDetails = ({ target: { value, name } }) => {
    const newValue = {}
    newValue[name] = value
    setDetails({ ...details, ...newValue })
  }

  const handleNextState = () => {
    setStage(stage + 1)
  }

  const handlePrevState = () => {
    setStage(stage - 1)
  }

  const handleSubmit = () => {
    console.log(details, selectedDate);
    dispatch(createUser({ ...details, time: selectedDate }))
  }

  return (
    <DialogWrapper title={getTitle()} handleClose={handleClose} open={open}>
      <DialogContent>
        {stage === 1 && <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className="d-flex justify-content-between align-items-center">
              <KeyboardDatePicker
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Select Move Date"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                variant="inline"
                id="time-picker"
                label="Select Preferred Time"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
            </div>
          </MuiPickersUtilsProvider>
        </div>}
        {stage === 2 && <div className="radio-container">
          <p>Payment after service</p>
          <div className="d-flex align-items-center">
            <label
              className={clsx("w-100 mx-1 border rounded px-2 py-4", { "isActive": details.plan === "plan1" })}
              htmlFor="plan1">
              <input
                onChange={handleDetails}
                name="plan"
                value="plan1"
                className="d-none"
                id="plan1"
                type="radio" />
            1-2 rooms
          </label>

            <label className={clsx("w-100 mx-1 border rounded px-2 py-4", { "isActive": details.plan === "plan2" })} htmlFor="plan2">
              <input onChange={handleDetails} name="plan" value="plan2" className="d-none" id="plan2" type="radio" />
            3-4 rooms
          </label>

            <label className={clsx("w-100 mx-1 border rounded px-2 py-4", { "isActive": details.plan === "plan3" })} htmlFor="plan3">
              <input onChange={handleDetails} name="plan" value="plan3" className="d-none" id="plan3" type="radio" />
            more than 4 rooms
          </label>
          </div>

        </div>}
        {stage === 3 && <div className="d-flex flex-column">
          <TextField
            label="First Name"
            value={details.firstName}
            onChange={handleDetails}
            name="firstName"
            className="mb-2"
          />
          <TextField
            label="Last Name"
            value={details.lastName}
            onChange={handleDetails}
            name="lastName"
            className="mb-2"
          />
          <TextField
            label="Phone Number"
            value={details.phone}
            onChange={handleDetails}
            name="phone"
            className="mb-2"
          />
          <TextField
            label="email"
            value={details.email}
            onChange={handleDetails}
            name="email"
            className="mb-2"
          />
          <TextField
            label="set Password"
            type="password"
            value={details.password}
            onChange={handleDetails}
            name="password"
            className="mb-2"
          />
        </div>}

      </DialogContent>
      <DialogActions>
        {stage > 1 && stage <= 3 && <Button onClick={handlePrevState}>Prev</Button>}
        {stage < 3 && <Button onClick={handleNextState}>Next</Button>}
        {stage === 3 && <Button onClick={handleSubmit} color="secondary" variant="contained">Submit</Button>}
      </DialogActions>
    </DialogWrapper>
  )
}

export default SignUP
