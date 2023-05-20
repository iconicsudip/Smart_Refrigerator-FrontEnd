import React, { useState,useEffect,useContext } from 'react'
import AuthContext from '../context/AuthContext';
import Singlerecipe from './Singlerecipe';
import RefriBot from './RefriBot';

export default function Myrecipies() {
    const [myrecipies,setMyrecipies] = useState([]);
    const [showalert,setAlert] = useState('');
    const [Alert,setEditAlert] = useState('');
    const [loader,setLoader] = useState(true);
    const [showdeletealert,setDeleteAlert] = useState('');
    const [pageStart,setPageStart] = useState(0);
    const [total,setTotal] = useState(0)
    let {authToken,username,userDetails} = useContext(AuthContext);
    useEffect(() => {
        // fetchData();
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [pageStart]);
    const fetchData = async () =>{
        if(total>pageStart || pageStart===0){
            setLoader(true)
            await fetch(`${process.env.REACT_APP_API}/api/getuserdashboard/start=${pageStart}`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer '+ String(authToken.access)
                },
            }).then(response=>response.json()).then(json=>{
                if(json["alert"]){
                    setAlert(json["alert"])
                }else{
                    setTotal(json["total"])
                    setMyrecipies([...myrecipies,...json["results"]]);
                    let newStart = pageStart +4;
                    setPageStart(newStart)
                }
                setLoader(false);
            })
        }
    }
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
            setTimeout(() => {
                fetchData();
            }, 0);
        }
    };
    
    useEffect(()=>{
        fetchData()
        
    },[])
    console.log(pageStart)
    return (
        <>
        {username!==null?<RefriBot username={username} userDetails={userDetails}/>:null}
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
                
                <div className="row clearfix">

                    
                    {showdeletealert}
                    {myrecipies.length!==0?myrecipies.map((recipe,index)=>{
                        return <Singlerecipe setAlert={setEditAlert} setMyrecipies={setMyrecipies} recipe={recipe} setDeleteAlert={setDeleteAlert} key={`recipe${index}`}/>
                    }):
                    <>
                    <p className='text-center'>{showalert}</p>
                    </>
                    }
                    
                    
                
                    
                </div>
                {loader?
                    <div className="loader">
                        <img src="./loading.gif" width={40} alt="" />
                    </div>:null}
                
            </div>
        </section>
        </>
    )
}
