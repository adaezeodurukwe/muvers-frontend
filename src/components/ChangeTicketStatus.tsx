import React, { useEffect, useState } from "react";
import {
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import DialogWrapper from "./DialogWrapper";
import { useDispatch } from "react-redux";
import { updateTicket } from "../redux/Actions";

const ChangeStatus = ({ handleClose, open, ticket, isAdmin }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");

  useEffect(() => {
    setStatus(ticket.status);
  }, [ticket]);

  const closeModal = () => {
    handleClose();
  };

  const handleChange = ({ target: { value, name } }) => {
    setStatus(value);
  };

  const handleSubmit = () => {
    dispatch(updateTicket({ ...ticket, status }, ticket.id, closeModal, isAdmin));
  };

  return (
    <DialogWrapper title="Update Ticket Status" handleClose={handleClose} open={open}>
      <DialogContent>
        <div>
          <FormControl component="fieldset">
            <FormLabel component="legend">Status</FormLabel>
            <RadioGroup
              className="d-flex flex-column"
              aria-label="status"
              name="status"
              value={status}
              onChange={handleChange}
            >
              <FormControlLabel
                value="open"
                control={<Radio />}
                label="open"
              />
              {isAdmin && (
                <>
                  <FormControlLabel
                    value="ongoing"
                    control={<Radio />}
                    label="Ongoing"
                  />
                  <FormControlLabel
                    value="complete"
                    control={<Radio />}
                    label="Complete"
                  />
                </>
              )}
              <FormControlLabel
                value="closed"
                control={<Radio />}
                label="Close"
              />
            </RadioGroup>
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="secondary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </DialogWrapper>
  );
};

export default ChangeStatus;
