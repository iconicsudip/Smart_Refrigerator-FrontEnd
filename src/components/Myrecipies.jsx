import React, { useState,useEffect,useContext } from 'react'
import AuthContext from '../context/AuthContext';
import Singlerecipe from './Singlerecipe';

export default function Myrecipies() {
    const [myrecipies,setMyrecipies] = useState([]);
    const [showalert,setAlert] = useState('');
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
        
        <section className="page-title" style={{backgroundImage:"url(images/background/10.jpg"}}>
            <div className="auto-container">
                <h1>My Recipes </h1>
            </div>
        </section>
        <section class="product-form-section style-two">
	</section>
	<section class="popular-recipes-section style-three">
		<div class="auto-container">
			<div class="sec-title">
				<div class="clearfix">
					<div class="pull-left">
						<h2>My Recipes Posts</h2>
						<div class="text">"Elevate your home cooking game with our recipe library"</div>
					</div>
				</div>
			</div>
		</div>
		<div class="outer-container">
			
			<div class="row clearfix justify-content-center">

                {loader?
                <div className="loader">
                    <img src="./loading.gif" width={40} alt="" />
                </div>:null}
                {showdeletealert}
                {myrecipies.length!==0?myrecipies.map((recipe,index)=>{
                    return <Singlerecipe setMyrecipies={setMyrecipies} recipe={recipe} setDeleteAlert={setDeleteAlert} key={`recipe${index}`}/>
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
