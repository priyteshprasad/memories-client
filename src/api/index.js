import axios from "axios"; //use to make api calls
// const API = axios.create({ baseURL: "https://pp-memories-server.onrender.com" });
const API = axios.create({ baseURL: "http://localhost:8000/" });
// const url = "http://localhost:5000/posts"; //pointing to backend

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});
// export const fetchPosts = () => axios.get(url);
export const fetchPost = (id) => API.get(`/posts/${id}`)
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (query) => API.get(`/posts/search?searchQuery=${query.search || 'none'}&tags=${query.tags}`)
export const createPost = (newPost) => API.post("/posts", newPost);

export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, {value})

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
