import { Box, CircularProgress } from "@mui/material";
import { StyleRules, WithStyles, withStyles } from "@mui/styles";
// import SearchBar from "material-ui-search-bar";
import React, { useContext } from "react";
import { loaderContext } from "./loaderContext";
const styles: StyleRules = {};

interface LoaderProp extends WithStyles<typeof styles> {}
const LoaderView: React.FC<LoaderProp> = ({ classes }) => {
  const value = useContext(loaderContext);
  return (
    <div className={classes.root}>
      {value.loader && (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
    </div>
  );    
};

const LoaderForm = withStyles(styles)(LoaderView);
export default LoaderForm;
