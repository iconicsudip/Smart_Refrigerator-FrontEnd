import React, { useEffect ,useContext,useState} from 'react'
import { useParams } from 'react-router-dom'
import AuthContext from '../context/AuthContext';
import {Link} from 'react-router-dom'
import $ from 'jquery'
import {ImArrowUp} from 'react-icons/im'
import RefriBot from './RefriBot';

export default function ViewRecipe() {
    let {authToken,username} = useContext(AuthContext);
    const params = useParams();
    const [getRecipe,setGetRecipe] = useState(null);
    const [loading,setLoading] =useState(false);
    const [isVoted,setVote] = useState(false)
    useEffect(()=>{
        $("#play_video").click(function(){
            //as noted in addendum, check for querystring exitence
            $("#video_overlay").css('display','none')
            var symbol = $("#recipe_video")[0].src.indexOf("?") > -1 ? "&" : "?";
            //modify source to autoplay and start video
            $("#recipe_video")[0].src += symbol + "autoplay=1";
        });
    },[getRecipe])

    useEffect(()=>{
        const fetchAPI = async ()=>{
            setLoading(true)
            await fetch(`${process.env.REACT_APP_API}/api/userrecipe/${params.recipe_id}`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer '+ String(authToken.access)
                },
            }).then(response=>response.json()).then(json=>{
                console.log(json)
                setGetRecipe(json)
                setVote(json.recipe_voted)
                setLoading(false);
            })
        }
        fetchAPI()
    },[])
    const isNum = (num) =>{
        if (typeof num === "string") {
            return !isNaN(num);
        }
    }
    const updateVote = async (type) =>{
        await fetch(`${process.env.REACT_APP_API}/api/updatevote/id=${params.recipe_id}&vote=${type}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+ String(authToken.access)
            },
        }).then(response=>response.json()).then(json=>{
            setGetRecipe(json)
            setVote(json.recipe_voted)
        })
    }
    const giveVote = ()=>{
        if(isVoted){
            updateVote("decrease")
            setVote(false)
        }else{
            updateVote("increase")
            setVote(true)
        }
    }
    return (
        <>
        {username!==null?<RefriBot username={username}/>:null}
        <section className="page-title" style={{backgroundImage:"url(../../assets/images/background/10.jpg"}}>
            <div className="auto-container">
                <h1>{getRecipe?.recipe_name}</h1>
            </div>
        </section>
        <div className="sidebar-page-container recipes-details-area">
        {loading?
                <div className="loader">
                    <img src="../../loading.gif" width={40} alt="" />
                </div>:
                <>
                    <div className="auto-container">
                        <div className="row clearfix">
                            
                            <div className="content-side col-lg-12 col-md-12 col-sm-12">
                                <div className="recipe-detail">
                                    <div className="inner-box">
                                        <div className="image">
                                            {getRecipe?.recipe_image==="None" ?
                                                <img src="../../assets/images/resource/big.jpg" alt="" />
                                            :
                                                <img src={`${getRecipe?.recipe_image}`} alt="" />
                                            }
                                        </div>
                                        <div className="content" style={{backgroundImage:"url(../../assets/images/background/13.png)"}}>
                                            <div className="author-image">
                                                <Link to={`/profile/${getRecipe?.author_name}`}>
                                                    {getRecipe?.author_image ?
                                                        <img src={`${getRecipe?.author_image}`} alt="" />
                                                        :
                                                        <img src="/assets/images/avatar.png" alt="" />
                                                    }
                                                </Link>
                                            </div>
                                            {/* <div className="category">recipes Pizza</div> */}
                                            <h2> {getRecipe?.recipe_name}</h2>
                                            <div className="post">November 24, 2018 <span>By : {getRecipe?.author_name}</span></div>
                                            <div className="rating">
                                                <span className="fa fa-star"></span>
                                                <span className="fa fa-star"></span>
                                                <span className="fa fa-star"></span>
                                                <span className="fa fa-star"></span>
                                                <span className="fa fa-star"></span>
                                                &nbsp; 12 Review
                                            </div>
                                            <ul className="post-meta">
                                                <li><span className="icon flaticon-dish"></span>{getRecipe?.ingredient.length} Ingredients</li>
                                                <li><span className="icon flaticon-business-and-finance"></span>{getRecipe?.votes} Votes</li>
                                                <li onClick={giveVote}><span className={`icon upvote ${isVoted?'active':''}`}><ImArrowUp /></span>Upvote</li>
                                            </ul>
                                        </div>
                                        <div className="text">Good Food sounds like the name of an amazingly delicious food delivery service, but don't be fooled. The blog is actually a compilation of recipes, cooking videos, and nutrition tips</div>
                                        
                                        <div className="row clearfix">
                                        
                                            <div className="column col-lg-12">

                                                <div className="my-tab">
                                                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                                    <li className="nav-item">
                                                        <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href ="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Description</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href ="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">See Video</a>
                                                    </li>
                                                    {/* <li className="nav-item">
                                                        <Link className="nav-link" id="pills-contact-tab" data-toggle="pill" to ="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Reviews</Link>
                                                    </li> */}
                                                    </ul>
                                                    <div className="tab-content" id="pills-tabContent">
                                                    <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                                            <div className="row">
                                                                <div className="col-lg-12">
                                                                    <div className="row">
                                                                        <div className="col-lg-6">
                                                                            <div className="discription-para">
                                                                                <img src="../../assets/images/resource/discription.jpg" alt=""/>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-6">
                                                                            <div className="discription-para">
                                                                                <h4>The Best Sausage Pizzas Spread pizza sauce over crusts. At libero totam fugiat vero ab distinctio ducimus.</h4>
                                                                                <p>Lorem ipsum dolor sit, amet, consectetur adipisicing elit. At libero totam fugiat vero ab distinctio ducimus, dolores deserunt inventore repellendus tempora fugit ipsum in alias placeat asperiores esse quaerat quibusdam omnis facilis laudantium. Placeat voluptatem nemo ea magnam modi quos esse accusamus possimus reiciendis, corporis rem quo, voluptatibus vel perferendis voluptates dolore.</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    
                                                                    <div className="ingredients-block">
                                                                        <div className="block-inner">
                                                                            <h4>Ingredients</h4>
                                                                            <ul className="ingredients-list">
                                                                                {getRecipe?.ingredient.map((ing)=>{
                                                                                    return <li>{ing}</li>
                                                                                })}
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                
                                                                    
                                                                    <div className="ingredients-block">
                                                                        <div className="block-inner">
                                                                            <h4>Vegetables</h4>
                                                                            <ul className="nutrition-list">
                                                                                {getRecipe?.vegetables.map((veg)=>{
                                                                                    return <li>{veg}</li>
                                                                                })}
                                                                                
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    
                                                                    <div className="ingredients-block">
                                                                        <div className="block-inner">
                                                                            <h4>Directions</h4>
                                                                            <ul className="direction-list">
                                                                                {getRecipe?.recipe_process.map((rep,inx)=>{
                                                                                    return <li><span>{inx>=0 && inx<=9?`0${inx+1}`:inx+1}</span><br/>{isNum(rep)?"Timer: "+rep+" minutes": rep}</li>
                                                                                })}
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>	
                                                            </div>
                                                    </div>
                                                    <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                                            
                                                            <div className="video-boxed">
                                                                
                                                                {getRecipe?.videourl !== ""?
                                                                    <div className="video-box-two">
                                                                        <div className="image">
                                                                            <iframe id="recipe_video" src="https://www.youtube.com/embed/tgbNymZ7vqY"  style={{width:"100%",height:"600px"}}></iframe>
                                                                            <div id="video_overlay" className="lightbox-image overlay-box"><span className="flaticon-media-play-symbol" id="play_video" style={{cursor:"pointer"}}><i className="ripple"></i></span></div>
                                                                        </div>
                                                                    </div>
                                                                    :
                                                                    <div className="text text-center">
                                                                        No video is available for this recipe
                                                                    </div>
                                                                }
                                                            </div>
                                                            
                                                            {/* <div className="post-share-options">
                                                                <div className="post-share-inner clearfix">
                                                                    <div className="pull-left tags"><span className="fa fa-share"></span><Link to ="#">Facebook .</Link> <Link to ="#">Twitter .</Link> <Link to ="#">Linkein .</Link> <Link to ="#">Pinterest .</Link> <Link to ="#">Instragram</Link></div>
                                                                    <div className="pull-right">
                                                                        <div className="save"><span className="icon flaticon-bookmark"></span>Save Recipe</div>
                                                                    </div>
                                                                </div>
                                                            </div> */}
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </>
            }
	    </div>
        </>
    )
}
