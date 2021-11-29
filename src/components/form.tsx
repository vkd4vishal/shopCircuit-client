import axios from 'axios'
import {WithStyles,withStyles} from '@mui/styles'
const styles = {
    root: {
        height:'400px',
        width:'600px',
    },
    loginButton:{
        color:'red'
    }
  };
interface loginProp extends WithStyles<typeof styles>{
}
const loginFormView: React.FC<loginProp>=({classes})=>{
    const login = ()=>{

        axios.get('/getItems').then((res:any)=>{
            console.log(res.data.data[0])
        })
    }
  return (
    <div className={classes.root}>
      Login Form
      <form>
        <button className={classes.loginButton} name="Login">LOgin</button>
      </form>
    </div>
  );
}

const loginForm = withStyles(styles)(loginFormView);
export default loginForm;


