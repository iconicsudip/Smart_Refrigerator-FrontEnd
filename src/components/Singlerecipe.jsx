import React from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useState,useContext } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { TextField } from '@mui/material';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Singlerecipe(props) {
    let {authToken} = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [edit,setEdit] = useState(1);
    const [deleteconfirm,setDeleteConfirm] = useState(false);
    const [loader,setLoader] = useState(false);
    const [recipename,setRecipename] = useState(props.recipe["recipe_name"])
    const temp_recipe_name = props.recipe["recipe_name"]
    const navigate =useNavigate();
    const handleClickOpen = (e) => {
        setOpen(true);
        //props.recipe["id"]
        if(e==='delete'){
            setDeleteConfirm(true)
        }else if(e==='1'){
            setEdit(1)
        }
    };
    const handleClose = () => {
        setOpen(false);
        setRecipename(temp_recipe_name)
        setEdit(1)
        setDeleteConfirm(false)
    };
    const setRecipeName=(e)=>{
        setRecipename(e.target.value)
    }
    const handleSave = (e)=>{
        console.log("saved")
    }
    const handleDelete=async (e)=>{
        setLoader(true)
        await fetch(`${process.env.REACT_APP_API}/api/recipedelete/${e.target.value}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+ String(authToken.access)
            },
        }).then(response=>response.json()).then(json=>{
            setLoader(false);
            if(json["alert"]){
                props.setMyrecipies([])
            }else{
                props.setMyrecipies(json)
            }
            props.setDeleteAlert(
                <div style={{width:"100%"}} className="alert alert-success" role="alert">
                    <b>Recive has been successfully deleted</b>
                    <button onClick={()=>{props.setDeleteAlert('')}} type="button" className="add-item close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            )
        })
        setOpen(false);
    }
    return (
        <>
        <div class="recipes-block style-three col-lg-3 col-md-6 col-sm-12">
            <div class="inner-box">
                <div class="image">
                    <Link to={`/myrecipies/recipe/${props.recipe['id']}`}><img src="assets/images/resource/entertaining-5.jpg" alt="" /></Link>
                </div>
                <div class="lower-content">
                    <div class="author-image"><img src="assets/images/resource/author-4.jpg" alt="" /></div>
                    {/* <div class="category">Gluten Free Recipes</div> */}
                    <h4><Link to={`/myrecipies/recipe/${props.recipe['id']}`}>{props.recipe["recipe_name"]}</Link></h4>
                    <div class="text">{(props.recipe["recipe_process"]).toString().slice(0,100)}...</div>
                    <div className="recipe-footer-options d-flex justify-content-between">
                        <ul class="post-meta">
                            <li><span className="icon flaticon-dish"></span>{props.recipe["ingredient"].length} Ingredients</li>
                            <li><span class="icon flaticon-business-and-finance"></span>{props.recipe["votes"]} Votes</li>
                        </ul>
                        <div className="options d-flex" style={{marginTop:"10px",gap:"0.5rem"}}>
                            <div style={{cursor:"pointer"}} className='cursor-pointer' value={1} onClick={() => handleClickOpen(1)}><EditIcon style={{fontSize:"1.2rem",color:"black"}}/></div>
                            <div style={{cursor:"pointer"}} className='cursor-pointer' value={"delete"} onClick={() => handleClickOpen("delete")}><DeleteIcon style={{fontSize:"1.2rem",color:"red"}}/></div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <div className="my-recipe">
                            {loader?
                                <div className="loader">
                                    <img src="./loading.gif" width={40} alt="" />
                                </div>:
                                null
                            }
                            {deleteconfirm?
                                <div className="text-center">
                                    <p>Khabardar !!</p>
                                    <p>Dude !! mujhe chodkar bada pachtaoge.badmein rona mat🤗</p>
                                    {loader ? <Button size="small" variant="contained" color="error" value={props.recipe["id"]} onClick={handleDelete} disabled>Continue to Delete</Button> : <Button size="small" variant="contained" color="error" value={props.recipe["id"]} onClick={handleDelete}>Continue to Delete</Button>}
                                    
                                </div>
                                :
                                <>
                                <div className="recipe">
                                    <TextField fullWidth className="stepSize" id="filled-read-only-input" value={recipename} onChange={setRecipeName} label={`Recipe Name`} InputProps={edit?{ readOnly: false}:{readOnly:true}} variant="filled"/>
                                </div>
                                {edit?
                                    <div className="buttons">
                                        <Button size="small" variant="contained" onClick={handleClose}>Cancel</Button>
                                        <Button size="small" variant="contained" color='success' onClick={handleSave}>Save Changes</Button>
                                    </div>
                                :null}
                                </>
                            }
                        </div>
                    </Typography>
                </Box>
            </Modal>
		</div>
        </>
    )

}
