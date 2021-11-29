import { WithStyles, withStyles } from "@mui/styles";
import { positions } from '@mui/system';
import logo from '../../images/logo.svg'
const styles = {
  root: {
    height: "150px",
    marginTop: 0
  },
  logo:{
      height:"50px",
      background: '#FE6B8B',
      alignItems: 'flex-end',
      positions: 'left'
      }
};
interface IHeader extends WithStyles<typeof styles> {}
const HeaderView: React.FC<IHeader> = ({ classes }) => {
  return (
    <div className={classes.root}>
      <img className={classes.logo} src={logo} alt="not fetched" />

    </div>
  );
};

const Header = withStyles(styles)(HeaderView);
export default Header;
