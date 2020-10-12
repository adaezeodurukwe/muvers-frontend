import React from "react";
import { Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider, CssBaseline } from "@material-ui/core";
import Home from "../pages/Home";
import Tickets from "../pages/Tickets";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: '#FFDA33',
    },
    secondary: {
      main: '#33FFDA'
    }
  },
});

const Router = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Switch>
        <Route exact path="/" render={() => <Home />}/>
        <Route exact path="/login" render={() => <Home />}/>
        <Route exact path="/tickets" render={() => <Tickets />}/>
      </Switch>
    </ThemeProvider>
  );
};

export default Router;
