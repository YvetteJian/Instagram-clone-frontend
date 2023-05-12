import React,{Component} from 'react';
import '../LoginPage/LoginPage.css';
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

class SignIn extends Component{
    constructor(props){
        super(props);
        this.state = { 
            emailId :null,
            password: null
            
        }
    }

    login = ()=>{

        signInWithEmailAndPassword(auth, this.state.emailId, this.state.password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            localStorage.setItem("users",JSON.stringify(user));
            window.location.reload();
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });

    }

    render(){
        return(
            <div>
                <input className='loginpage_text' type="text" onChange={(event)=>{ this.state.emailId = event.currentTarget.value;}} placeholder='Phone number, username, or email'/>
                <input className='loginpage_text' type="password" onChange={(event)=>{ this.state.password = event.currentTarget.value;}} placeholder='Password'/>
                <button className='loginpage_button' onClick={this.login}>Log In</button>

            </div>
         );
    }
}

export default SignIn;