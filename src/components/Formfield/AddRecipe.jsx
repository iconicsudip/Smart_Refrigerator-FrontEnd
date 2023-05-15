import React,{useState} from 'react'
import { TextField } from '@mui/material';
import {useEffect,useContext } from 'react';
import Vegetables from './Vegetables';
import AuthContext from '../../context/AuthContext';

export default function AddRecipe({ formData, setFormData }) {
    const {authToken} = useContext(AuthContext);
    const [loader,setLoader] = useState(true);
    const [checkList,setCheckList] = useState([])
    // const checkList = ["Potato", "Tomato", "Brinjal", "Pointed gourd", "Capsicum", "Lady finger", "Carrot", "Bitter gourd", "Cauliflower", "Spong gourd", "Taro root", "Green beans", "Chilly", "Garlic", "Ginger", "Lemon", "Green peas","Onion"];
    const getVegName = (name)=>{
        name = (name).toString().split("_").join(" ")
        return name.charAt(0).toUpperCase() + name.slice(1);
    }
    const fetchVeg = async ()=>{
        await fetch(`${process.env.REACT_APP_API}/api/availableveg/`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+ String(authToken.access),
            },
        }).then(response=>response.json()).then(json=>{
            let itemArray=[]
            Object.entries(json).map((item)=>{
                if(item[1]){
                    itemArray.push(getVegName(item[0]))
                }
            })
            setCheckList(itemArray)
            setLoader(false);
        })
    }
    useEffect(()=>{
        for(var i=0;i<formData.vegetables.length;i++){
            const name = formData.vegetables[i];
            if(document.getElementById(name)!==null){

                document.getElementById(name).checked = true;
            }
        }
    },[checkList])
    useEffect(()=>{
        setLoader(true)
        fetchVeg()
        
    },[])
    useEffect(()=>{
        for(var i=0;i<formData.vegetables.length;i++){
            const name = formData.vegetables[i];
            if(document.getElementById(name)!==null){

                document.getElementById(name).checked = true;
            }
        }
        // availableveg/
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
            <label>Available Vegetables in your fridge</label>
            <Vegetables loader={loader} formData={formData} checkList={checkList} handleCheck={handleCheck}/>
            
        </div>
    )
}
