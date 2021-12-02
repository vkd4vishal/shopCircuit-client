import { WithStyles, withStyles , StyleRules } from "@mui/styles";
import logo from "../../images/logo.svg";
const styles: StyleRules  = {
  root: {
    height: "60px",
    marginTop: 0,
    borderBottom: "1px solid black",
    display:"flex",
    backgroundColor:"white",
    position:'sticky',
    top:0,
    opacity: '1',
    zIndex: '1000'
  },
  logo: {
    height: "50px",
    display: "flex",
    paddingTop:"0.2%",
    paddingLeft:"3%"
  },
  headerIcons:{
      display: "flex",
      gap:"70px",
      paddingLeft:"20%",
      paddingTop:"1%"
  }
};
interface IHeader extends WithStyles<typeof styles> {}
const HeaderView: React.FC<IHeader> = ({ classes }) => {
  return (
    <div className={classes.root}>
      <img className={classes.logo} src={logo} alt="not fetched" />
      <div className={classes.headerIcons}>
        <div>
            CATEGORIES
        </div>
        <div>
            ITEMS
        </div>
        <div>
            NEARBY SHOP
        </div>
        <div>
            CONTACT
        </div>
      </div>
    </div>
  );
};

const Header = withStyles(styles)(HeaderView);
export default Header;
