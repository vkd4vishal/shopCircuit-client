import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage/HomePage";
// import LoginForm from "./components/LoginPage/Login";
import SignUp from "./components/Signup/Signup";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/login" element={<LoginForm />} /> */}
          {/* Lession always keep 404 route at last */}
          {/* <Route path="/" component={ErrorPage} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
