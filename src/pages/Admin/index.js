import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { ConfirmationNumber, MoveToInbox } from '@material-ui/icons';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import Chat from './Chats';
import Tickets from './Tickets';
import CustomSnackbar from '../../components/Snackbar';
import { AppBar } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const Admin = () => {
  const history = useHistory()
  const classes = useStyles();
  const { pathname } = useLocation()

  useEffect(() => {
    if (!localStorage.getItem("moovers_isAdmin")) {
      history.push("/");
    };
  }, [history])

  const getPage = () => {
    if (pathname.includes("messages")) {
      return <Chat />
    } else {
      return <Tickets />
    }
  }

  return (
    <div className={classes.root}>
      <div className="d-none d-sm-block">
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <List className="mt-4">
            <NavLink to="/admin/tickets">
              <ListItem button key="tickets">
                <ListItemIcon> <ConfirmationNumber /></ListItemIcon>
                <ListItemText primary="Tickets" />
              </ListItem>
            </NavLink>
            <NavLink to="/admin/messages">
              <ListItem button key="messages">
                <ListItemIcon><MoveToInbox /></ListItemIcon>
                <ListItemText primary="Messages" />
              </ListItem>
            </NavLink>
          </List>
        </Drawer>
      </div>
      <div className="d-sm-none d-block pt-5">
        <AppBar color="default">
          <List className="d-flex">
            <NavLink to="/admin/tickets">
              <ListItem button key="tickets">
                <ListItemIcon> <ConfirmationNumber /></ListItemIcon>
                <ListItemText primary="Tickets" />
              </ListItem>
            </NavLink>
            <NavLink to="/admin/messages">
              <ListItem button key="messages">
                <ListItemIcon><MoveToInbox /></ListItemIcon>
                <ListItemText primary="Messages" />
              </ListItem>
            </NavLink>
          </List>
        </AppBar>
      </div>
      <main className={classes.content}>
        <div className="mt-5 mt-sm-0">
          {getPage()}
        </div>
      </main>
      <CustomSnackbar />
    </div>
  );
}

export default Admin;
