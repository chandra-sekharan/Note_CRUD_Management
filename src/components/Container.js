import React, { useEffect, useState } from "react";
import Header from "./header";
import { db } from "./FireBase";
import {uid} from 'uid';
import { set ,ref, onValue, remove, update } from "firebase/database";
import { Button} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TextField from '@material-ui/core/TextField';
import './styles/dashboard.css';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Loader from "./loader";

const Container = ({userDetails})=>{
    
   const [title , setTitle] =useState();
   const [desc , setDesc]=useState();
   const [Data , setData]=useState(false);
   const [Notes , setNotes]=useState([]);
   const [tempUid,setTempuid]=useState("");
   const [isEdit,setIsEdit] = useState(false);
   const [alertMsg , setAlertMsg] = useState('');
   const [loading , setloading] = useState(false);

   //open note form
const openNoteform=()=>{
    var note = document.getElementsByClassName('note_form')[0];    
     note.style.display="grid" ;
   }

  //close note form 
const closeNoteform = ()=>{
    var note = document.getElementsByClassName('note_form')[0];
     note.style.display="none" ;
    setIsEdit(false);
    setTitle('');
    setDesc('');
 }
  
 //close alert snackbar
 const handleClosebar=()=>{
   setData(false);
 }
  
 // add notes
const addNote=()=> {
    const date = new Date();
    const data = {
      Title:title,
      Descript:desc,
      date: date.toLocaleDateString()
      }
    console.log(data)
    const account_uid=userDetails.user.uid;
    const uuid = uid();
    set(ref(db,`/${account_uid}/${uuid}`),{
        data,
        uuid
       }).then(()=>{
         setTitle('');
         setDesc('');
         setData(true)
         setAlertMsg("Note Created Successfully");
         closeNoteform();
       })

  }  
       
 //read notes

useEffect(()=>{
   setloading(true)
  const account_uid=userDetails.user.uid;

  onValue(ref(db ,`/${account_uid}`), (snapshot)=>{
    const data = snapshot.val();
    if(data !==null)
    {
      let arrData = Object.keys(data)
      let list=[];
      arrData.map(key=>list.push(data[key]))

      setNotes(list)  

      
    }
    setloading(false)
    })
      
    })

  // delete notes
const deleteNote = (note)=>{
  const account_uid=userDetails.user.uid; 
  remove(ref(db , `/${account_uid}/${note.uuid}`))

}
   
//edit notes
const editNote = (note)=>{
   setTempuid(note.uuid);
   setTitle(note.data.Title);
   setDesc(note.data.Descript);
   setIsEdit(true);
   }


const updateNote=()=>{
  const date = new Date();

  const data = {
     Title:title,
     Descript:desc,
     date: date.toLocaleDateString()
    }
    
  const account_uid=userDetails.user.uid;
  update(ref(db,`/${account_uid}/${tempUid}`),{
    data,
    tempUid
    }).then(()=>{
      setTitle('');
      setDesc('');
      setData(true)
      setAlertMsg("Note Updated Successfully");
      closeNoteform();
    })

  }
    
    return(
       <>
          <Header userDetails={userDetails} />
         <div>
           <Snackbar open={Data} anchorOrigin={{ vertical:'top', horizontal:'center' }} autoHideDuration={6000} onClose={handleClosebar}>
            <Alert onClose={handleClosebar} severity="success">
             {alertMsg}
            </Alert>
           </Snackbar>
            <AddCircleIcon onClick={openNoteform} className="add_icon" fontSize="large"/>
            <form className="note_form">
            <i onClick={closeNoteform}>&times;</i>
            <h2><center>NOTE APPLICATION</center></h2>
            <TextField id="outlined-basic" label="Title" variant="outlined" value={title}  onChange={(e)=>setTitle(e.target.value)} />
            <TextField id="standard-multiline-flexible"  className="text_field" value={desc} maxRows={6} label="Description"  variant="outlined" onChange={(e)=>setDesc(e.target.value)} />
            {isEdit ? 
            <Button onClick={updateNote} variant="contained" color="primary">Update</Button>
            :<Button onClick={addNote} variant="contained" color="primary">Submit</Button>
            }
            <br></br>
            </form>
            {loading ? <Loader/>:
            <div className="note_section">
               {Notes.map(note=>
                <Card className="note_card">
                <CardContent>
                <Typography variant="h5" component="h2">
                {note.data.Title}
                </Typography>
                <Typography variant="body2" className="description" component="p">
                {note.data.Descript}
                </Typography>
                <Typography className="date" variant="body2" color="primary" component="b">
                {note.data.date}
                </Typography>
                </CardContent>
                <CardActions>
                <Button onClick={()=>editNote(note)} onClickCapture={openNoteform} size="small"><EditIcon className="custom_icons"/></Button>
                <Button onClick={()=>deleteNote(note)} size="small"><DeleteForeverIcon className="custom_icons"/></Button>
                </CardActions>
                </Card>
                )}
             </div> 
             }
    
          </div>
          
        </>
        )
}

export default Container
