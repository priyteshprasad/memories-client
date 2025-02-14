import React, { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Typography,
  Paper,
} from "@material-ui/core";
import userStyles from "./styles";
import { createPost, createPostWithAws, updatePost, updatePostWithAws } from "../../actions/posts";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
// we have to get the id inorder to update

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    // creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const [isValidData, setIsValidData] = useState(false);
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
  useEffect(()=>{
    if (!postData.message || !postData.title || !postData.selectedFile) {
      setIsValidData(false);
    } else {
      setIsValidData(true);
    }
  },[postData])
  const user = JSON.parse(localStorage.getItem("profile"));
  const handleSubmit = (e) => {
    e.preventDefault(); //stop refresh
    // validation
    console.log("Mydata", postData, typeof postData.selectedFile);
    if (!postData.selectedFile) {
      toast.error("First select image for post");
      return;
    }
    if (currentId) {
      if(typeof postData === 'string' && postData.selectedFile.startsWith("data:image/") ){
        // either base64 type image is already uploaded, or a new image of base64 type is selected, 
        // just call the updatePost, as it is
        dispatch(
          updatePost(currentId, { ...postData, name: user?.result?.name })
        );
      }else{
        // image is presigned url starting with https:// or newly selected image of type File
        // if it is url, we want to take out image name from it and add it to selectedFile
        // if its a file object we wanr to upload it to aws s3 then update the name
        dispatch(
          updatePostWithAws(currentId, { ...postData, name: user?.result?.name })
        );
      }
    } else {
      // otherwise we want to create a new post
      if(typeof postData.selectedFile === 'string'){
        dispatch(createPost({ ...postData, name: user?.result?.name }, history));
      }else{
        dispatch(createPostWithAws({...postData, name: user?.result?.name}, history))
      } 
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
  const handleImageSelectionForAws = (e) => {
    console.log(e.target.files[0])
    setPostData({ ...postData, selectedFile: e.target.files[0]})
  }
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
        // noValidate
        className={`${classes.form} ${classes.root}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a Memory
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          required
          onChange={(event) => {
            setPostData({ ...postData, title: event.target.value });
          }}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          required
          value={postData.message}
          onChange={(event) => {
            setPostData({ ...postData, message: event.target.value });
          }}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(event) => {
            setPostData({
              ...postData,
              tags: event.target.value.split(",").map((str) => str.trim()),
            });
          }}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            // required
            onDone={({ base64 }) => {
              setPostData({ ...postData, selectedFile: base64 });
            }}
          />
          <input type="file" multiple={false} onChange={handleImageSelectionForAws} />
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
