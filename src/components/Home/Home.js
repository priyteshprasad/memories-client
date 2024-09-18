import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Grow,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { useDispatch } from "react-redux";
import { getPosts, getPostBySearch } from "../../actions/posts";
import userStyles from "./styles";
import Pagination from "../Pagination";
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null); //set the id to null if not selected
  const classes = userStyles();
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  useEffect(() => {
    dispatch(getPosts()); //successful dispatch
    // as soon as we change the currentId, dispatch will run to getPosts
  }, [currentId, dispatch]);
  const handleKeyPress = (e) => {
    if(e.keyCode === 13){
      // enter key
      searchPost()
    }
  }
  const handleAdd = (tag) => {
    setTags([...tags, tag])
  }
  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete))
  }
  const searchPost =()=> {
    if(search.trim() || tags){
      // dispatch => fetch search post
      // first create redux action to search the post
      console.log("searchingfor", search)
      dispatch(getPostBySearch({search, tags:tags.join(',')}));
      history.push(`/posts/search?searchQuery=${search || none}&tags=${tags.join(',')}`)
    }else{
      history.push('/')
    }
  }
  return (
    <Grow in>
      {/* Grow provides simple animation, property-> in to make it grow-in */}
      <Container maxWidth="xl">
        <Grid
          container
          className={classes.gridContainer}
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            {/* xs=> full with on xtra-small devices; sm=> 7/12 spaces on smaller or largers devices*/}
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                onKeyPress={handleKeyPress}
              />
              <ChipInput 
                style={{margin: "10px 0"}}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"
                fullWidth
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                color="primary"
                variant="contained"

              >Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {/* we are sending props so we will recieve the props */}
            <Paper className={classes.pagination} elevation={6}>
              <Pagination />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
