import React from 'react'
import { TextField } from '@mui/material';
import {useEffect } from 'react';
import Vegetables from './Vegetables';

export default function AddRecipe({ formData, setFormData }) {
    
    const checkList = ["Potato", "Tomato", "Brinjal", "Pointed gourd", "Capsicum", "Lady finger", "Carrot", "Bitter gourd", "Cauliflower", "Spong gourd", "Taro root", "Green beans", "Chilly", "Garlic", "Ginger", "Lemon", "Green peas","Onion"];
    useEffect(()=>{
        for(var i=0;i<formData.vegetables.length;i++){
            const name = formData.vegetables[i];
            document.getElementsByName(name)[0].checked = true;
        }
    },[formData]);
    const handleCheck = (event) => {
        var updatedList = [...formData.vegetables];
        if (event.target.checked ) {
            updatedList = [...formData.vegetables, event.target.value];
        } else {
            updatedList.splice(formData.vegetables.indexOf(event.target.value), 1);
        }
        setFormData({...formData,vegetables:updatedList})
    };
    return (
        <div className='add-recipe-col'>
            <label>Recipe Name</label>
            <input type="text" className="form-control" value={formData.recipe_name} onChange={(e) => setFormData({ ...formData, recipe_name: e.target.value })} placeholder="Example: Hamburger Steak with Onions" required=""></input>
            <label>Vegetables</label>
            <Vegetables formData={formData} checkList={checkList} handleCheck={handleCheck}/>
            
        </div>
    )
}
