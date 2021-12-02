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
import axios from "axios";
import * as React from "react";
const { useState } = React;

// function Copyright(props: any) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="https://mui.com/">
//         Shop-Circuit
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// const theme = createTheme();

export default function SignUp() {
  const [checked, setChecked] = useState(true);
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
    console.log({
      userName: data.get("username"),
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      password: data.get("password"),
      confirmPassword: data.get("Confirmpassword"),
      email: data.get("email"),
      aadharNumber: data.get("aadharNumber"),
      address: data.get("address"),
      isSeller: checked,
    });
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
        } else {
          alert(response);
        }
      })
      .catch((error) => {
        setFailure(true);
        setServerData(JSON.stringify(error.response.data.message).toString());
      });
  };
  const handleClose = () => {
    setSuccess(false);
    setFailure(false);
  };


  return (
    <div style={{'marginTop': '100px'}}>
      <Snackbar
        open={success || failure}
        autoHideDuration={6000}
        onClose={handleClose}
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
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
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
            label="Aadhaarnumber"
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
            type="Confirmpassword"
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
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            style={{ marginTop: "10px" }}
          >
            Sign Up
          </Button>
        </form>
        <Link variant="body2" href="/login">
          Already have an account? Sign in
        </Link>
      </div>
    </div>
  );
}
