import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory, Link } from "react-router-dom";



const Login = (props) => {
  const history = useHistory();

  const handleNavigate = () => {
    if(props.type == "user") {
      history.push('/userHome')
    }
    else if(props.type == "manager") {
      history.push('/managerHome')
    }
  }

  return (
    <AppBar position="static">
    <Toolbar variant="dense">
        <IconButton edge="start" color="inherit" aria-label="menu">
        <MenuIcon />
        </IconButton>
            <Typography style={{cursor: "pointer", marginLeft:80}} onClick={handleNavigate} variant="h6" color="inherit">
                DTBank
            </Typography>
            <Typography style={{cursor: "pointer", marginLeft:1000}} onClick={() => history.push('/login')} variant="h7" color="inherit">
                Logout
            </Typography>
    </Toolbar>
    </AppBar>
  );
}

export default Login;
