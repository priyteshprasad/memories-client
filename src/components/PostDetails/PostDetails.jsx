import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment"; //lybrari deals with time
import { useParams, useHistory, Link } from "react-router-dom";
import useStyles from "./styles.js";
import { getPost, getPostBySearch } from "../../actions/posts.js";
import CommentSection from "./CommentSection.jsx";
function PostDetails() {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);
  useEffect(() => {
    if(post){
      dispatch(getPostBySearch({search: 'none', tags: post?.tags.join(',')}));
    }
  }, [post]);
  if (!post) return null;
  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7rem" />
      </Paper>
    );
  }
  const openPost =(_id)=>{
    history.push(`/post/${_id}`)
  }

  const recommendedPosts = posts.filter(({_id}) => _id !== post._id)

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => (
              <Link
                to={""}
                key={tag}
                style={{ textDecoration: "none", color: "#3f51b5" }}
              >
                {` #${tag} `}
              </Link>
            ))}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>      
          <Divider style={{ margin: "20px 0" }}></Divider>
          <CommentSection post={post}/>
          <Divider style={{ margin: "20px 0" }}></Divider>
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={post.selectedFile || "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"}
            alt=""
          />
        </div>
      </div>
      {recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">You might also like this</Typography>
          <Divider></Divider>
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(({title, message, name, likes, selectedFile, _id}) =>(
              <div style={{margin: '20px', cursor:"pointer"}} onClick={()=> openPost(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                <img src={selectedFile} width="200px"/>
                <Typography gutterBottom variant="h6">{title}</Typography>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Recommended POsts */}
    </Paper>
  );
}

export default PostDetails;
