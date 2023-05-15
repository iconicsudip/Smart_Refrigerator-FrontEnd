import React, { useState,useEffect,useContext } from 'react'
import AuthContext from '../context/AuthContext';
import Singlerecipe from './Singlerecipe';

export default function Myrecipies() {
    const [myrecipies,setMyrecipies] = useState([]);
    const [showalert,setAlert] = useState('');
    const [Alert,setEditAlert] = useState('');
    const [loader,setLoader] = useState(true);
    const [showdeletealert,setDeleteAlert] = useState('');
    let {authToken} = useContext(AuthContext);
    useEffect(()=>{
        (async()=>{
            await fetch(`${process.env.REACT_APP_API}/api/getuserdashboard/`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer '+ String(authToken.access)
                },
            }).then(response=>response.json()).then(json=>{
                if(json["alert"]){
                    setAlert(json["alert"])
                }else{
                    setMyrecipies(json);
                }
                setLoader(false);
            })
        })()
        
    },[myrecipies,setLoader])
    return (
        <>
        
        <section className="page-title" style={{backgroundImage:"url(assets/images/background/10.jpg"}}>
            <div className="auto-container">
                <h1>My Recipes </h1>
            </div>
        </section>
        <section className="popular-recipes-section style-three">
            <div className="auto-container">
                <div className="sec-title">
                    <div className="clearfix">
                        <div className="pull-left">
                            <h2>My Recipes Posts</h2>
                            <div className="text">"Elevate your home cooking game with our recipe library"</div>
                        </div>
                    </div>
                </div>
            </div>
            {Alert}
            <div className="outer-container">
                
                <div className="row clearfix justify-content-center">

                    {loader?
                    <div className="loader">
                        <img src="./loading.gif" width={40} alt="" />
                    </div>:null}
                    {showdeletealert}
                    {myrecipies.length!==0?myrecipies.map((recipe,index)=>{
                        return <Singlerecipe setAlert={setEditAlert} setMyrecipies={setMyrecipies} recipe={recipe} setDeleteAlert={setDeleteAlert} key={`recipe${index}`}/>
                    }):
                    <>
                    <p className='text-center'>{showalert}</p>
                    </>
                    }
                    
                    
                
                    
                </div>
                
            </div>
        </section>
        </>
    )
}
