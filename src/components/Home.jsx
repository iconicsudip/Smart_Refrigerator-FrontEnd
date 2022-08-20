import React,{useState,useEffect} from 'react'

export default function Home() {
    let [hometext,setText] = useState("");
    useEffect(()=>{
        setHomeText();
    },[])
    async function setHomeText(){
        let response = await fetch('http://127.0.0.1:8000/');
        let data = await response.json();
        console.log(data);
        setText(data['API']);
    }
    return (
        <div className='allbody home'>
            {hometext}
        </div>
    )
}
