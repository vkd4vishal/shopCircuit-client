import { StyleRules, WithStyles, withStyles } from "@mui/styles";
import twitter from "../../Images/twitter.svg";
const styles: StyleRules = {
  root: {
    height: "50px",
    borderTop: "1px solid black",
  },
  image: {
    height: "40px",
    paddingLeft: "5px",
  },
  icons: {
    display: "flex",
    flexDirection: "row-reverse",
    padding: "5px",
  },
  rightsReserved: {
    borderTop: "1px solid black",
    display: "flex",
    flexDirection: "column",
    textAlign: 'center',
    lineHeight: '24px'
  },
  footerOptions: {
    display: "flex",
    flexDirection: "row",
    lineHeight: '24px',
    gap: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "1%",
    paddingBottom: "1%",
  },
};
interface IFooterProp extends WithStyles<typeof styles> {}
const FooterFormView: React.FC<IFooterProp> = ({ classes }) => {
  return (
    <div className={classes.root}>
      <div className={classes.footerOptions}>
        <div>
          COMPANY
          <div>
            <div>Blog</div>
            <div>Investor</div>
            <div>Feedback</div>
          </div>
        </div>
        <div>
          ABOUT
          <div>
            <div>Gift Card</div>
            <div>Inquiry</div>
            <div>FAQ</div>
          </div>
        </div>

        <div>
          LEGAL{" "}
          <div>
            <div>Disclaimer</div>
            <div>Terms & Conditions</div>
            <div>Privacy Policy</div>
          </div>
        </div>
        <div>
          CONNECT WITH US{" "}
          <div className={classes.icons}>
            <img
              className={classes.image}
              src="https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/1200px-Facebook_f_logo_%282021%29.svg.png"
              alt="facebook"
            />

            <img
              className={classes.image}
              src="https://www.svgrepo.com/show/303145/instagram-2-1-logo.svg"
              alt="instagram"
            />

            <img className={classes.image} src={twitter} alt="twitter" />
          </div>
        </div>
      </div>

      <div className={classes.rightsReserved}>
        All Rights Reserved. Copyright © ShopCircuit Ltd.
      </div>
    </div>
  );
};

const Footer = withStyles(styles)(FooterFormView);
export default Footer;
