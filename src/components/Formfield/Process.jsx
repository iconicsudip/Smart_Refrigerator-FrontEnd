import React from 'react'
import Button from '@mui/material/Button';
import ShowProcess from './ShowProcess';
import { useState } from 'react';
export default function Process({ formData, setFormData }) {
  var fsteps = []
  const isNum = (num) =>{
    if (typeof num === "string") {
        return !isNaN(num);
    }
  }
  if(localStorage.getItem("steps")===null){
    for(let i=0;i<formData.recipe_process.length;i++){
      if(isNum(formData.recipe_process[i])){
        fsteps.push("1")
      }else{
        fsteps.push("0")
      }
    }
    localStorage.setItem("steps",JSON.stringify(fsteps));
  }else{
    fsteps = JSON.parse(localStorage.getItem("steps"));
  }
  const [steps,setSteps] = useState(fsteps);
  const [edit,setEdit] = useState(0);
  const [once,setOnce]=useState(true);
  const addStep = (e)=>{
    e.preventDefault();
    var arr = steps
    arr.push(e.target.value)
    setSteps([...arr]);
    localStorage.setItem("steps",JSON.stringify(steps));
    setEdit(1)
    if(once===false){
      setOnce(true);
    }
  }

  const toEditSave = (e)=>{
    if(edit===0){
      setEdit(1)
    }else{
      setEdit(0)
      localStorage.setItem("steps",JSON.stringify(steps));
    }
  }
  
  return (
    <div>
      <div className='d-flex gap-process justify-content-center'>
        <button className="btn btn-primary theme-btn btn-style-one" value={0} onClick={addStep} type="submit"><span>Add Process</span></button>
        <button className="btn btn-primary theme-btn btn-style-two" value={1} onClick={addStep} type="submit"><span>Add Timer</span></button>
      </div>
      <div className="process">
        {steps.length!==0?steps.map((item,index)=>{
            let items;
            if(1){
              items = '1'
            }else{
              items = '0'
            }
              return <ShowProcess editable={edit} formData={formData} setFormData={setFormData} steps={steps} setSteps={setSteps} item={item} index={index} once={once} setOnce={setOnce}/>
        }):<span className='text-center'>Process doesn't exist</span>}
      </div>
      <div className="d-flex gap-process edit-save justify-content-center">
        {steps.length!==0?<Button className='add-item' color={edit===0?'primary':'success'} variant="contained" value={0} onClick={toEditSave} style={{borderRadius:"50px"}}>{edit===0?"Edit":"Save"}</Button>:null}
      </div>
    </div>
  )
}
