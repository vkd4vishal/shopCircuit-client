import { Button, TextField } from "@mui/material";
import { StyleRules, WithStyles, withStyles } from "@mui/styles";
// import SearchBar from "material-ui-search-bar";
import React from "react";
const styles: StyleRules = {
  root:{
    marginLeft: "35%",
    "& .css-1u3bzj6-MuiFormControl-root-MuiTextField-root":{
      width: "57%",
    "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root ":{
      borderRadius:"57px"
    }
    }
  }
};

interface searchBarProp extends WithStyles<typeof styles> {
  setIsSearch:(value:string)=>void
  label: string 
}
const SearchBarView: React.FC<searchBarProp> = ({ classes,setIsSearch,label }) => {
    const [search,setSearch]=React.useState("")
  return (
    <div className={classes.root}>
      <TextField
          variant="outlined"
          label={label}
          type="text"
          className={classes.search}
          value={search}
          onChange={(e)=>{ setSearch(e.target.value)}}
          onKeyPress={(ev:any) => {
            if(ev.key === 'Enter'){
                setIsSearch(search)
            }
          }}
        />
        <Button onClick={()=>{
          setSearch("")
          setIsSearch("")
          }}>CLEAR</Button>
    </div>
  );
};

const SearchBarForm = withStyles(styles)(SearchBarView);
export default SearchBarForm;
