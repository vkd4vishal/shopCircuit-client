import { WithStyles, withStyles, StyleRules  } from "@mui/styles";
import FooterForm from "../Footer/Footer";
import Header from "../Header/Header";
// import homePageBackground from '../../images/homePageBackground.jpg'
const styles: StyleRules  = { 
  root: {
    height: "100%",
    // height: "400px",
  },
  footer: {
    color: "red"
  },
  shopCircuitMessage:{
    display:"flex",
    width:"30%",
    marginLeft:"6%",
    lineHeight:"2",
    marginTop:"10%",
    textAllign:"left" ,
    borderRadius: "5%",
    background: "rgba(0, 128, 0, 0.5)",
    color: "white",
    fontWeight: "bolder",
    padding: "10px",
    fontStyle: "italic"
  }
};
interface IHomePage extends WithStyles<typeof styles> {}
const HomePageView: React.FC<IHomePage> = ({ classes }) => {
  return (
    <div className={classes.root} style={{ backgroundImage: `url(/homePageBackground.jpg)` }}>
      <Header/>
      <div className={classes.shopCircuitMessage}>
      ShopCircuit: Delivering Happiness
      What's better than having stores at your home?
      Yes you read that right. With shopCircuit it is always easier to handle big parties, where you can save your shopping time and shake your body at home. A call, a few clicks on our website or a few touches on the mobile screen is all you have to do to have your needs at your doorstep.
      There is something for everyone here. Groceries items,medical items,electrical items,books and many more.
      </div>
      
      <FooterForm />
    </div>
  );
};

const HomePage = withStyles(styles)(HomePageView);
export default HomePage;
