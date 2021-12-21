import { TextField } from "@mui/material";
import { StyleRules, WithStyles, withStyles } from "@mui/styles";
// import SearchBar from "material-ui-search-bar";
import React from "react";
const styles: StyleRules = {

};

interface searchBarProp extends WithStyles<typeof styles> {
  setIsSearch:(value:string)=>void
}
const SearchBarView: React.FC<searchBarProp> = ({ classes,setIsSearch }) => {
    const [search,setSearch]=React.useState("")
  return (
    <div className={classes.root}>
      <TextField
          variant="outlined"
          label="Search"
          type="text"
          className={classes.search}
          value={search}
          onChange={(e)=>{ setSearch(e.target.value)}}
          onKeyPress={(ev:any) => {
            console.log(search)
            if(ev.key === 'Enter'){
                setIsSearch(search)
            }
          }}
        />
    </div>
  );
};

const SearchBarForm = withStyles(styles)(SearchBarView);
export default SearchBarForm;
