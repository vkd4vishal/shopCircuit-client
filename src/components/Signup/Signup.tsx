// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Avatar from "@mui/material/Avatar";
// import Grid from '@mui/material/Grid';
// import pexels from "../../Images/pexels.jpeg";
// import Box from "@mui/material/Box";
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
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
      <div
          style={{ backgroundImage: `url(/background.jpg)`,
      backgroundPosition: 'center',
      backgroundSize: 'fill',
      backgroundRepeat: 'no-repeat'
    
    }}
      >
        <div className="formComp"
        style={{ "width" : "25%",
        "margin":"auto",
        "paddingTop":"30px",
        "backgroundColor":"white",
        "paddingLeft":"30px",
        "paddingRight":"30px",
        "paddingBottom":"30px",
        "borderRadius":"4%",
        "opacity":"0.8"
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
            label="username"
            autoFocus
            size="small"
            style={{ marginTop: "10px" }}
          />
          <TextField
            required
            fullWidth
            id="firstName"
            label="first Name"
            name="firstName"
            size="small"
            autoComplete="first-name"
            style={{ marginTop: "10px" }}
          />
          <TextField
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            size="small"
            autoComplete="family-name"
            style={{ marginTop: "10px" }}
          />
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            size="small"
            autoComplete="email"
            style={{ marginTop: "10px" }}
          />
          <TextField
            required
            fullWidth
            id="aadharNumber"
            label="Aadhaar Number"
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
          <Link href="#" variant="body2">
            Already have an account? Sign in
          </Link>
          </div>
      </div>
  //   <div
  //   style={{ backgroundImage: `url(/background.jpg)`,
  //     backgroundPosition: 'center',
  //     backgroundSize: 'cover',
  //     backgroundRepeat: 'no-repeat'
    
  //   }}
  //   >
  //   <Container
  //     component="main"
  //     maxWidth="xs"
  //     style={{backgroundColor:"white",
  //   borderRadius:"5px"
  // }}
  //   >
  //     {/* <CssBaseline /> */}
  //     <Box
  //       sx={{
  //         marginTop: 8,
  //         display: "flex",
  //         flexDirection: "column",
  //         alignItems: "center",
  //       }}
  //     >
  //       <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
  //         <LockOutlinedIcon />
  //       </Avatar>
  //       <Typography component="h1" variant="h5">
  //         Sign Up
  //       </Typography>
  //       <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
  //         <TextField
  //           autoComplete="given-name"
  //           name="username"
  //           required
  //           fullWidth
  //           id="username"
  //           label="username"
  //           autoFocus
  //           size="small"
  //           style={{ marginTop: "10px" }}
  //         />
  //         <TextField
  //           required
  //           fullWidth
  //           id="firstName"
  //           label="first Name"
  //           name="firstName"
  //           size="small"
  //           autoComplete="first-name"
  //           style={{ marginTop: "10px" }}
  //         />
  //         <TextField
  //           required
  //           fullWidth
  //           id="lastName"
  //           label="Last Name"
  //           name="lastName"
  //           size="small"
  //           autoComplete="family-name"
  //           style={{ marginTop: "10px" }}
  //         />
  //         <TextField
  //           required
  //           fullWidth
  //           id="email"
  //           label="Email Address"
  //           name="email"
  //           size="small"
  //           autoComplete="email"
  //           style={{ marginTop: "10px" }}
  //         />
  //         <TextField
  //           required
  //           fullWidth
  //           id="aadharNumber"
  //           label="Aadhaar Number"
  //           name="aadharNumber"
  //           size="small"
  //           autoComplete="aadharNumber"
  //           style={{ marginTop: "10px" }}
  //         />
  //         <TextField
  //           required
  //           fullWidth
  //           id="address"
  //           label="address"
  //           name="address"
  //           size="small"
  //           autoComplete="address"
  //           style={{ marginTop: "10px" }}
  //         />
  //         <TextField
  //           required
  //           fullWidth
  //           name="password"
  //           label="Password"
  //           type="password"
  //           id="password"
  //           size="small"
  //           autoComplete="new-password"
  //           style={{ marginTop: "10px" }}
  //         />
  //         <TextField
  //           required
  //           fullWidth
  //           name="Confirmpassword"
  //           label="Confirmpassword"
  //           type="Confirmpassword"
  //           id="Confirmpassword"
  //           size="small"
  //           autoComplete="Confirm password"
  //           style={{ marginTop: "10px" }}
  //         />
  //         <FormControlLabel
  //           control={
  //             <Checkbox
  //               value="seller"
  //               color="primary"
  //               name="seller"
  //               onClick={handleClick}
  //             />
  //           }
  //           label="are you a seller?."
  //           style={{ marginTop: "10px" }}
  //         />
  //         <Button
  //           type="submit"
  //           fullWidth
  //           variant="contained"
  //           sx={{ mt: 3, mb: 2 }}
  //           style={{ marginTop: "10px" }}
  //         >
  //           Sign Up
  //         </Button>
  //         <Link href="#" variant="body2">
  //           Already have an account? Sign in
  //         </Link>
  //       </Box>

  //       <Copyright sx={{ mt: 5 }} />
  //     </Box>
  //   </Container>
  //   </div>
  );
}
