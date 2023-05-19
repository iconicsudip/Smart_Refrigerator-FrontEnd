import React, { useEffect, useState,useContext } from "react";
import './profile.css'
import {Link, useParams } from "react-router-dom";
import FileBase64 from 'react-file-base64';
import AuthContext from '../context/AuthContext';

export default function Profile() {
    const params = useParams();
    const [userInfo,setUserInfo] =useState(null)
    const [userRecipes,setUserRecipes] = useState([])
    const [loader,setLoader] = useState(true);
    let {authToken,username} = useContext(AuthContext);
    const [profileImage,setProfileImage] = useState({
        image:""
    })
    const getUserDetails = async (username) => {
        await fetch(`${process.env.REACT_APP_API}/api/userdetails/${username}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
            },
        }).then(response=>response.json()).then(json=>{
            setUserInfo(json)
        })
    }
    const getUserRecipes = async (username)=>{
        setLoader(true)
        await fetch(`${process.env.REACT_APP_API}/api/userrecipes/${username}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
            },
        }).then(response=>response.json()).then(json=>{
            setUserRecipes(json)
            setLoader(false)
        })
    }
    const saveImage = async ()=>{
        await fetch(`${process.env.REACT_APP_API}/api/updateuserinfo/${params.user_name}`,{
            method:'POST',
            body:JSON.stringify({...profileImage}),
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+ String(authToken.access)
            },
        }).then(response=>response.json()).then(json=>{
            setUserInfo(json)
            getUserRecipes(params.user_name)
        })
    }
    useEffect(()=>{
        getUserDetails(params.user_name)
        getUserRecipes(params.user_name)
    },[params])
    return (
        <>
            <section className="page-title" style={{backgroundImage:"url(/assets/images/background/10.jpg"}}>
                <div className="auto-container">
                    <h1>Profile </h1>
                </div>
            </section>
            <div className="popular-recipes-section">
                {userInfo?.error ? <h1 className="text-center">{userInfo.error}</h1> :
                    <>
                        <div className="container-profile">
                            <div className="card">
                                <div className="card-header"></div>
                                <div className="card-body">
                                    {
                                        userInfo?.image ?
                                        <img src={userInfo?.image} alt="" />
                                        :
                                        <img src="/assets/images/avatar.png" alt="" />
                                    }
                                    <div className="inner">
                                        <div style={{fontSize: "18px",letterSpacing: ".5px",marginBottom: "10px"}}>
                                            {userInfo?.name}
                                        </div>
                                        <span className="color__gray" >
                                            ({userInfo?.username})
                                        </span>
                                        <div
                                        className="color__gray"
                                        style={{fontSize: "13px",letterSpacing: ".5px"}}
                                        >
                                        {userInfo?.email}
                                        </div>
                                        <div style={{fontSize: "18px",letterSpacing: ".5px",marginBottom: "10px"}}>
                                            Change Image
                                        </div>
                                        {username.username === userInfo?.username ?
                                        
                                            <div className="d-flex flex-wrap profile-image">
                                                <FileBase64 style={{fontSize:".63rem"}} type={"image/*"} onDone={ (e) => setProfileImage({...profileImage,image:e.base64}) } required/>
                                                <button type="button" onClick={saveImage} className="theme-btn search-btn" style={{padding:"1px 11px",color:"white",background:"#ff7d5f",cursor:"pointer"}}>Save</button>
                                            </div>
                                        
                                        :null}
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <div className="inner">
                                        <div>{userRecipes?.data?.length ?? userRecipes?.length}</div>
                                        <div className="color__gray">Recipes</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <section className="popular-recipes-section style-two">
                            <div className="auto-container">
                                
                                <div className="sec-title">
                                    <div className="clearfix">
                                        <div className="pull-left">
                                            <h2>All Recipes</h2>
                                            <div className="text">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed tincidunt ut</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="outer-container">
                                <div className="row clearfix">

                                    {
                                        loader?
                                            <div className="loader w-100 text-center">
                                                <img src="/loading.gif" width={40} alt="" />
                                            </div>:
                                            userRecipes?.data?.length!==0?userRecipes?.data?.map((item)=>{
                                                return (
                                                    <div className="recipes-block style-three col-lg-3 col-md-6 col-sm-12">
                                                        <div className="inner-box">
                                                            <div className="image">
                                                                <Link to={`/myrecipies/recipe/${item.id}`}>
                                                                    {item?.recipe_image==="None" ?
                                                                        <img src="/assets/images/resource/recipe-8.jpg" alt="" />
                                                                    :
                                                                        <img src={`${item?.recipe_image}`} alt="" />
                                                                    }
                                                                </Link>
                                                            </div>
                                                            <div className="lower-content">
                                                                <div className="author-image">
                                                                    <Link to={`/profile/${item.author_name}`}>
                                                                        {item.author_image ?
                                                                            <img src={`${item.author_image}`} alt="" />
                                                                            :
                                                                            <img src="/assets/images/avatar.png" alt="" />
                                                                        }
                                                                    </Link>
                                                                </div>
                                                                <div className="category">by {item.author_name}</div>
                                                                <h4><Link to={`/myrecipies/recipe/${item.id}`}>{item.recipe_name}</Link></h4>
                                                                <div className="text">{(item.recipe_process).toString().slice(0,100)}...</div>
                                                                <ul className="post-meta">
                                                                    <li><span className="icon flaticon-dish"></span>{item.ingredient.length} ingredients</li>
                                                                    <li><span className="icon flaticon-business-and-finance"></span>{item.votes} Votes</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }):
                                            <h1>No recipe</h1>
                                    }
                                    
                                </div>
                            </div>
                        </section>
                    </>                    
                }
            </div>
        </>
    );
}
