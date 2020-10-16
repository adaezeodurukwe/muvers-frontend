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
import DialogWrapper from '../../../components/DialogWrapper';
import { createTicket } from '../../../redux/Actions/index.js';
import "../../Home/index.scss";


const CreateTicket = ({ handleClose, open }) => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [details, setDetails] = useState({
    note: "",
    plan: ""
  })

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleDetails = ({ target: { value, name } }) => {
    const newValue = {}
    newValue[name] = value
    setDetails({ ...details, ...newValue })
  }

  const handleSubmit = () => {
    console.log(details, selectedDate);
    dispatch(createTicket({ ...details, time: selectedDate }, handleClose))
  }

  return (
    <DialogWrapper title="Create Ticket" handleClose={handleClose} open={open}>
      <DialogContent>
       <div>
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
        </div>
        <div className="radio-container mt-3">
          <p>Select payment plan <i className="small-text">(payment after service)</i></p>
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

        </div>
        <TextField
            label="Enter Note"
            value={details.note}
            onChange={handleDetails}
            name="note"
            className="my-2 w-100"
          />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="secondary" variant="contained">Submit</Button>
      </DialogActions>
    </DialogWrapper>
  )
}

export default CreateTicket
