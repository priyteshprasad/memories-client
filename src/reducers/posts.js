import {
  FETCH_ALL,
  CREATE,
  DELETE,
  LIKE,
  UPDATE,
} from "../constants/actionTypes";

export default (posts = [], action) => {
  // if(action.type === "CREATE"){
  //     return ...
  // } multiple if statement
  switch (action.type) {
    case FETCH_ALL:
      return action.payload; //actual posts
    case CREATE:
      return [...posts, action.payload];
    case UPDATE:
    case LIKE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case DELETE:
      return posts.filter((post) => post.id !== action.payload);
    default:
      return posts;
  }
};
