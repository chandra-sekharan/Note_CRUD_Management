import React ,{useState} from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import './styles/dashboard.css';
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import {auth} from './FireBase'; 

const Header= ({userDetails})=>{

   const navigate = useNavigate();
   const [openProfile,setOpen] =useState(false);
  
     
const handleProfile=()=>{
  setOpen(true);
}

const profileClose=()=>{
setOpen(false)

}


const Logout = () =>{
   signOut(auth)
   alert("Logout success");
   localStorage.setItem('NoteManagement' , JSON.stringify(''));       
   navigate('/');
  }

  return(
      <>
       <AppBar position="static">
         <Toolbar>
           <Typography variant="h6" >
            Dashboard
           </Typography>
            <div className="profile_section">
               <IconButton aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleProfile} color="inherit">
                <AccountCircle />
               </IconButton>
               <Menu id="menu-appbar" anchorOrigin={{vertical: 'top',horizontal: 'right',}} keepMounted transformOrigin={{vertical: 'top', horizontal: 'right',}} open={openProfile} onClick={profileClose}>
                <MenuItem>{userDetails.user.displayName ? userDetails.user.displayName: userDetails.user.email}</MenuItem>
                <MenuItem onClick={Logout}>Logout</MenuItem>
               </Menu>
            </div>
          </Toolbar>
       </AppBar>
        </>
    );
}

export default Header