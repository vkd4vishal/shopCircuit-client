import { StyleRules, WithStyles, withStyles } from "@mui/styles";
import React from "react";
import FooterForm from "../Footer/Footer";
import Header from "../Header/Header";
import LoginForm from "../LoginPage/Login";
import SignUpForm from "../Signup/Signup";
// import homePageBackground from '../../images/homePageBackground.jpg'
const styles: StyleRules = {
  root: {
    // height: "100%",
    // height: "400px",
    backgroundPosition: "center",
  },
  footer: {
    color: "red",
  },
  shopCircuitMessage: {
    width: "30%",
    lineHeight: "2",
    textAllign: "left",
    borderRadius: "5%",
    color: "white",
    fontWeight: "bolder",
    padding: "10px",
    fontStyle: "italic",
    marginLeft: "30%",
    height: "300px",
    marginTop: '20px'
  },
  content: {
    display: "flex",
    height: '900px',
    gap: "100px",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundImage: 'url("/background1080.jpg")',
    backgroundPosition: 'center',
    backgroundSize: '1920px 900px'
  },
};
interface IHomePage extends WithStyles<typeof styles> {}
const HomePageView: React.FC<IHomePage> = ({ classes }) => {
  const [loggedIn, setLoggedIn] = React.useState(false);
  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.content}>
        <div className={classes.shopCircuitMessage}>
          ShopCircuit: Delivering Happiness What's better than having stores at
          your home? Yes you read that right. With shopCircuit it is always
          easier to handle big parties, where you can save your shopping time
          and shake your body at home. A call, a few clicks on our website or a
          few touches on the mobile screen is all you have to do to have your
          needs at your doorstep. There is something for everyone here.
          Groceries items,medical items,electrical items,books and many more.
        </div>
      {loggedIn?<LoginForm login={setLoggedIn}/>:<SignUpForm login={setLoggedIn}/>}
      </div>

      <FooterForm />
    </div>
  );
};

const HomePage = withStyles(styles)(HomePageView);
export default HomePage;
