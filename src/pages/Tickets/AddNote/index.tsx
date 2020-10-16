import React, { useEffect, useState } from "react";
import {
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  FormLabel,
  TextField
} from "@material-ui/core";
import DialogWrapper from "../../../components/DialogWrapper";
import { useDispatch } from "react-redux";
import { updateTicket } from "../../../redux/Actions";

const AddNote = ({ handleClose, open, ticket }) => {
  const dispatch = useDispatch();
  const [note, setNote] = useState("");

  useEffect(() => {
    setNote(ticket.note);
  }, [ticket]);

  const redirect = () => {
    handleClose();
  };

  const handleChange = ({ target: { value, name } }) => {
    setNote(value);
  };

  const handleSubmit = () => {
    dispatch(updateTicket({ ...ticket, note }, ticket.id, redirect));
  };

  return (
    <DialogWrapper title="Update Ticket Status" handleClose={handleClose} open={open}>
      <DialogContent>
        <div>
          <FormControl className="w-100" component="fieldset">
            <FormLabel component="legend">Note</FormLabel>
            <TextField variant="outlined" className="w-100 py-3" type="textArea" onChange={handleChange} value={note}/>
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

export default AddNote;
