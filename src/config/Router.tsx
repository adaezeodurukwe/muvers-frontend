import React from "react";
import { Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider, CssBaseline } from "@material-ui/core";
import Home from "../pages/Home";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: '#FFDA33',
    },
  },
});

const Router = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Switch>
        <Route exact path="/" render={() => <Home />}/>
      </Switch>
    </ThemeProvider>
  );
};

export default Router;
