import React from "react";
import { Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Home from "../pages/Home";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const Router = () => {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route exact path="/" render={() => <Home />}/>
      </Switch>
    </ThemeProvider>
  );
};

export default Router;
