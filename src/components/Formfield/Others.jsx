import React from 'react'
import { TextField } from '@mui/material';
import FileBase64 from 'react-file-base64';

export default function Others({formData,setFormData}) {

  return (
    <div className='add-recipe-col'>
      <label>Recipe tutorial Url</label>
      <input type="url" className="form-control m-0" value={formData.video_link} onChange={(e)=>setFormData({...formData,video_link:e.target.value})} placeholder="For example: https://www.youtube.com/embed/sv3TXMSv6Lw" required="" ></input>
      <label>Recipe image</label>
      <div className="recipe_image">
        <FileBase64 type={"image/*"} onDone={ (e) => setFormData({...formData,recipe_image:e.base64}) } required/>

      </div>
    </div>
  )
}
