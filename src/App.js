import React from "react";
// import all the components that we are going to user
// all start with capital letter
import { Container } from "@material-ui/core";

import Navbar from "./components/Navbar/Navbar";

// in order to update we have to transfer data between Posts and Form component
// App is the parent of both, so we will do it here
// Usually we use redux with that, but we will use useState here

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'))
  return (
    <GoogleOAuthProvider clientId="109932179893-jbvlcias87pqk21867gr7fkjfqa5ki23.apps.googleusercontent.com">
      <BrowserRouter>
        <Container maxWidth="xl">
          <Navbar />
          <Switch>
            <Route path="/" exact component={() => <Redirect to={"./posts"} />} />
            <Route path="/posts" exact component={Home} />
            <Route path="/posts/search" exact component={Home} />
            <Route path="/post/:id" exact component={PostDetails} />
            <Route path="/auth" exact component={() =>(!user ? <Auth /> : <Redirect to={"./posts"} />)} />
          </Switch>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
