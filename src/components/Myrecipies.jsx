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
        <div className='recipebody'>
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
        <section className="page-title" style={{backgroundImage:"url(images/background/10.jpg"}}>
            <div className="auto-container">
                <h1>Recipes 02</h1>
            </div>
        </section>
        <section class="product-form-section style-two">
		<div class="auto-container">
			<div class="inner-container margin-top">
				
				<div class="default-form">
					<form method="post" action="https://gico.io/spcica/contact.html">
						<div class="clearfix">
							<div class="form-group col-lg-3 col-md-6 col-sm-12">
								<select class="custom-select-box">
									<option>Categories</option>
									<option>01</option>
									<option>02</option>
									<option>03</option>
									<option>04</option>
								</select>
							</div>
							
							<div class="form-group col-lg-7 col-md-6 col-sm-12">
								<input type="text" name="text" placeholder="Recipe Kayword" required/>
							</div>
							
							<div class="form-group col-lg-2 col-md-12 col-sm-12">
								<button type="submit" class="theme-btn search-btn"><span class="fa fa-search"> Search</span></button>
							</div>
							
						</div>
					</form>
				</div>
				
			</div>
		</div>
	</section>
	<section class="popular-recipes-section style-three">
		<div class="auto-container">
			<div class="sec-title">
				<div class="clearfix">
					<div class="pull-left">
						<h2>Populer Recipes Posts</h2>
						<div class="text">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed tincidunt ut</div>
					</div>
					<div class="pull-right">
						<a href="recipes.html" class="theme-btn btn-style-one"><span class="txt">See all Post</span></a>
					</div>
				</div>
			</div>
		</div>
		<div class="outer-container">
			
			<div class="row clearfix">

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
