import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { getAllTickets } from "../../../redux/Actions";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Ticket } from "../../../models";
import { IconButton } from "@material-ui/core";
import { ArrowDropDown } from "@material-ui/icons";
import ChangeStatus from "../../../components/ChangeTicketStatus";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    width: "100%",
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: "100%",
  },
});

const Tickets = () => {
  const [rows, setRows] = useState([]) as any;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openStatus, setOpenStatus] = useState(false);
  const [currentTicket, setCurrentTicket] = useState({});
  const { allTickets } = useSelector((store: RootStateOrAny) => store.ticket);

  useEffect(() => {
    dispatch(getAllTickets());
  }, [dispatch]);

  useEffect(() => {
    if (allTickets && allTickets[0]) {
      const newRows: {
        email: string;
        note: string;
        plan: string;
        time: Date;
        status: string;
      }[] = [];
      allTickets.forEach((ticket: Ticket) => {
        newRows.push(
          createData(
            ticket?.user?.email || "-",
            ticket.note || "-",
            ticket.plan,
            ticket.time,
            ticket.status
          )
        );
      });
      setRows(newRows);
    }
  }, [allTickets, setRows]);

  const handleOpenStatus = (ticket) => {
    setOpenStatus(true);
    setCurrentTicket(ticket);
  };

  const createData = (
    email: string,
    note: string,
    plan: string,
    time: Date,
    status: string
  ) => {
    return { email, note, plan, time, status };
  };

  return (
    <div>
      <h3>Tickets</h3>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Note</StyledTableCell>
              <StyledTableCell>Plan</StyledTableCell>
              <StyledTableCell>TIme</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any, index: number) => (
              <StyledTableRow key={index.toString()}>
                <StyledTableCell component="th" scope="row">
                  {row.email}
                </StyledTableCell>
                <StyledTableCell>{row.note}</StyledTableCell>
                <StyledTableCell>{row.plan}</StyledTableCell>
                <StyledTableCell>{dayjs(row.time).format("YYYY MMMM DD - HH:MM")}</StyledTableCell>
                <StyledTableCell>{row.status}<IconButton onClick={() => handleOpenStatus(allTickets[index])}><ArrowDropDown /></IconButton></StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ChangeStatus
        open={openStatus}
        handleClose={() => setOpenStatus(false)}
        ticket={currentTicket}
        isAdmin
      />
    </div>
  );
};

export default Tickets;
