import { WithStyles, withStyles } from "@mui/styles";
const styles = {
  root: {
    height: "400px",
    borderTop: "1px solid black",
    marginTop: "500px",

  },
};
interface IFooterProp extends WithStyles<typeof styles> {}
const FooterFormView: React.FC<IFooterProp> = ({ classes }) => {
  return <div className={classes.root}>"shopCircuit" is owned & managed by SVS India Private Limited and is not related, linked or interconnected in whatsoever manner or nature, to “shopCircuit.com” which is a real estate services business.</div>;
};

const Footer = withStyles(styles)(FooterFormView);
export default Footer;
