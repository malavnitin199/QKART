import { Warning } from "@mui/icons-material";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { Axios } from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";


const Register = () => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [data,setData] = useState({
    username: "",
    password: "",
    confirm : "" 
  })
  const [loading,setLoading] = useState(false)
  const handleOnChange = (e)=>{
    setData({ ...data, [e.target.name]: e.target.value })
   
  }


  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  const reg = async () => {
    if(!validateInput(data))
    {
      return;
    }
    setLoading(true);
    try{
   
    
      await axios.post(config.endpoint+"/auth/register",{username : data.username,password:data.password})
      setData({
        username:"",
        password :"",
        confirm : ""
      })
      enqueueSnackbar("register Successfully",{variant :"success"})
      setLoading(false);
      history.push("/login");
    
      }
      catch(e){
          setLoading(false)
          if(e.responce && (e.responce.status===400)){
          return enqueueSnackbar(e.responce.data.message,{variant:"error"})
       }
        else{
          console.log(e,"nitinerror")
          return enqueueSnackbar("Username is already taken",{variant:"error"})
          }
  }

  };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (d) => {
  
    if(!d.username){
      enqueueSnackbar("user is a required filed" , {variant :"warning"})  
      return false;
    }
    else if(d.username.length<6)
    {
     
      enqueueSnackbar("user name is less than 6" , {variant :"warning"})  
      // alert("hhhhhhhhhh")
      return false;
    }
    else if(!d.password)
    {
      enqueueSnackbar("password is a required filed" , {variant :"warning"})
      return false;
    }
    else if(d.password.length < 6){
      enqueueSnackbar("password length is small ,less than 6" , {variant :"warning"})
      return false;
    }
    else if(d.password!==d.confirm)
    {
      enqueueSnackbar("Password do not match" , {variant :"warning"})
      return false
    }
    else{
      return true;
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
            value={data.username}
            onChange={handleOnChange}
          />
          <TextField
            id="password"
            variant="outlined"
            label="password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            value={data.password}
            onChange={handleOnChange}
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirm"
            type="password"
            fullWidth
            value={data.confirm}
            onChange={handleOnChange}
          />{loading ?(
            <Box display = "flex" justifyContent="center" alingItems="centre">
              <CircularProgress size={25} color="primary"/>
              </Box>):(
           <Button className="button" variant="contained" onClick = {reg}>
            Register Now
           </Button>)}
           
          <p className="secondary-action"
      >
            Already have an account?{" "}
             <a className="link" href="/login">
              Login here
             </a>
          </p>
          
        </Stack>
      </Box>
      <Footer />
    </Box>
 );
};

export default Register;
