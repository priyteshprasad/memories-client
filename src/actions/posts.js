import * as api from "../api";

// api.fetchPosts
// Action Creaters are functions that return an action
//an action just an object that has type and payload
// instead to returning an action we have to dispatch it

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
// const action = {type: 'FETCH_ALL', payload: []}
// dispatch(action)

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post); //making a post api request
    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};
