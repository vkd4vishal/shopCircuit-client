// import DeleteIcon from '@mui/icons-material/Delete';
import {  Rating } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { StyleRules, WithStyles, withStyles } from "@mui/styles";
import * as React from "react";

import profile from "../../Images/profile.png";
const styles : StyleRules = {
  root: {},
  image:{
    height: "40px",
    paddingLeft: "5px",
    borderRadius:"50%",
  },
  imageRatingContainer:{
    marginLeft:"20px"
  },
  ImageRatingMain:{
    display: "flex",
      flexDirection: "row",
  },
  userNameText:{
    marginLeft:"-62px"
  },
  rating:{
    marginTop:"27px",
    position:"absolute"
  },
  ratingAndUsername:{
    display: "flex",
      flexDirection: "column",
      marginLeft:"12px"
  }
};
interface RatingAndReviewBoxProp extends WithStyles<typeof styles> {
  userName:string,
  rating:string
  review:string

}
const RatingAndReviewBoxView: React.FC<RatingAndReviewBoxProp> = ({
  classes,userName,rating,review
}) => {
  
  return (
    <div className={classes.root}>
      <Card sx={{ maxWidth: 700 }}>
      <div className={classes.ImageRatingMain}>
      <div className={classes.imageRatingContainer}>
      <img className={classes.image} src={profile} alt="profile"/>
      </div>
      <div className={classes.ratingAndUsername}>
        <div>
      <Typography gutterBottom variant="h5" component="div" className={classes.userNameText}>
          {userName}
        </Typography>
        </div>
        <div className={classes.rating}>
        <Rating name="read-only"  size="small" value={Number(rating)} readOnly />
        </div>
      </div>
      </div>
      
      <CardContent>
        
        <Typography variant="body2" color="text.secondary">
          {review}
        </Typography>
      </CardContent>
      
      

    
      

    </Card>
    </div>
  );
};

const RatingAndReviewBoxForm = withStyles(styles)(RatingAndReviewBoxView);
export default RatingAndReviewBoxForm;
