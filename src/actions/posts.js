import * as api from "../api";
import {
  FETCH_ALL,
  CREATE,
  DELETE,
  LIKE,
  UPDATE,
} from "../constants/actionTypes";

// api.fetchPosts
// Action Creaters are functions that return an action
//an action just an object that has type and payload
// instead to returning an action we have to dispatch it

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    // console.log("data fetched successfully", data);
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
// const action = {type: 'FETCH_ALL', payload: []}
// dispatch(action)
export const getPostBySearch = (query) => async (dispatch) => {
  try {
    const {data: { data }} = await api.fetchPostsBySearch(query)
    console.log(data)
  } catch (error) {
    console.log(error.message)
  }
}
export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post); //making a post api request
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post); //return updated post
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id); //return updated post
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

// after creating action => reducer
