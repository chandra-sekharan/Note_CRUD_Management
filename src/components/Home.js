import React, { useState } from "react";
import './styles/home.css';
import { Button } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TextField from '@material-ui/core/TextField';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from './FireBase';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import {GoogleAuthProvider} from 'firebase/auth';
import {signInWithPopup} from 'firebase/auth';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';

const Home = ({setDetails})=>{

    const navigate = useNavigate();
    const [regModalopen, setRegistermodal] = useState(false);
    const [loginModelopen, setLoginmodal] = useState(false);
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [confirmPassword , setConfirm] = useState('');
    const [success,setSuccess] = useState(false);
    const [fail,setFail] = useState(false);
    const [errMsg , setErr] = useState('');
    const [alertMsg , setAlertMsg] =useState("");
    
    //Dailog box open and close methods    
  
    const handleopen = () => {
        setRegistermodal(true);
      };
    
    const handleLogin=()=>{
        setLoginmodal(true);
      }

    const handleCloseModal = () => {
        setRegistermodal(false)
        setLoginmodal(false)
    };
  //method used to close alert snack bar
   const handleClosebar = ()=>{
        setSuccess(false);
        setFail(false);
        
      };

      
//Registration with email and password
const handleRegister = async (e) =>{
    e.preventDefault()
    if(password !== confirmPassword){
       alert("Pasword Mismatch")
     }else{
        try{
             const result = await createUserWithEmailAndPassword(auth,email,password);              setSuccess(true);
               setAlertMsg("Registration Success");
               localStorage.setItem('NoteManagement' , JSON.stringify(result));       
               setDetails(result);

             setTimeout(()=>{
                 navigate('/dashboard')
              },1200)
      
            }
            catch (error){
              setFail(true);
              setAlertMsg("Registration Failed");
              setErr(error);
            }
      }
  }
   // Login validation 
    const loginValidation = async (e) =>{
        e.preventDefault()
        if(!email ||  !password){
            alert("Details Required")
        }else{
            try{
               const result = await signInWithEmailAndPassword(auth,email,password);
                 setSuccess(true);
                 setAlertMsg("Login Success");
                 localStorage.setItem('NoteManagement' , JSON.stringify(result));       
                 setDetails(result)
               setTimeout(()=>{
                  navigate('/dashboard')
                },1200)
      
              }
              catch (error){
                 setFail(true);
                 setAlertMsg("Login Failed");
                 setErr(error);
               }
        }
    }

    //Google Authentication

  const googleAuthentication = () =>{
     const google = new GoogleAuthProvider();

      signInWithPopup(auth , google).then(res=> {
          setSuccess(true);
          setAlertMsg("Login Success");
          localStorage.setItem('NoteManagement' , JSON.stringify(res));       
          setDetails(res);

           setTimeout(()=>{
              navigate('/dashboard')
           },1200)
       })
   }

    return(
     <div className="home_container">
        {/*Alert snackbars */}
            <Snackbar open={fail} anchorOrigin={{ vertical:'top', horizontal:'center' }} autoHideDuration={6000} onClose={handleClosebar}>
             <Alert onClose={handleClosebar} severity="error">
              {alertMsg + " "+ errMsg}
             </Alert>
            </Snackbar>
            <Snackbar open={success} anchorOrigin={{ vertical:'top', horizontal:'center' }} autoHideDuration={6000} onClose={handleClosebar}>
             <Alert onClose={handleClosebar} severity="success">
              {alertMsg}
             </Alert>
            </Snackbar> 
          {/*registration box */}
          <Dialog open={regModalopen}  aria-labelledby="form-dialog-title">
            <div>
                <CancelIcon onClick={handleCloseModal} className="cancel"/>
                <AccountCircleIcon fontSize="large" className="account_circle"/>
               <form className="register">
                 <TextField required className="textfield" label="Enter Email" type="email" onChange={(e)=>setEmail(e.target.value)} />
                 <TextField required className="textfield" label="Enter Password" type="password" onChange={(e)=>setPassword(e.target.value)}  />
                 <TextField  required className="textfield" label="Confirm Password" type="password" onChange={(e)=>setConfirm(e.target.value)} />
                 <Button variant="contained" size="medium" color="primary" onClick={handleRegister} >Register</Button>
                 or 
                 <Button className="continue_google" onClick={googleAuthentication} variant="contained" size="medium"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                 width="30" height="30"
                 viewBox="0 0 48 48">
                 <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                 </svg>Continue With Google</Button><br/>
               </form>
             </div>
         </Dialog>
         {/*Login box */}
           <Dialog open={loginModelopen}  aria-labelledby="form-dialog-title">            
              <div>
                <CancelIcon onClick={handleCloseModal} className="cancel"/>
                <AccountCircleIcon fontSize="large" className="account_circle"/>
                <form className="register">
                 <TextField className="textfield" label="Enter Email" onChange={(e)=>setEmail(e.target.value)} type="email"  />
                 <TextField className="textfield" label="Enter Password" onChange={(e)=>setPassword(e.target.value)} type="password"  />
                 <Button variant="contained" size="medium" color="secondary" onClick={loginValidation} >Login</Button>
                  or 
                 <Button className="continue_google" onClick={googleAuthentication} variant="contained" size="large"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                 width="30" height="30"
                 viewBox="0 0 48 48">
                 <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                 </svg>Continue With Google</Button><br/>
               </form>
             </div>
          </Dialog>
          {/*home section */}
            <div className="home_section">
            <Typography className="home_head" variant="h2" component="h2">
            NOTE APPLICATION
            </Typography>
            
            <Button variant="contained" size="large" color="secondary" onClick={handleLogin}>Login</Button>
            <Button variant="contained" size="large" color="primary" onClick={handleopen}>Register</Button>
            </div>
            
      </div>
    )
}

export default Home;