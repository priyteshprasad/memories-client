import * as api from "../api";
import {
  FETCH_ALL,
  CREATE,
  DELETE,
  LIKE,
  UPDATE,
  AUTH,
} from "../constants/actionTypes";
import {toast}  from "react-toastify";

export const signin = (formData, history) => async (dispatch) => {
  try {
    // log in the user
    // navigate tp home page
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    history.push("/");
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message)
  }
};
export const signup = (formData, history) => async (dispatch) => {
  try {
    // TODO: apply email format verification here

    // signup the user
    // navigate to home page
    const { data } = await api.signUp(formData);
    if(data.success){
      toast.success("User Registered, please verify email and login")
    }else{
      toast.error("Registration unsuccessfull, please try again")
    }
    // dispatch({ type: AUTH, data });
    history.push("/auth");
  } catch (error) {
    toast.error(error.response.data.message)
    console.log(error);
    
  }
};
