import { WithStyles, withStyles } from "@mui/styles";
const styles = {
  root: {
  
  },
};
interface loginProp extends WithStyles<typeof styles> {}
const loginFormView: React.FC<loginProp> = ({ classes }) => {
  return <div className={classes.root}>
    
  </div>;
};

const loginForm = withStyles(styles)(loginFormView);
export default loginForm;
