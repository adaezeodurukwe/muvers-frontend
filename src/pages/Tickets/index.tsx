import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Card, IconButton } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import Layout from "../../layout";
import { getUserTickets } from "../../redux/Actions";
import { Ticket } from "../../models";
import CreateTicket from "./CreateTicket";
import ChangeStatus from "../../components/ChangeTicketStatus";
import AddNote from "./AddNote";

type map = {
  [key: string]: value;
};

type value = { name: string; price: string };

const planMap: map = {
  plan1: { name: "1-2 rooms", price: "10,000" },
  plan2: { name: "3-4 rooms", price: "15,000" },
  plan3: { name: "more than 4 rooms", price: "30,000" },
};

const Tickets = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openNote, setOpenNote] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [currentTicket, setCurrentTicket] = useState({});
  const { tickets } = useSelector((store: RootStateOrAny) => store.ticket);

  useEffect(() => {
    dispatch(getUserTickets());
  }, [dispatch]);

  const handleOpenStatus = (ticket) => {
    setOpenStatus(true);
    setCurrentTicket(ticket);
  };

  const handleOpenNote = (ticket) => {
    setOpenNote(true);
    setCurrentTicket(ticket);
  };

  return (
    <Layout>
      <h2 className="mb-4">Your Tickets</h2>
      <CreateTicket open={open} handleClose={() => setOpen(false)} />
      <div className="row">
        {tickets && tickets[0] && (
          <>
            {tickets.map((ticket: Ticket, index: number) => (
              <div key={index.toString()} className="col-12 col-md-4 mt-2">
                <Card className="p-3">
                  <div className="py-1">
                    <i>Move day:</i>{" "}
                    {dayjs(ticket.time).format("YYYY MMMM DD HH:MM")}
                  </div>
                  <div className="py-1">Plan: {planMap[ticket.plan].name}</div>
                  <div className="pt-1 pb-2 d-flex justify-content-between">
                    To pay: {planMap[ticket.plan].price}
                    <div>Status: {ticket.status}</div>
                  </div>
                  
                  <div className="d-lg-flex justify-content-between">
                    <button
                      type="button"
                      onClick={() => handleOpenStatus(ticket)}
                      className="py-1 d-block btn bg-green mt-2"
                    >
                      <span className="text-capitalize">Change Status</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenNote(ticket)}
                      className="py-1 d-block btn btn-secondary mt-2"
                    >
                      {ticket.note ? <span>Modify Note</span> : <span>Add Note</span>}
                    </button>
                  </div>
                </Card>
                <ChangeStatus
                  open={openStatus}
                  handleClose={() => setOpenStatus(false)}
                  ticket={currentTicket}
                  isAdmin={false}
                />
                <AddNote
                   open={openNote}
                   handleClose={() => setOpenNote(false)}
                   ticket={currentTicket}
                />
              </div>
            ))}
          </>
        )}
        <div className="col-12 col-md-4 mt-2">
          <Card
            onClick={() => setOpen(true)}
            className="p-3 d-flex flex-column align-items-center cursor-pointer"
          >
            <IconButton>
              <Add />
            </IconButton>
            <span className="py-4 mt-1">Create Ticket</span>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Tickets;
