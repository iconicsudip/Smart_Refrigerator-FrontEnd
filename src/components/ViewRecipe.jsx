import React, { useEffect ,useContext,useState} from 'react'
import { useParams } from 'react-router-dom'
import AuthContext from '../context/AuthContext';
import {Link} from 'react-router-dom'

export default function ViewRecipe() {
    let {authToken} = useContext(AuthContext);
    const params = useParams();
    const [getRecipe,setGetRecipe] = useState(null);
    const [loading,setLoading] =useState(false);

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
                setGetRecipe(json)
                setLoading(false);
            })
        }
        fetchAPI()
    },[])
    return (
        <>
        <div className='recipebody flex-column container mb-5'>
            {loading?
                <div className="loader">
                    <img src="./loading.gif" width={40} alt="" />
                </div>:
                <>                    
                    <p>Name : {getRecipe?.recipe_name}</p>
                    <div>
                        <p>Ingredients : </p>
                        <ul>
                            {getRecipe?.ingredient.map((ing)=>{
                                return <li>{ing}</li>
                            })}
                        </ul>
                    </div>
                    <div>
                        <p>Recipe process : </p>
                        <ul>
                            {getRecipe?.recipe_process.map((rep)=>{
                                return <li>{rep}</li>
                            })}
                        </ul>
                    </div>
                    <div>
                        <p>Vegetables : </p>
                        <div className='d-flex gap-1 flex-wrap flex-row' style={{gap:'0.5rem'}}>
                            {getRecipe?.vegetables.map((veg)=>{
                                return <span className="badge badge-warning">{veg}</span>
                            })}
                        
                        </div>
                    </div>
                </>
            }
        </div>
        <section className="page-title" style={{backgroundImage:"url(images/background/10.jpg"}}>
    	<div className="auto-container">
			<h1>Recipes Single</h1>
        </div>
        </section>
        <div className="sidebar-page-container recipes-details-area">
        {loading?
                <div className="loader">
                    <img src="./loading.gif" width={40} alt="" />
                </div>:
                <>                    
                    
                    
                    <div>
                        <p>Recipe process : </p>
                        <ul>
                            {getRecipe?.recipe_process.map((rep)=>{
                                return <li>{rep}</li>
                            })}
                        </ul>
                    </div>
                    <div>
                        <p>Vegetables : </p>
                        <div className='d-flex gap-1 flex-wrap flex-row' style={{gap:'0.5rem'}}>
                            {getRecipe?.vegetables.map((veg)=>{
                                return <span className="badge badge-warning">{veg}</span>
                            })}
                        
                        </div>
                    </div>
                    <div className="auto-container">
                        <div className="row clearfix">
                            
                            <div className="content-side col-lg-12 col-md-12 col-sm-12">
                                <div className="recipe-detail">
                                    <div className="inner-box">
                                        <div className="image">
                                            <img src="images/resource/big.jpg" alt="" />
                                        </div>
                                        <div className="content" style={{backgroundImage:"url(images/background/13.png)"}}>
                                            <div className="author-image">
                                                <img src="images/resource/Linkuthor-9.jpg" alt="" />
                                            </div>
                                            {/* <div className="category">recipes Pizza</div> */}
                                            <h2> {getRecipe?.recipe_name}</h2>
                                            <div className="post">November 24, 2018 <span>By : Mahfuz Riad</span></div>
                                            <div className="rating">
                                                <span className="fa fa-star"></span>
                                                <span className="fa fa-star"></span>
                                                <span className="fa fa-star"></span>
                                                <span className="fa fa-star"></span>
                                                <span className="fa fa-star"></span>
                                                &nbsp; 12 Review
                                            </div>
                                            <div className="text">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Title Image Lorem ipsum dolor sit amet</div>
                                            <ul className="post-meta">
                                                <li><span className="icon flaticon-dish"></span>6 ingredients </li>
                                                <li><span className="icon flaticon-clock-3"></span>15 Min</li>
                                                <li><span className="icon flaticon-business-and-finance"></span>8 People</li>
                                                <li><span className="icon flaticon-eye"></span>3,450 View</li>
                                            </ul>
                                        </div>
                                        <div className="text">Good Food sounds like the name of an amazingly delicious food delivery service, but don't be fooled. The blog is actually a compilation of recipes, cooking videos, and nutrition tips</div>
                                        
                                        <div className="row clearfix">
                                        
                                            <div className="column col-lg-12">

                                                <div className="my-tab">
                                                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                                    <li className="nav-item">
                                                        <Link className="nav-link active" id="pills-home-tab" data-toggle="pill" to ="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Description</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className="nav-link" id="pills-profile-tab" data-toggle="pill" to ="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">See Video</Link>
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
                                                                                <img src="images/resource/discription.jpg" alt=""/>
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
                                                                                    return <li><span>{inx>=0 && inx<=9?`0${inx+1}`:inx+1}</span><br/>{rep}</li>
                                                                                })}
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>	
                                                            </div>
                                                    </div>
                                                    <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                                            
                                                            <div className="video-boxed">
                                                                
                                                                
                                                                <div className="video-box-two">
                                                                    <div className="image">
                                                                        <img src="images/resource/video.jpg" alt="" />
                                                                        <Link to ="../../www.youtube.com/embed/sv3TXMSv6Lw.html" className="lightbox-image overlay-box"><span className="flaticon-media-play-symbol"><i className="ripple"></i></span></Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="post-share-options">
                                                                <div className="post-share-inner clearfix">
                                                                    <div className="pull-left tags"><span className="fa fa-share"></span><Link to ="#">Facebook .</Link> <Link to ="#">Twitter .</Link> <Link to ="#">Linkein .</Link> <Link to ="#">Pinterest .</Link> <Link to ="#">Instragram</Link></div>
                                                                    <div className="pull-right">
                                                                        <div className="save"><span className="icon flaticon-bookmark"></span>Save Recipe</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                    </div>
                                                    <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                                                            
                                                            <div className="comment-form">
                                                                <div className="group-title"><h2>leave a Reply</h2></div>
                                                                
                                                                <form method="post" action="https://gico.io/spcica/blog.html">
                                                                    <div className="row clearfix">
                                                                        
                                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-group">
                                                                            <textarea name="message" placeholder="Massage"></textarea>
                                                                        </div>

                                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-group">
                                                                            <div className="clearfix">
                                                                                <div className="pull-left">
                                                                                    <div className="rating">
                                                                                        Your Rate :
                                                                                        <span className="fa fa-star-o"></span>
                                                                                        <span className="fa fa-star-o"></span>
                                                                                        <span className="fa fa-star-o"></span>
                                                                                        <span className="fa fa-star-o"></span>
                                                                                        <span className="fa fa-star-o"></span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="pull-right">
                                                                                    <button className="theme-btn comment-btn" type="submit" name="submit-form">Post Review</button>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </form>
                                                            </div>
                                                            

                                                            
                                                            <div className="comments-area">
                                                                
                                                                <div className="comment-box">
                                                                    <div className="comment">
                                                                        <div className="author-thumb"><img src="images/resource/Linkuthor-15.jpg" alt=""/></div>
                                                                        <div className="comment-info clearfix"><div className="comment-time">1 months ago · 0 Likes</div></div>
                                                                        <div className="text">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in…Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam</div>
                                                                        <Link className="theme-btn reply-btn" to ="#"><span className="icon fa fa-reply"></span> Reply</Link>
                                                                        <Link className="theme-btn heart-btn" to ="#"><span className="icon fa fa-heart"></span> Like</Link>
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="comment-box">
                                                                    <div className="comment">
                                                                        <div className="author-thumb"><img src="images/resource/Linkuthor-16.jpg" alt=""/></div>
                                                                        <div className="comment-info clearfix"><div className="comment-time">12 january 2020 · 2 Likes</div></div>
                                                                        <div className="text">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in…</div>
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="comment-box reply-comment">
                                                                    <div className="comment">
                                                                        <div className="author-thumb"><img src="images/resource/Linkuthor-17.jpg" alt=""/></div>
                                                                        <div className="comment-info clearfix"><div className="comment-time">1 months ago · 1 Likes</div></div>
                                                                        <div className="text">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in…</div>
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="comment-box">
                                                                    <div className="comment">
                                                                        <div className="author-thumb"><img src="images/resource/Linkuthor-18.jpg" alt=""/></div>
                                                                        <div className="comment-info clearfix"><div className="comment-time">12 january 2020 · 0 Likes</div></div>
                                                                        <div className="text">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in…</div>
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="comment-box reply-comment">
                                                                    <div className="comment">
                                                                        <div className="author-thumb"><img src="images/resource/Linkuthor-19.jpg" alt=""/></div>
                                                                        <div className="comment-info clearfix"><div className="comment-time">1 months ago · 4 Likes</div></div>
                                                                        <div className="text">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in…</div>
                                                                    </div>
                                                                </div>
                                                                
                                                            </div>
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                        </div>

                                        
                                            
                                        
                                        
                                        <div className="related-items">
                                            <h4>You may also like</h4>
                                            
                                            <div className="row clearfix">
                            
                                                
                                                <div className="recipes-block style-two col-lg-4 col-md-6 col-sm-12">
                                                    <div className="inner-box">
                                                        <div className="image">
                                                            <Link to ="recipes-detail.html"><img src="images/resource/recipe-23.jpg" alt="" /></Link>
                                                        </div>
                                                        <div className="lower-content">
                                                            <div className="author-image"><Link to ="author-details.html"><img src="images/resource/Linkuthor-3.jpg" alt="" /></Link></div>
                                                            <div className="category">CHICKEN</div>
                                                            <h4><Link to ="recipes-detail.html">Pressure-Cooker Beef Short Ribs with Chutney</Link></h4>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                
                                                <div className="recipes-block style-two col-lg-4 col-md-6 col-sm-12">
                                                    <div className="inner-box">
                                                        <div className="image">
                                                            <Link to ="recipes-detail.html"><img src="images/resource/recipe-24.jpg" alt="" /></Link>
                                                        </div>
                                                        <div className="lower-content">
                                                            <div className="author-image"><Link to ="author-details.html"><img src="images/resource/Linkuthor-3.jpg" alt="" /></Link></div>
                                                            <div className="category">CHICKEN</div>
                                                            <h4><Link to ="recipes-detail.html">Pressure-Cooker Beef Short <br/> Ribs with Chutney</Link></h4>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                
                                                <div className="recipes-block style-two col-lg-4 col-md-6 col-sm-12">
                                                    <div className="inner-box">
                                                        <div className="image">
                                                            <Link to ="recipes-detail.html"><img src="images/resource/recipe-25.jpg" alt="" /></Link>
                                                        </div>
                                                        <div className="lower-content">
                                                            <div className="author-image"><Link to ="author-details.html"><img src="images/resource/Linkuthor-3.jpg" alt="" /></Link></div>
                                                            <div className="category">CHICKEN</div>
                                                            <h4><Link to ="recipes-detail.html">Pressure-Cooker Beef Short <br/> Ribs with Chutney</Link></h4>
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
