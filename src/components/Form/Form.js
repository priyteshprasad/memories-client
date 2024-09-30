import React, { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Typography,
  Paper,
  DialogTitle,
} from "@material-ui/core";
import userStyles from "./styles";
import { createPost, updatePost } from "../../actions/posts";
import { useHistory } from "react-router-dom";

// we have to get the id inorder to update

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    // creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const classes = userStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  ); //if we have id then we want to send the post with that id

  // useEffect is used to populate the values of the form
  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]); //accept callback and dependency array
  const user = JSON.parse(localStorage.getItem("profile"));
  const handleSubmit = (e) => {
    e.preventDefault(); //stop refresh

    if (currentId) {
      //if we have currentId, then we want to update the post
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    } else {
      // otherwise we want to create a new post
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));
      
    }
    clear(); //on click of submit button
  };
  //clar the input fiels
  const clear = () => {
    setCurrentId(null);
    setPostData({
      // creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };
  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign in to create your own memory and like other's memory
        </Typography>
      </Paper>
    );
  }
  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.form} ${classes.root}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a Memory
        </Typography>
        {/* <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(event) =>
            setPostData({ ...postData, creator: event.target.value })
          }
        /> */}
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(event) =>
            setPostData({ ...postData, title: event.target.value })
          }
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(event) =>
            setPostData({ ...postData, message: event.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(event) =>
            setPostData({
              ...postData,
              tags: event.target.value.split(",").map((str) => str.trim()),
            })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
