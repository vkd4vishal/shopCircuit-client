import { Button, Rating, TextField, Typography } from "@mui/material";
import { StyleRules, WithStyles, withStyles } from "@mui/styles";
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import AlertForm from "../common/Alert/Alert";

import Cookies from "universal-cookie";
// import RatingAndReviewBoxForm from "./ratingAndReviewBox";
const styles: StyleRules = {
  reviewTextField: {
    width: "25%",
  },
  ratingText: {
    fontSize: "30px",
  },
  submitButton: {
    marginTop: "10px",
  },
  InputRatingAndReview: {},
};

interface ratingAndReviewProp extends WithStyles<typeof styles> {}
const RatingAndReviewView: React.FC<ratingAndReviewProp> = ({ classes }) => {
  const navigate = useNavigate();
  useEffect(() => {
    getItemRating()
},[]);
  const toReviewList=()=>{
    navigate('/ratingList');
      }
      const [success, setSuccess] = React.useState(false);
      const [failure, setFailure] = React.useState(false);
      const [serverData, setServerData] = React.useState("");

  const [ratingCount, setRating] = React.useState(0);
  const [review, setReview] = React.useState("");
  const [ratingId,setRatingId]=React.useState("");
  const cookies = new Cookies();
  const headers = {
    token:
    cookies.get("token"),
    itemId: "61a1da9bcd436d7b3860aac9",
  };
  var getItemRating = () => {
    return axios({
      method: "get",
      url: "/getRatingAndReviews",
      params: {
        isSeller: false,
        itemId: "61a1da9bcd436d7b3860aac9",
      },
    })
      .then((resp) => {
        // setRatingReviewResponse(resp.data.data.data.data[0])
        // console.log(ratingReviewResponse[0].rating)
        const currRating :any=resp.data.data.data.data[0].rating??0
        const currReview :any=resp.data.data.data.data[0].review??''
        setRatingId(resp.data.data.data.data[0]._id)
        console.log(currRating,currReview)
        setReview(currReview)
        setRating(currRating)
        console.log(ratingCount,review)
      })
      .catch((error: any) => {
        setFailure(true);
        setServerData('UNKNOWN SERVER ERROR');
      });
  };
  
  

  // console.log(ratingReviewResponse)
  const postItemRating = () => {
    axios({
      method: "post",
      url: "/saveRatingAndReviews",
      headers: { ...headers },
      params: {
        isSeller: false,
      },
      data: {
        review: review, // This is the body part
        rating: ratingCount,
      },
    }).then((res)=>{
      setServerData(res.data.message);
      setSuccess(true);
      // getItemRating()
      setTimeout(()=>{
        toReviewList()

      },2000)
    })
    .catch((error: any) => {
      // setServerData(error??'UNKNOWN SERVER ERROR');
      setFailure(true);
      setServerData('UNKNOWN SERVER ERROR');
  })
}
  const deleteItemRating = () => {
    axios({
      method: "delete",
      url: "/deleteRatingAndReviews",
      headers: { ...headers ,reviewId:ratingId},
      params: {
        isSeller: false,
      },
    }).then((res)=>{
      setSuccess(true);
      setServerData(res.data.message);
      setTimeout(()=>{
        getItemRating()
        toReviewList()      
      },2000)
     
    }).catch((error: any) => {
      setFailure(true);
      setServerData('UNKNOWN SERVER ERROR');
    });
    
  };
  function textFieldChange(e: any) {
    console.log(e.target.value);
    setReview(e.target.value);
  }
  // const handleClose = () => {
  //   setSuccess(false);
  //   setFailure(false);
  // };
  // var list = ratingReviewResponse.map(function(each){
  //   return <li>{name}</li>;
  // })
  return (
    <div className={classes.root}>
      <AlertForm setSuccess={setSuccess} setFailure={setFailure} isSuccess={success} message={serverData} show={success || failure}/>
      <div className={classes.InputRatingAndReview}>
      
        <div>
          <Typography component="legend" className={classes.ratingText}>
            Rating
          </Typography>
          <Rating
            name="simple-controlled"
            value={ratingCount}
            onChange={(event, newValue) => {
              setRating(newValue ?? 0);
            }}
          />
        </div>
        <div>
          <TextField
            id="outlined-multiline-static"
            label="Review"
            multiline
            rows={4}
            value={review}
            placeholder="Write your review here"
            InputLabelProps={{ shrink: true }}
            className={classes.reviewTextField}
            onChange={textFieldChange}
          />
          <br />
          <Button
            variant="contained"
            onClick={postItemRating}
            className={classes.submitButton}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            onClick={deleteItemRating}
            className={classes.submitButton}
          >
            delete
          </Button>
        </div>
      </div>
    </div>
  );
};

const RatingAndReviewForm = withStyles(styles)(RatingAndReviewView);
export default RatingAndReviewForm;
