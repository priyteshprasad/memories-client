import React, { useState } from "react";
import { useNavigate, useHistory } from "react-router-dom";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
// import { GoogleLogin } from "react-google-login";
import { GoogleLogin } from "@react-oauth/google";
import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { signin, signup } from "../../actions/auth.js";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();
  const history = useHistory();
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const switchMode = () => {
    setIsSignup((prev) => !prev);
    setShowPassword(false);
  };
  const googleSuccess = async (res) => {
    console.log("google sign in success", res);
    const { credential, clientId } = res;
    const result = jwtDecode(credential);
    console.log("User: ", result);

    try {
      dispatch({ type: "AUTH", data: { result, token: credential } });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error) => {
    console.log("Google sign in was unsuccessful", error);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            onSuccess={googleSuccess}
            onError={googleFailure}
            width="100%"
          />

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
