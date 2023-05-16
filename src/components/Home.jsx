import React,{useState,useEffect,useContext} from 'react'
import {Link} from 'react-router-dom'
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import OwlCarousel from 'react-owl-carousel';
import Slider from "react-slick";
import RefriBot from './RefriBot';
import AuthContext from '../context/AuthContext';
export default function Home() {
    let [getcarousel,setCarousel] = useState([])
    let {username} = useContext(AuthContext);
    useEffect(()=>{
        setHomeText();
    },[])
    async function setHomeText(){
        let response = await fetch(`${process.env.REACT_APP_API}/api/`);
        let data = await response.json();
        // // console.log(data['data'],data['home'])
        // setText(data["home"]);
        setCarousel(data["data"])
    }
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 3000,
        cssEase: "linear",
        arrows: false,
    };
    return (
        <>
        {username!==null?<RefriBot username={username}/>:null}
        
        <section className="banner-section-two">
            <Slider {...settings}>
                    {getcarousel.map((item)=>{
                        return (
                            <Link key={item.id} to={`/myrecipies/recipe/${item.id}`}>
                                <div className="slide-item">
                                    <div className="image-layer" style={{backgroundImage:"url(assets/images/background/6.jpg)"}}></div>

                                    <div className="auto-container">
                                        <div className="content-box">
                                            <div className="image">
                                                {item?.recipe_image==="None" ?
                                                    <img src="assets/images/resource/image-1.png" alt="" />
                                                :
                                                    <img src={`${item?.recipe_image}`} alt="" />
                                                }
                                            </div>
                                            
                                            <div className="author-name">
                                                <div className="author-inner">
                                                    <div className="author-icon">
                                                        <img src="assets/images/resource/author-1.jpg" alt="" />
                                                    </div>
                                                    by {item.author_name}
                                                </div>
                                            </div>
                                            <h1>{item.recipe_name}</h1>
                                            <ul className="post-meta">
                                                <li><span className="icon flaticon-dish"></span>{item.ingredient.length} Ingredients</li>
                                                <li><span className="icon flaticon-business-and-finance"></span>{item.votes} Votes</li>
                                            </ul>
                                        </div>  
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
            </Slider>
        </section>
        <section className="trending-section style-two">
		<div className="auto-container">
			<div className="layer-three" style={{backgroundImage: "url(assets/images/background/7.png)"}}></div>
			<div className="layer-four" style={{backgroundImage: "url(assets/images/background/8.png)"}}></div>
			<div className="row clearfix">
			
				<div className="image-column col-lg-5 col-md-12 col-sm-12">
					<div className="inner-column">
						<div className="image">
							<img src="assets/images/resource/category.png" alt="" />
							<div className="mints">15 Min</div>
						</div>
					</div>
				</div>
				
				
				<div className="content-column col-lg-7 col-md-12 col-sm-12">
					<div className="inner-column">
						
						<div className="sec-title">
							{/* <div className="title">TRENDING</div> */}
							<h2>Smart Refrigerator With Smart Cooking Techniques</h2>
							<div className="text">Preheat oven to 325°. In a small bowl, mix the first 5 ingredients. Place roast in a roasting pan, fat side up; rub with seasoning mixture.Roast 2-1/4 to 2-3/4 hours or until meat reaches desired doneness (for medium-rare, a thermometer should read 135°; medium, 140°; medium-well, 145°). Remove roast from oven; tent with foil. Let stand 15 minutes before carving.</div>
						</div>
						<div className="bold-text">To separate the fat from the drippings with ease, try this tool from OXO ($14).</div>
					</div>
				</div>
				
			</div>
		</div>
	    </section>
        <section className="popular-recipes-section style-two">
            <div className="auto-container">
                
                <div className="sec-title">
                    <div className="clearfix">
                        <div className="pull-left">
                            <h2>Populer Recipes Posts</h2>
                            <div className="text">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed tincidunt ut</div>
                        </div>
                        <div className="pull-right">
                            <Link to="/dashboard" className="theme-btn btn-style-one"><span className="txt">See all Recipies</span></Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="outer-container">
                <div className="row clearfix">
                {getcarousel.map((item)=>{
                        return (
                            <div className="recipes-block style-three col-lg-3 col-md-6 col-sm-12">
                                <div className="inner-box">
                                    <div className="image">
                                        <Link to={`/myrecipies/recipe/${item.id}`}>
                                            {item?.recipe_image==="None" ?
                                                <img src="assets/images/resource/recipe-8.jpg" alt="" />
                                            :
                                                <img src={`${item?.recipe_image}`} alt="" />
                                            }
                                        </Link>
                                    </div>
                                    <div className="lower-content">
                                        <div className="author-image"><img src="assets/images/resource/author-5.jpg" alt="" /></div>
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
                    })}
                    
                </div>
            </div>
	    </section>
        </>
    )
}
