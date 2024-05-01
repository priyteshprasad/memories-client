export default (posts = [], action) => {
  // if(action.type === "CREATE"){
  //     return ...
  // } multiple if statement
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload; //actual posts
    case "CREATE":
      return [...posts, action.payload];
    case "UPDATE":
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    default:
      return posts;
  }
};
