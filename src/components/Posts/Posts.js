import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post/Post";
import userStyles from "./styles";
import { Grid, CircularProgress } from "@material-ui/core";

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts); //before [] ==> {posts: [], isLoading}
  const classes = userStyles();
  if(!posts.length && !isLoading) return "No posts"
  return isLoading ? (
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
            <Grid item key={post._id} xs={12} sm={12} md={6} lg={3}>
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
