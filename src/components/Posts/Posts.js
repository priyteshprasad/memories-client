import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post/Post";
import userStyles from "./styles";
import { Grid, CircularProgress } from "@material-ui/core";

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
  const classes = userStyles();
  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {
        // curly bracess means JS code inside
        posts.map(
          (
            post //putting () instead of {}
          ) => (
            <Grid item key={post._id} xs={12} sm={6}>
              <Post post={post} setCurrentId={setCurrentId} />
              {/*PROPS DRILLING: sending post object as prop ; we recieved setCurrentId and now sending it to Post component i.e. layer by transfer which is resolved by redux*/}
            </Grid>
          )
        )
      }
    </Grid>
  );
};

export default Posts;
