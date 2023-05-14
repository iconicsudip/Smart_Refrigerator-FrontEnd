import React from 'react'
import { TextField } from '@mui/material';
import { useState } from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ShowIngredients from './ShowIngredients';

export default function Ingredient({ formData, setFormData }) {
  const [ingredient,setIngredient] = useState("")
  const setingredient = (e)=>{
    e.preventDefault()
    setIngredient(e.target.value)
  }
  const saveIngredient = (e)=>{
    e.preventDefault();
    if(ingredient===""){
      alert("Field is empty");
    }else{
      var arr = formData.ingredients
      arr.push(ingredient)
      setFormData({...formData,ingredients:arr})
      setIngredient("");

    }
  }
  return (
    <div className='add-recipe-col'>
      <label>Recipe Name</label>
      <div className="row w-100">
        <div className="col-12 col-lg-10">
          <input type="text" class="form-control" value={ingredient} onChange={setingredient} placeholder="Example: 4tbsp Salt" required=""></input>
        </div>
        <div className="col-12 col-lg-2">
          <button className="btn btn-primary theme-btn btn-style-two w-100" onClick={saveIngredient}><span>Add</span></button>
        </div>
      </div>
      <List className='item-list'>
        {formData.ingredients.length!==0?formData.ingredients.map((item,index)=>{
            return <ShowIngredients formData={formData} key={index} setFormData={setFormData} item={item} index={index}/>
        }):<li className='text-center'><label>Ingredient doesn't exist</label></li>}
      </List>
    </div>
  )
}
