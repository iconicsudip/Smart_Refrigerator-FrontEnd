import React, { useState,useContext} from 'react'
import Button from '@mui/material/Button';
import AuthContext from '../context/AuthContext';
import AddRecipe from './Formfield/AddRecipe';
import Ingredient from './Formfield/Ingredient';
import Process from './Formfield/Process';
import Others from './Formfield/Others';
import Confirmation from './Formfield/Confirmation';

export default function AddItem(props) {
    let {authToken} = useContext(AuthContext);
    const [page, setPage] = useState(0);
    const [progress,setProgress] = useState(0);

    
    const addRecipe = async (action)=>{
        if(action==="create"){

            let data =await fetch(`${process.env.REACT_APP_API}/api/addrecipe/`,{
                method:'POST',
                body:JSON.stringify(props.formData),
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer '+ String(authToken.access)
                },
            })
            const raw = (await data)
            if(raw.status===200){
                props.setOpen(false);
                props.setAlert(
                    <div style={{width:"100%"}} className="alert alert-success" role="alert">
                        <b>Recipe successfully added</b>
                        <button onClick={()=>{props.setAlert('')}} type="button" className="add-item close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                )
            }else{
                props.setOpen(false);
                props.setAlert(
                    <div style={{width:"100%"}} className="alert alert-success" role="alert">
                        <b>Authentication problem, please logout then signin and try again</b>
                        <button onClick={()=>{props.setAlert('')}} type="button" className="add-item close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                )
                // console.log("Authorization problem")
            }
            localStorage.removeItem('steps')
        }else{
            // console.log(props.formData)
            await fetch(`${process.env.REACT_APP_API}/api/updaterecipe/`,{
                method:'POST',
                body:JSON.stringify(props.formData),
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer '+ String(authToken.access)
                },
            }).then(response=>response.json()).then(json=>{
                // props.setMyrecipies(json)
                props.setOpen(false);
                props.setAlert(
                    <div style={{width:"100%"}} className="alert alert-success" role="alert">
                        <b>Recipe successfully updated</b>
                        <button onClick={()=>{props.setAlert('')}} type="button" className="add-item close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                )
            })
        }
    }
    const nextClick = (e)=>{
        e.preventDefault();
        if(page!==4){
            if((page===0 && props.formData.recipe_name==="") || (page===1&&props.formData.ingredients.length===0) || (page===2 &&props.formData.recipe_process.length===0)){
                alert("Required field is empty")
            }else{
                if (page === props.formData.length - 1) {
                    window.alert("Are you done with the registration");
                    window.location.reload();
                } else {
                    setProgress(progress+25);
                    setPage(page + 1);
                }
            }
        }else{
            addRecipe(props.action)
        }
    }
    const backClick = (e) => {
        e.preventDefault();
        if(page===0){
            props.Open(false)
            props.setFormData(props.tempFormData)
            localStorage.removeItem('steps')
        }else{
            setProgress(progress-25);
            setPage(page - 1);
        }
    }
    const PageDisplay = ()=>{
        if (page === 0) {
            return <AddRecipe formData={props.formData} setFormData={props.setFormData}/>;
        } else if (page === 1) {
            return <Ingredient formData={props.formData} setFormData={props.setFormData}/>
        } else if (page === 2) {
            return <Process formData={props.formData} setFormData={props.setFormData}/>;
        } else if(page===3){
            return <Others formData={props.formData} setFormData={props.setFormData}/>;
        }else{
            return <Confirmation />;
        }
    }
    const FormData = ["Recipe Name & Vegetables", "Ingredients", "Process", "Others","Submission"];
    return (
        <>
        <div className='add-recipe'>
            {/* <form className='add-item-form' onSubmit={()=>addRecipe()} > */}
            <form className='add-item-form add-recipe-col position-relative' style={{maxWidth:"inherit"}}>
                <div className="p-2 progdiv">
                    <div className="progress-bar shadow bg-secondary rounded-3">
                        <div className="div text-center" style={{width:progress+"%",backgroundColor: page === 4 ? "green" : "#ff7d5f",}}></div>
                    </div>
                </div>
                <h3 className={`"display-2" ${page === 4 ? "text-success" : "text-purple"} text-center`}>{FormData[page]}</h3>
                <div className="recipe-form">
                    {PageDisplay()}
                    {/*  */}
                </div>
                <div className="d-flex justify-content-end m-1" style={{gap:"1rem"}}>
                    <button className="btn btn-primary theme-btn btn-style-one" onClick={backClick} type="submit"><span>{page !== 0 ? "Back" : "Cancel"}</span></button>
                    <button className="btn btn-primary theme-btn btn-style-two" onClick={nextClick} type="submit"><span>{page !== 4 ? "Next" : props.action === "create" ? "Finish & Add" :"Update"}</span></button>
                </div>
            </form>
        </div>
        </>
    )
}
