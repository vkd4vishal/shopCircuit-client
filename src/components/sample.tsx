import { WithStyles, withStyles } from "@mui/styles";
const styles = {
  root: {
    height: "400px",
    width: "600px",
  },
  loginButton: {
    color: "red",
  },
};
interface loginProp extends WithStyles<typeof styles> {}
const loginFormView: React.FC<loginProp> = ({ classes }) => {
  return <div className={classes.root}></div>;
};

const loginForm = withStyles(styles)(loginFormView);
export default loginForm;
