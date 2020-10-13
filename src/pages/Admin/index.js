import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { ConfirmationNumber, MoveToInbox } from '@material-ui/icons';
import { NavLink, useLocation } from 'react-router-dom';
import Chat from './Chats';
import Tickets from './Tickets';
import CustomSnackbar from '../../components/Snackbar';

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
  const classes = useStyles();
  const { pathname } = useLocation()

  const getPage = () => {
    if (pathname.includes("messages")) {
      return <Chat />
    } else {
      return <Tickets />
    }
  }

  return (
    <div className={classes.root}>
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
      <main className={classes.content}>
        {getPage()}
      </main>
      <CustomSnackbar />
    </div>
  );
}

export default Admin;
