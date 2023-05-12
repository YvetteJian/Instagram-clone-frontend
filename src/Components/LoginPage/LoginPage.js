import { Grid } from '@mui/material';
import React,{Component} from 'react';
import inst_image from '../../images/9364675fb26a.svg';
import inst_logo from '../../images/logoinsta.png';
import fb from '../../images/fb.png';
import appstore from '../../images/app.png';
import playstore from '../../images/play.png';
import './LoginPage.css';
import SignIn from '../SingnIn/SignIn';
import SignUp from '../SignUp/SignUp';


class LoginPage extends Component{
    constructor(props){
        super(props);
        this.state = { 
            isLogin: true
        }
    }

    changeLogin = ()=>{
        if (this.state.isLogin){
            this.setState({
                isLogin:false
            });
        }
        else{
            this.setState({
                isLogin:true
            });
        }
    }
    render(){
        return( 
            <div>
                <Grid container> 
                    <Grid item xs={3}></Grid>
                    <Grid item xs={6}>
                        <div className='loginPage_main'>
                            <div>
                                <img src={inst_image} width="454px" />
                            </div>
                            <div>
                                <div className='loginpage_rightcomponent'>
                                    <img className='loginPage_logo' src={inst_logo} width="454px" />
                                    <div className='loginPage_signin'>
                                       { this.state.isLogin ?
                                       <SignIn />:
                                       <SignUp />
                                       }

                                        <div className='login_ordiv'>
                                            <div className='login_dividor' ></div>
                                            <div className='login_or'>OR</div>
                                            <div className='login_dividor'></div>
                                        </div>
                                        <div className='login_fb'>
                                        <img src={fb} width="15px" style={{"marginRight":"5px"}} />Log in with Facebook</div>
                                        <div className='login_forgot'>Forgot password?</div>
                                    </div>
                                </div>
                                <div className='loginpage_signupoption'>
                                   {
                                        this.state.isLogin ?
                                        <div className="loginPage_signin">
                                                 Don't have an account? <span onClick={this.changeLogin} style={{ "fontWeight":"bold", "color":"#0395F6"}}>Sign up</span>
                                        </div> :
                                        <div className="loginPage_signup">
                                                Have an account? <span onClick={this.changeLogin}  style={{ "fontWeight":"bold", "color":"#0395F6"}}>Sign in</span>
                                        </div>
                                    }
                                </div>
                                <div className='loginPage_downloadSection'>
                                    <div > 
                                        Get the app.
                                    </div>
                                    <div className="loginPage_option" >
                                        <img className="loginPage_dwimg" src={appstore} width="136px" />
                                        <img className="loginPage_dwimg" src={playstore} width="136px"  />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={3}></Grid>
                </Grid>
            </div>
        );
    }
}
export default LoginPage;