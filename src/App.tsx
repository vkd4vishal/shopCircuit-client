import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage/HomePage";
// import LoginForm from "./components/LoginPage/Login";
import SignUpForm from "./components/Signup/Signup";
import RatingAndReviewForm from "./components/ratingAndReview/ratingAndReview"
import RatingAndReviewListForm from "./components/ratingAndReview/ratingAndReviewList";
// import RatingAndReviewBoxForm from "./components/ratingAndReview/ratingAndReviewBox";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpForm login={()=>{}}/>}  />
          <Route  path="/rating" element={<RatingAndReviewForm/>}/>
          <Route  path="/ratingList" element={<RatingAndReviewListForm />}/>
          
          {/* <Route path="/login" element={<LoginForm />} /> */}
          {/* Lession always keep 404 route at last */}
          {/* <Route path="/" component={ErrorPage} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
