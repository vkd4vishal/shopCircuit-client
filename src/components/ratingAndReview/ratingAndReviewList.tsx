import { Button, Stack } from "@mui/material";
import { StyleRules, WithStyles, withStyles } from "@mui/styles";
import axios from "axios";
// import SearchBar from "material-ui-search-bar";
import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import SearchBarForm from "../searchBar/searchBar";
import RatingAndReviewBoxForm from "./ratingAndReviewBox";
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

interface ratingAndReviewListProp extends WithStyles<typeof styles> {}
const RatingAndReviewListView: React.FC<ratingAndReviewListProp> = ({ classes }) => {
    const navigate = useNavigate();
    const [search,setSearch]=React.useState("")

    const toCreateReview=()=>{
      navigate('/rating',{state:{id:1,name:'sabaoon'}});
        }
  const [ratingReviewResponse,setRatingReviewResponse]=React.useState([]);
  const getItemRating = (search?:string) => {
    axios({
      method: "get",
      url: "/getRatingAndReviews",
      params: {
        isSeller: false,
        itemId: "61a1da9bcd436d7b3860aac9",
        search
      },
    })
      .then((resp) => {
        console.log(resp.data.data.data.data)
        setRatingReviewResponse(resp.data.data.data.data)
      })
      .catch((error: any) => console.log("error", error));
  };
  useEffect(() => {
    getItemRating(search)
}, [search]);

  return (
    <div className={classes.root}>
        <SearchBarForm setIsSearch={setSearch}/>
       <br/>
    <Button variant="outlined" onClick={()=>{toCreateReview()}}>Edit Review</Button>

      <div>
      <Stack  spacing={1}>
                {ratingReviewResponse.map((each:any,index:number)=>{
                    return <div key ={index}><RatingAndReviewBoxForm   userName={each.user.userName}  rating={each.rating} review={each.review} /></div>
                  })}
            </Stack>
      </div>
    </div>
  );
};

const RatingAndReviewListForm = withStyles(styles)(RatingAndReviewListView);
export default RatingAndReviewListForm;
