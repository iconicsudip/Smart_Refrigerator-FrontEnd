import React,{useState,useEffect} from 'react'

export default function Home() {
    let [hometext,setText] = useState("");
    useEffect(()=>{
        setHomeText();
    },[])
    async function setHomeText(){
        let response = await fetch(`${process.env.REACT_APP_API}/api/`);
        let data = await response.json();
        console.log(data);
        setText(data['API']);
    }
    return (
        <div className='allbody home text-center'>
            {hometext}
        </div>
    )
}
