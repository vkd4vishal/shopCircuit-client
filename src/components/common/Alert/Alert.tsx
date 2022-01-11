// import SearchBar from "material-ui-search-bar";
import { Alert, Snackbar } from "@mui/material";
import { StyleRules, WithStyles, withStyles } from "@mui/styles";
import React from "react";

const styles: StyleRules = {

};

interface AlertProp extends WithStyles<typeof styles> {
    setSuccess:(value:boolean)=>void
    setFailure:(value:boolean)=>void
    isSuccess:boolean
    message:string
    show:boolean
}
const AlertView: React.FC<AlertProp> = ({ classes,setSuccess,setFailure ,isSuccess,message,show}) => {
    // const [search,setSearch]=React.useState("")
    // const [failure, setFailure] = React.useState(false);

    const handleClose = () => {
        setSuccess(false);
        setFailure(false);
      };
  return (
    <div className={classes.root}>
        <Snackbar
      open={show}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{horizontal:'right',vertical:'top'}}
    >
      <Alert
        onClose={handleClose}
        severity={isSuccess ? "success" : "error"}
        sx={{ width: "100%" }}
        variant="filled"
      >
        {message}
      </Alert>
    </Snackbar>
    </div>
  );
};

const AlertForm = withStyles(styles)(AlertView);
export default AlertForm;
