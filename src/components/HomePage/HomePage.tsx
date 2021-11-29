import { WithStyles, withStyles } from "@mui/styles";
import FooterForm from "../Footer/Footer";

const styles = {
  root: {
    height: "400px",
  },
  loginButton: {
    color: "red",
  },
};
interface IHomePage extends WithStyles<typeof styles> {}
const HomePageView: React.FC<IHomePage> = ({ classes }) => {
  return (
    <div className={classes.root}>
      <FooterForm />
    </div>
  );
};

const HomePage = withStyles(styles)(HomePageView);
export default HomePage;
