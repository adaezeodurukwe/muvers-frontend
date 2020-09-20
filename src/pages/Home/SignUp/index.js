import React, { useState } from 'react'
import { DialogContent, DialogActions, Button, TextField, Radio } from '@material-ui/core'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'
import DialogWrapper from '../DialogBox.js';
import { Email } from '@material-ui/icons';

//'2014-08-18T21:11:54'

const SignUP = ({ handleClose, open }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [details, setDetails] = useState({
    name: "",
    phone: "",
    email: "",
    password: ""
  })
  const [stage, setStage] = useState(1);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleDetails = () => {
    
  }

  const handleNextState = () => {
    setStage(stage + 1)
  }
  const handlePrevState = () => {
    setStage(stage - 1)
  }

  return (
    <DialogWrapper handleClose={handleClose} open={open}>
      <DialogContent>
        {stage === 1 && <div>
          <h5>Select Preferred Date and time</h5>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date picker inline"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Time picker"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </MuiPickersUtilsProvider>
        </div>}
        {stage === 2 && <div>
          <h5>Select plan</h5>
          <p>Payment after service</p>
          <label htmlFor="plan1">
            <input id="plan1" type="radio" />
            1-2 rooms
          </label>
          
          <label htmlFor="plan2">
            <input id="plan2" type="radio" />
            3-4 rooms
          </label>

          <label htmlFor="plan2">
            <input id="plan2" type="radio" />
            more than 4 rooms
          </label>
        </div>}
        {stage === 3 && <div>
          <h5>Enter Details</h5>
          <TextField
            label="name"
            value={details.name}
          />
          <TextField
            label="phoneNumber"
            value={details.phone}
          />
          <TextField
            label="email"
            value={details.email}
          />
          <TextField
            label="set Password"
            value={details.password}
          />
        </div>}

      </DialogContent>
      <DialogActions>
        <Button onClick={handlePrevState}>Prev</Button>
        <Button onClick={handleNextState}>Next</Button>
        <Button>Submit</Button>
      </DialogActions>
    </DialogWrapper>
  )
}

export default SignUP
