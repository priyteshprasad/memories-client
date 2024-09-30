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

export default (state = 
  {isLoading: true, posts: []}, action) => {
  // if(action.type === "CREATE"){
  //     return ...
  // } multiple if statement
  switch (action.type) {
    case START_LOADING:
      return {...state, isLoading: true}
    case END_LOADING:
      return {...state, isLoading: false}
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      }; //actual posts
    case FETCH_POST:
      return {...state, post : action.payload };
    case FETCH_BY_SEARCH:
      return {...state, posts: action.payload };
    case CREATE:
      return [...state, action.payload];
    case UPDATE:
      return {...state, posts: state.posts.map((post)=> (post._id === action.payload._id ? action.payload : post))}
    case LIKE:
      return {...state, posts: state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      )};
    case DELETE:
      return {...state, posts: state.posts.filter((post) => post.id !== action.payload)};
    default:
      return state;
  }
};
