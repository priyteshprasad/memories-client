import React, { useState, useEffect } from "react";
// import all the components that we are going to user
// all start with capital letter
import { Container, AppBar, Typography, Grid, Grow } from "@material-ui/core";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import memories from "./images/memories.png";

import userStyles from "./styles";
import { useDispatch } from "react-redux"; //dispatch an action

import { getPosts } from "./actions/posts";

// in order to update we have to transfer data between Posts and Form component
// App is the parent of both, so we will do it here
// Usually we use redux with that, but we will use useState here

const App = () => {
  const [currentId, setCurrentId] = useState(null); //set the id to null if not selected
  const classes = userStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts()); //successful dispatch
    // as soon as we change the currentId, dispatch will run to getPosts
  }, [currentId, dispatch]);
  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="60"
        ></img>
      </AppBar>
      <Grow in>
        {/* Grow provides simple animation, property-> in to make it grow-in */}
        <Container>
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              {/* xs=> full with on xtra-small devices; sm=> 7/12 spaces on smaller or largers devices*/}
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
              {/* we are sending props so we will recieve the props */}
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
