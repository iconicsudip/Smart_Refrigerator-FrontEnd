import React from 'react'
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';

export default function ShowProcess({editable,formData, setFormData,steps,setSteps,item,index,once,setOnce}) {
    // console.log(item)
    var temp = formData.recipe_process;
    if(once){
        var t = [];
        for(var i=0;i<steps.length;i++){
            t.push('');
        }
        setFormData({...formData,recipe_process:t})
        for(i=0;i<temp.length;i++){
            if(t[i]===''&&temp[i]===''){
                continue;
            }else{
                t[i]=temp[i];
            }
        }
        setFormData({...formData,recipe_process:t})
        setOnce(false);
    }
    const Delete = (e)=>{
        e.preventDefault()
        var id = e.target.value;
        let updateItmes = formData.recipe_process.filter((e,index) => {
            return index !== parseInt(id);
        });
        setFormData({...formData,recipe_process:updateItmes});
        updateItmes = steps.filter((e,index) => {
            return index !== parseInt(id);
        });
        setSteps([...updateItmes]);
        localStorage.setItem('steps',JSON.stringify(updateItmes))
    }
    const setProcess = (e)=>{
        var arr = formData.recipe_process
        if(arr[index] !== undefined){
            arr[index] = (e.target.value)
        }else{
            arr.push(e.target.value)
        }
        setFormData({...formData,recipe_process:arr})
    }
    const setTime = (e)=>{
        var arr = formData.recipe_process
        if(e.target.value>0){
            if(arr[index] !== undefined){
                arr[index] = (e.target.value)
            }else{
                arr.push(e.target.value)
            }
            setFormData({...formData,recipe_process:arr})
        }
    }
    return (
        <>
        <div style={{textAlign:"initial"}}>
            <span style={{fontSize:"12px"}}>Step {index+1}</span>
        </div>
        <div className='row process-box w-100'>
            {item==='0'?
            <>
                <div className='col-12 col-md-8'>
                    <input type="text" class="form-control m-0" value={formData.recipe_process[index]} onChange={setProcess} placeholder="Process" required="" disabled={editable===1?false:true}></input>
                </div>
            </>
            
            :
            <div className="col-12 col-md-4">

                <input type="number" class="form-control m-0" value={formData.recipe_process[index]} onChange={setTime} placeholder="Time in minutes" required="" disabled={editable===1?false:true}></input>
            </div>
            }
            <div className="col-12 col-md-4 d-flex align-items-center">
                <Button className='mt-2' style={{borderRadius:"50px"}} value={index} onClick={Delete} size="small" type='submit'     variant="contained" color="error">Delete</Button>
            </div>
        </div>
        </>
    )
}
