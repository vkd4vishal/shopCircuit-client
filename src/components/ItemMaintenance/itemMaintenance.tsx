import { WithStyles, withStyles } from "@mui/styles";
import { useLocation } from "react-router-dom";
const styles = {
  root: {
    height: "400px",
    width: "600px",
  },
  loginButton: {
    color: "red",
  },
};
interface ItemMaintenanceProp extends WithStyles<typeof styles> {}
const ItemMaintenanceFormView: React.FC<ItemMaintenanceProp> = ({ classes }) => {
  const {state}:{state:any} = useLocation();
  const id = state.id;
  return <div className={classes.root}>
    <p>{id}</p>
  </div>;
};

const ItemMaintenanceForm = withStyles(styles)(ItemMaintenanceFormView);
export default ItemMaintenanceForm;
 