import axios from "axios";
import { Alert, Box, Button, CircularProgress, Snackbar, TextField } from "@mui/material";
import { StyleRules, WithStyles, withStyles } from "@mui/styles";
import axios from "axios";
import React from "react";
import Link from "@mui/material/Link";
import Cookies from "universal-cookie";



import { WithStyles, withStyles } from "@mui/styles";
const styles = {
  root: {
    height: "400px",
    width: "600px",
  },
  loginButton: {
    color: "red",
  },
};
interface loginProp extends WithStyles<typeof styles> {}
const loginFormView: React.FC<loginProp> = ({ classes }) => {
  const apiHandler = async (url: string,method: 'post'|'put'|'get'|'delete',data:any,headers:any,params:any)=>{
    return await axios({
        method,
        url,
        headers,
        params,
      })
}
  return <div className={classes.root}>
    
  </div>;
};

const loginForm = withStyles(styles)(loginFormView);
export default loginForm;
