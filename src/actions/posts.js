import * as api from "../api";
import {
  FETCH_ALL,
  CREATE,
  DELETE,
  LIKE,
  UPDATE,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  FETCH_POST
} from "../constants/actionTypes";


export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({type: START_LOADING})
    const { data } = await api.fetchPost(id);
    // console.log("data fetched successfully", data);
    dispatch({ type: FETCH_POST, payload: data });
    dispatch({type: END_LOADING})
  } catch (error) {
    console.log(error.message);
  }
};
// api.fetchPosts
// Action Creaters are functions that return an action
//an action just an object that has type and payload
// instead to returning an action we have to dispatch it

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({type: START_LOADING})
    const { data } = await api.fetchPosts(page);
    // console.log("data fetched successfully", data);
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({type: END_LOADING})
  } catch (error) {
    console.log(error.message);
  }
};
// const action = {type: 'FETCH_ALL', payload: []}
// dispatch(action)
export const getPostBySearch = (query) => async (dispatch) => {
  try {
    dispatch({type: START_LOADING})
    const {data: { data }} = await api.fetchPostsBySearch(query)
    console.log(data)
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({type: END_LOADING})
  } catch (error) {
    console.log(error.message)
  }
}
export const createPost = (post, history) => async (dispatch) => {
  try {
    dispatch({type: START_LOADING})
    const { data } = await api.createPost(post); //making a post api request
    history.push(`/post/${data._id}`)
    dispatch({ type: CREATE, payload: data });
    // dispatch({type: END_LOADING})
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
