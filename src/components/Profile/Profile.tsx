import { Button } from "@mui/material";
import { WithStyles, withStyles } from "@mui/styles";
import axios from "axios";
import React from "react";
const styles = {
  root: {},
  image: {
    height: "400px",
    paddingLeft: "5px",
  },
};
interface ProfileProp extends WithStyles<typeof styles> {}

const ProfileView: React.FC<ProfileProp> =  ({ classes }) => {
  const [fetched, setFetched] = React.useState(false);
  const [showImage, setShowImage] = React.useState({ source: "" });
  
  // const response = await Axios({
  //   url: "/getProfile",
  //   method: "GET",
  //   responseType: "stream",
  // });
  // console.log("response", response);
  //  response.data.pipe()
  const headers = {
    itemId: "61b065266822a02a735fe017",
  };

  const getUserImage = () => {
    axios
      .get("/getItemDetails", { headers,responseType: 'arraybuffer' })
      .then((response:any) => {
        const base64 = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            '',
          ),
        );
        setShowImage({ source: "data:;base64," + base64 });
        
        console.log(response.data)
        setFetched(true)
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={classes.root}>
      <Button onClick={getUserImage}>Click Me</Button>
      {/* <a href={`http://localhost:1234/getProfile`}>hello</a> */}
      {fetched && (
        <img
          className={classes.image}
          src={showImage.source}
          alt="facebook"
        />
      )}
    </div>
  );
};

const Profile = withStyles(styles)(ProfileView);
export default Profile;
