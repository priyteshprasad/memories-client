import React from "react";
// import all the components that we are going to user
// all start with capital letter
import { Container } from "@material-ui/core";

import Navbar from "./components/Navbar/Navbar";

// in order to update we have to transfer data between Posts and Form component
// App is the parent of both, so we will do it here
// Usually we use redux with that, but we will use useState here

import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => {
  return (
    <GoogleOAuthProvider clientId="109932179893-jbvlcias87pqk21867gr7fkjfqa5ki23.apps.googleusercontent.com">
      <BrowserRouter>
        <Container maxWidth="lg">
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/auth" exact component={Auth} />
          </Switch>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
