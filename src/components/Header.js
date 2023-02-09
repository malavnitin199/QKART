import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { useHistory } from "react-router-dom";
import "./Header.css";

const Header = ({ children, hasHiddenAuthButtons }) => {
    const history = useHistory();
    const logout = ()=>{
      // localStorage.removeItem("username");
      // localStorage.removeItem("username");
      // localStorage.removeItem("username");
      localStorage.clear()
      history.push("/")
      window.location.reload();
  }
      const path = ()=>{
       
          history.push("/")
      
      }
     
      if(hasHiddenAuthButtons){
        return (
          <Box className = "header">
            <Box className="header-title">
              <img src="logo_light.svg" alt="QKart-icon"></img>
            </Box>
            <Button startIcon={<ArrowBackIcon/>} variant="text" onClick={path}>
              Back to explore
            </Button>
          </Box>
        )
      }

    return (
      <Box className="header">
        <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        

  
  
        <Stack direction="row" sapcing={1} alignItems="centre">
       
        {localStorage.getItem("username")?(
          <>
            <Avatar
            src ="avatar.png"
            alt={localStorage.getItem("username")|| "profile"}
            />
            <p className="username-text">{localStorage.getItem("username")}</p>
            <Button type="primary" onClick={logout}>
            logout
            </Button>
          </>
        ):(<>
          <Button onClick={()=>{history.push("/login")}}>Login </Button>
            <Button onClick={()=>{history.push("/register")}} variant="contained">
              Register
            </Button>
         
        </>)}
        </Stack>

      </Box>
    );
};

export default Header;
