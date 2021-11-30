import { WithStyles, withStyles } from "@mui/styles";
import FooterForm from "../Footer/Footer";
import LoginForm from "../LoginPage/Login";

const styles = {
  root: {
    height: "100%",
  },
  loginButton: {
    color: "red",
  },
};
interface IHomePage extends WithStyles<typeof styles> {}
const HomePageView: React.FC<IHomePage> = ({ classes }) => {
  return (
    <div className={classes.root}>
      <LoginForm />
      <FooterForm />
    </div>
  );
};

const HomePage = withStyles(styles)(HomePageView);
export default HomePage;
