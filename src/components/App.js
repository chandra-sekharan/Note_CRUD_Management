import React, { useEffect, useState } from 'react';
import './styles/App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './Home';
import Dashboard from './Dashboard';

const App= ()=> {
  const [userDetails , setDetails]=useState('');
   

  useEffect(()=>{
    
    if(userDetails.length < 1)
    {    
      
      const userInform = localStorage.getItem('NoteManagement');
      if(userInform){
        setDetails(JSON.parse(userInform));
         
      }
      
    }
  },[])

  return (
    <BrowserRouter>
          <Routes>
             <Route path="/" element={<Home setDetails={setDetails}/>} />
              <Route path="/dashboard" element={<Dashboard userDetails={userDetails} setDetails={setDetails}/>} />
          </Routes>
    </BrowserRouter>
  );
}

export default App;
