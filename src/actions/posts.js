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
  FETCH_POST,
  COMMENT,
} from "../constants/actionTypes";

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPost(id);
    // console.log("data fetched successfully", data);
    dispatch({ type: FETCH_POST, payload: data });
    dispatch({ type: END_LOADING });
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
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(page);
    // console.log("data fetched successfully", data);
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};
// const action = {type: 'FETCH_ALL', payload: []}
// dispatch(action)
export const getPostBySearch = (query) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchPostsBySearch(query);
    console.log(data);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};
export const createPost = (post, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    //
    // const {imageName} = await api.getPresignedUrlAndUpload(post.selectedFile);
    // post.selectedFile = imageName
    //
    const { data } = await api.createPost(post); //making a post api request
    history.push(`/post/${data._id}`);
    dispatch({ type: CREATE, payload: data });
    // dispatch({type: END_LOADING})
  } catch (error) {
    console.log(error);
  }
};

export const createPostWithAws = (post, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const newName = Date.now().toString() + "_" + post.selectedFile.name;
    const { data: result } = await api.getPresignedUrl(
      newName,
      post.selectedFile.type
    );
    await api.uploadUsingPresignedUrl(result.preSignedUrl, post.selectedFile); //await is required so that file will open after its uploaded
    post.selectedFile = newName;
    const { data } = await api.createPost(post); //making a post api request
    history.push(`/post/${data._id}`);
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
export const updatePostWithAws = (id, post) => async (dispatch) => {
  try {
    if (typeof post.selectedFile !== "string") {
      // new upload to aws and replace file name
      const newName = Date.now().toString() + "_" + post.selectedFile.name;
      const { data: result } = await api.getPresignedUrl(
        newName,
        post.selectedFile.type
      );
      await api.uploadUsingPresignedUrl(result.preSignedUrl, post.selectedFile);
      post.selectedFile = newName;
      const { data } = await api.updatePost(id, post); //return updated post
      // console.log("updated post", data);
      dispatch({
        type: UPDATE,
        payload: data,
      });
    } else {
      // get out the image name, and add it instead of url
      const currUrl = post.selectedFile;
      const fileNameFromUrl = post.selectedFile.split("?")[0].split("/").at(-1);
      const { data } = await api.updatePost(id, {
        ...post,
        selectedFile: fileNameFromUrl,
      }); //return updated post
      // console.log("updated post", data);
      dispatch({ type: UPDATE, payload: { ...data, selectedFile: currUrl } });
    }
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

export const commentPost = (value, id) => async (dispatch) => {
  // considuring that data is async we have to use redux thunk
  try {
    const { data } = await api.comment(value, id); //data of a post with new comment
    dispatch({ type: COMMENT, payload: data });
    return data.comments;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

// after creating action => reducer
