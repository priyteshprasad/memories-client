import React, {useState} from "react";
import userStyles from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
  Tooltip,
  Zoom
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import { useHistory } from "react-router-dom";

const Post = ({ post, setCurrentId }) => {
  const classes = userStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));

  const openPost = () => {
    history.push(`/post/${post._id}`);
    console.log(post._id);
  };
  const [toolTipOpen, settoolTipOpen] = React.useState(false);

  const handleTooltipClose = () => {
    settoolTipOpen(false);
  };

  const handleTooltipOpen = () => {
    settoolTipOpen(true);
  };
  const userId = user?.result?.sub || user?.result?._id
  const [likes, setLikes] = useState(post?.likes)
  const userHasLikedPost = likes.find((like)=> like === userId)
  const handleLikeClick = async () => {
    
      dispatch(likePost(post._id));
      if(userHasLikedPost){
        setLikes(likes.filter((id)=> id!==userId))
      }else{
        setLikes([...likes, userId])
      }
    
  }
  const Likes = () => {
    if (likes.length > 0) {
      return likes.find(
        (like) => like === userId
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <div className={classes.overlay2}>
            {/* three dots on top right */}
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={() => {
                setCurrentId(post._id); //the function changes the currentId in the App.js
              }}
            >
              <EditIcon fontSize="medium" />
            </Button>
          </div>
        )}
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openPost}
      >
        <CardMedia
          className={classes.media}
          image={post.selectedFile}
          title={post.title}
          component="div"
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>{" "}
          {/*30 min from now*/}
        </div>
        

        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" style={{lineHeightStep: '2'}}>
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography variant="h5" className={classes.title} gutterBottom>
          {post.title}
        </Typography>
        <CardContent>
        
        {
          post.message.length >= 150 ? 
            (<Tooltip
              TransitionComponent={Zoom}
              title={<Typography variant="body2" component="p">{post.message}</Typography>} // Set font size only for the Tooltip content
              placement="right"
              className={classes.toolTip}
            >
              <Typography variant="body2" color="textSecondary" component="p">
                {post.message.substring(0, 150) + "..."}
              </Typography>
            </Tooltip>)
           : 
            (<Typography variant="body2" color="textSecondary" component="p">
              {post.message}
            </Typography>)
          
        }
          
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={handleLikeClick}
        >
          <Likes />
        </Button>
        {(user?.result?.sub === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            size="small"
            color="primary"
            onClick={() => {
              dispatch(deletePost(post._id));
            }}
          >
            <DeleteIcon fontSize="small" />
            Deleted
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
