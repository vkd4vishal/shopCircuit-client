import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  TextField,
} from "@mui/material";
import { StyleRules, WithStyles, withStyles } from "@mui/styles";
import axios from "axios";
import React, { useContext } from "react";
import Link from "@mui/material/Link";
import Cookies from "universal-cookie";
import { loaderContext } from "../common/loader/loaderContext";
import AlertForm from "../common/Alert/Alert";
const styles = (): StyleRules => {
  return {
    root: {
      "& .MuiButton-root": {
        backgroundColor: "#4285F4",
      },
    },
    formContainer: {
      marginTop: "50px",
      height: "720px",
      width: "400px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      marginLeft: "auto",
      marginRight: "auto",
      justifyContent: "center",
      alignItems: "center",
      border: "1px solid cyan",
      borderRadius: "4px",
    },
    username: {
      width: "320px",
    },
    password: {
      width: "320px",
    },
    submitButton: {
      width: "80px",
      color: "red",
    },
    error: {
      color: "red",
      fontSize: "12px",
      margin: "0",
      padding: "0",
      marginLeft: "-20px",
    },
    none: {
      display: "none",
      fontSize: "12px",
      margin: "0",
      padding: "0",
    },
    headerText: {
      color: "#4285F4",
      fontSize: "18px",
    },
  };
};
interface ILoginProp extends WithStyles<typeof styles> {
  login: (value: boolean) => void; 
}
const LoginFormView: React.FC<ILoginProp> = ({ classes, login }) => {
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  
  const [failure, setFailure] = React.useState(false);
  const [serverData, setServerData] = React.useState("");
  const [nameErr, setNameErr] = React.useState(false);
  const [nameErrMsg, setNameErrMsg] = React.useState("");
  // const [loader, setLoader] = React.useState(false);
  const { loader, setLoader } = useContext(loaderContext);
  //Functions
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 20) {
      setNameErr(true);
      setNameErrMsg("Username of Email length must be < 20 characters");
    } else {
      setNameErr(false);
    }
    setUserName(e.target.value);
  };

  
  const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
    setLoader(true);
    e.preventDefault();
    if (nameErr) {
      alert(nameErrMsg);
    }
    var body;
    body = { password: password };
    if (isEmail(userName)) {
      body = { ...body, email: userName };
    } else {
      body = { ...body, userName: userName };
    }
    await axios
      .post("/login", body)
      .then((response) => {
        setServerData(response.data.message);
        setSuccess(true);
        const cookies = new Cookies();
        cookies.set("token", response.data.data.token, { path: "/" });
      })
      .catch((error) => {
        console.log(error)
        setFailure(true);
        setServerData(JSON.stringify(error.response.data.message));
      });
    setLoader(false);
  };

  const isEmail = (value: string) => {
    const regEx = new RegExp(/^\S+@\S+\.\S+$/);
    return regEx.test(value);
  };
  const handleClose = () => {
    setSuccess(false);
  };
  return (
    <div className={classes.root}>
     
     <AlertForm setSuccess={setSuccess} setFailure={setFailure} isSuccess={success} message={serverData} show={success || failure}/>
      <form className={classes.formContainer} onSubmit={handleSubmit}>
        <h3 className={classes.headerText}>Log in to ShopCircuit</h3>
        <TextField
          variant="outlined"
          label="Username or email"
          required
          className={classes.username}
          value={userName}
          onChange={handleNameChange}
        />
        <TextField
          variant="outlined"
          label="Password"
          type="password"
          required
          className={classes.password}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          className={classes.submitButton}
          type="submit"
          color="secondary"
        >
          Login
        </Button>
        <Link
          variant="body2"
          onClick={() => {
            login(false);
          }}
          style={{ cursor: "pointer" }}
        >
          Don't have an account? Create now.
        </Link>
      </form>
    </div>
  );
};

const LoginForm = withStyles(styles)(LoginFormView);
export default LoginForm;
