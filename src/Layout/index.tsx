import React, { ChangeEvent, ReactNode, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import { QuestionAnswer, Close, Menu as MenuIcon } from "@material-ui/icons";
import Chat from "./Chat";
import "./index.scss";
import { Menu, MenuItem } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { RootStateOrAny, useSelector } from "react-redux";
import CustomSnackbar from "../components/Snackbar";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    position: "relative",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

interface propTypes {
  children: ReactNode;
}

const Layout = ({ children }: propTypes) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { loggedIn } = useSelector(({ auth }: RootStateOrAny) => auth);

  const handleClick = (event: ChangeEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    localStorage.removeItem("moovers_token");
    localStorage.removeItem("moovers_isAdmin");
    window.location.replace("/");
  };

  return (
    <section className={classes.root}>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className="d-flex justify-content-end">
          <IconButton onClick={handleClick}>
            <MenuIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              style: {
                width: "10rem",
                borderRadius: "1rem",
              },
            }}
          >
            <NavLink to="/">
              <MenuItem>Home</MenuItem>
            </NavLink>
            {!loggedIn && <NavLink to="/login">
              <MenuItem>Login</MenuItem>
            </NavLink>}
            {loggedIn && (
              <>
                <NavLink to="/tickets">
                  <MenuItem>Tickets</MenuItem>
                </NavLink>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </>
            )}
          </Menu>
        </div>
        {loggedIn && <div className="open-chat">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
          >
            <QuestionAnswer />
          </IconButton>
        </div>}
        {children}
      </main>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className="close">
          <IconButton aria-label="close drawer" onClick={handleDrawerToggle}>
            <Close />
          </IconButton>
        </div>
        <Chat />
      </Drawer>
      <CustomSnackbar />
    </section>
  );
};

export default Layout;
