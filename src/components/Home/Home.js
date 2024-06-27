import React, { useEffect, useState } from "react";
import { Container, Grid, Grow } from "@material-ui/core";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";
import userStyles from "./styles";
const Home = () => {
  const [currentId, setCurrentId] = useState(null); //set the id to null if not selected
  const classes = userStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts()); //successful dispatch
    // as soon as we change the currentId, dispatch will run to getPosts
  }, [currentId, dispatch]);
  return (
    <Grow in>
      {/* Grow provides simple animation, property-> in to make it grow-in */}
      <Container>
        <Grid
          container
          className={classes.mainContainer}
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
  );
};

export default Home;
