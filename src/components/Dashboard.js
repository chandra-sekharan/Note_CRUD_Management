import React from "react";
import './styles/dashboard.css';
import Container from "./Container";

const Dashboard = ({userDetails})=>{
    
    return(
        <div>
         {userDetails ? 
        <Container userDetails={userDetails}/>
         : 'You are trying illegal attempt'}
        </div>
    )
}

export default Dashboard;