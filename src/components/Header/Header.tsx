import { WithStyles, withStyles } from "@mui/styles";
const styles = {
  root: {
    height: "400px",
  },
  loginButton: {
    color: "red",
  },
};
interface IHeader extends WithStyles<typeof styles> {}
const HeaderView: React.FC<IHeader> = ({ classes }) => {
  return <div className={classes.root}>
      SHO
  </div>;
};

const Header = withStyles(styles)(HeaderView);
export default Header;
