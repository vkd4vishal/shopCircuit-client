import { Button } from "@mui/material";
import { WithStyles, withStyles } from "@mui/styles";
import axios from "axios";
const styles = {
  root: {},
};
interface ProfileProp extends WithStyles<typeof styles> {}

const ProfileView: React.FC<ProfileProp> = ({ classes }) => {
  const headers= {
    userid:'61adcc4f842e5b0f414463a8'
  }
  const getUserImage = ()=>{
    axios.get('/getProfile',{headers}).then(res=> console.log(res)).catch(err=> console.log(err))
  }
  return <div className={classes.root}>
    <Button onClick={getUserImage}>Click Me</Button>
  </div>
};

const Profile = withStyles(styles)(ProfileView);
export default Profile;
