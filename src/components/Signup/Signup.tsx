// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Avatar from "@mui/material/Avatar";
// import Grid from '@mui/material/Grid';
// import pexels from "../../Images/pexels.jpeg";
// import Box from "@mui/material/Box";
import { Alert, Snackbar } from "@mui/material";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
// import Container from "@mui/material/Container";
// import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
// import { createTheme, } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { WithStyles, withStyles,StyleRules } from "@mui/styles";
import axios from "axios";
import React from "react";


const styles = (): StyleRules => {
  return {
    root: {

    },
  }
};
interface SignUpProp extends WithStyles<typeof styles> {
  login:(value:boolean)=>void
}
const SignUpFormView: React.FC<SignUpProp> = ({classes,login}) => {
  const [checked, setChecked] = React.useState(true);
  const [success, setSuccess] = React.useState(false);
  const [failure, setFailure] = React.useState(false);
  const [serverData, setServerData] = React.useState("");
  const handleClick = () => {
    console.log(checked);
    setChecked(!checked);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    axios
      .post("/signup", {
        userName: data.get("username"),
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        password: data.get("password"),
        confirmPassword: data.get("Confirmpassword"),
        email: data.get("email"),
        aadharNumber: data.get("aadharNumber"),
        address: data.get("address"),
        isSeller: checked,
      })
      .then(function (response) {
        const status = response.status;
        if (status === 201) {
          setSuccess(true);
          console.log(response.data.message);
          setServerData(response.data.message);
          setTimeout(()=>{
            login(true)
          },6000)
        } else {
          alert(response);
        }
      })
      .catch((error) => {
        setFailure(true);
        setServerData(JSON.stringify(error.response.data.message));
      });
  };
  const handleClose = () => {
    setSuccess(false);
    setFailure(false);
  };
  return (
    <div style={{'marginTop': '100px'}} className={classes.root}>
    <Snackbar
      open={success || failure}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{horizontal:'right',vertical:'top'}}
    >
      <Alert
        onClose={handleClose}
        severity={success ? "success" : "error"}
        sx={{ width: "100%" }}
        variant="filled"
      >
        {serverData}
      </Alert>
    </Snackbar>
    <div
      className="formComp"
      style={{
        height: "720px",
        width: "400px",
        borderRadius: "4%",
      }}
    >
      <Typography component="h1" variant="h5" style={{textAlign:'center',color: "#4285F4"}}>
        Sign Up
      </Typography>
      <form  onSubmit={handleSubmit}>
        <TextField
          autoComplete="given-name"
          name="username"
          required
          fullWidth
          id="username"
          label="Username"
          autoFocus
          size="small"
          style={{ marginTop: "10px" }}
        />
        <TextField
          required
          fullWidth
          id="firstName"
          label="Firstame"
          name="firstName"
          size="small"
          autoComplete="first-name"
          style={{ marginTop: "10px" }}
        />
        <TextField
          required
          fullWidth
          id="lastName"
          label="Lastname"
          name="lastName"
          size="small"
          autoComplete="family-name"
          style={{ marginTop: "10px" }}
        />
        <TextField
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          size="small"
          autoComplete="email"
          style={{ marginTop: "10px" }}
        />
        <TextField
          required
          fullWidth
          id="aadharNumber"
          label="Aadhar Number"
          name="aadharNumber"
          size="small"
          autoComplete="aadharNumber"
          style={{ marginTop: "10px" }}
        />
        <TextField
          required
          fullWidth
          id="address"
          label="address"
          name="address"
          size="small"
          autoComplete="address"
          style={{ marginTop: "10px" }}
        />
        <TextField
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          size="small"
          autoComplete="new-password"
          style={{ marginTop: "10px" }}
        />
        <TextField
          required
          fullWidth
          name="Confirmpassword"
          label="Confirmpassword"
          type="password"
          id="Confirmpassword"
          size="small"
          autoComplete="Confirm password"
          style={{ marginTop: "10px" }}
        />
        <FormControlLabel
          control={
            <Checkbox
              value="seller"
              color="primary"
              name="seller"
              onClick={handleClick}
            />
          }
          label="are you a seller?."
          style={{ marginTop: "10px" }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          style={{ marginTop: "10px" }}
        >
          Sign Up
        </Button>
      </form>
      <Link variant="body2"  onClick={()=>{login(true)}} style={{cursor:'pointer'}}>
        Already have an account? Sign in
      </Link>
    </div>
  </div>
    )
};
const SignUpForm = withStyles(styles)(SignUpFormView);
export default SignUpForm;