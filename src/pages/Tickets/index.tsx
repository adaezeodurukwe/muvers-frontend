import React, { useEffect } from "react";
import dayjs from "dayjs";
import { Card, IconButton } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import Layout from "../../Layout";
import { getAllTickets } from "../../Redux/Actions";

type map = {
  [key: string]: value
}

type value = {name: string; price: string}

const planMap: map = {
  plan1: {name: "1-2 rooms", price: "10,000"},
  plan2: {name: "3-4 rooms", price: "15,000"},
  plan3: {name: "more than 4 rooms", price: "30,000"},
};

interface Ticket {
  plan: string;
  status: string;
  time: Date;
}

const Tickets = () => {
  const dispatch = useDispatch();
  const { tickets } = useSelector((store: RootStateOrAny) => store.ticket);

  useEffect(() => {
    console.log(tickets);
  }, [tickets]);

  useEffect(() => {
    dispatch(getAllTickets());
  }, [dispatch]);
  return (
    <Layout>
      <h2 className="mb-4">Your Tickets</h2>
      <div className="row">
        {tickets && tickets[0] && (
          <>
            {tickets.map((ticket: Ticket, index: number) => (
              <div key={index.toString()} className="col-3">
                <Card className="p-3">
                  <div className="py-1"><i>Move day:</i> {dayjs(ticket.time).format('YYYY MMMM DD HH:MM')}</div>
                  <div className="py-1">Plan: {planMap[ticket.plan].name}</div>
                  <div className="py-1">To pay: {planMap[ticket.plan].price}</div>
                  <div className="py-1 success">{ticket.status}</div>
                </Card>
              </div>
            ))}
          </>
        )}
        <div className="col-3">
          <Card className="p-3 d-flex flex-column align-items-center">
            <IconButton>
              <Add />
            </IconButton>
            <span className="pt-3 pb-4 mt-1">Create Ticket</span>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Tickets;
