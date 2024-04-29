import axios from "axios"; //use to make api calls

const url = "http://localhost:5000/posts"; //pointing to backend

export const fetchPosts = () => axios.get(url);
