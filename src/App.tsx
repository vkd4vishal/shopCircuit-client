import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { loaderContext } from "./components/common/loader/loaderContext";
import HomePage from "./components/HomePage/HomePage";
import RatingAndReviewForm from "./components/ratingAndReview/ratingAndReview";
import RatingAndReviewListForm from "./components/ratingAndReview/ratingAndReviewList";
// import LoginForm from "./components/LoginPage/Login";
import SignUpForm from "./components/Signup/Signup";
// import RatingAndReviewBoxForm from "./components/ratingAndReview/ratingAndReviewBox";
function App() {
  const [loader, setLoader] = useState(false);

  // const value = useMemo(() => ({ loader, setLoader }), [loader, setLoader]);
  return (
    <>
      <Router>
      <loaderContext.Provider value={{ loader, setLoader }}>   
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpForm login={() => {}} />} />
            <Route path="/rating" element={<RatingAndReviewForm />} />
            <Route path="/ratingList" element={<RatingAndReviewListForm />} />
          </loaderContext.Provider>
        <Routes>
         

          {/* <Route path="/login" element={<LoginForm />} /> */}
          {/* Lession always keep 404 route at last */}
          {/* <Route path="/" component={ErrorPage} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
