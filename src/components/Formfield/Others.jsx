import React from 'react'
import { TextField } from '@mui/material';

export default function Others({formData,setFormData}) {
  return (
    <div className='add-recipe-col'>
      <label>Recipe tutorial Url</label>
      <input type="url" className="form-control m-0" value={formData.video_link} onChange={(e)=>setFormData({...formData,video_link:e.target.value})} placeholder="For example: https://www.youtube.com/embed/sv3TXMSv6Lw" required="" ></input>
      <label>Recipe image</label>
      <input style={{fontSize:"1rem"}} type="file"  accept="image/*" className="form-control-file"/>
    </div>
  )
}
