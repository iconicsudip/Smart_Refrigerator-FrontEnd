import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';
import $ from 'jquery'
export default function Home() {
    let [hometext,setText] = useState("");
    useEffect(()=>{
            // your standard jquery code goes here with $ prefix
            // best used inside a page with inline code, 
            // or outside the document ready, enter code here
        // if ($('.banner-carousel').length) {
        //     $('.banner-carousel').owlCarousel({
        //         loop:true,
        //         margin:0,
        //         nav:true,
        //         smartSpeed: 500,
        //         autoplay: 6000,
        //         navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
        //         responsive:{
        //             0:{
        //                 items:1
        //             },
        //             600:{
        //                 items:1
        //             },
        //             800:{
        //                 items:1
        //             },
        //             1024:{
        //                 items:1
        //             }
        //         }
        //     });
        // }
        setHomeText();
        
        // $(document).load('index.html',()=>{
        // })
    },[])
    async function setHomeText(){
        let response = await fetch(`${process.env.REACT_APP_API}/api/`);
        let data = await response.json();
        console.log(data);
        setText(data['API']);
    }
    return (
        <>
        
        <section className="banner-section-two">
            <div className="banner-carousel owl-theme owl-carousel">
                <div className="slide-item">
                    <div className="image-layer" style={{backgroundImage:"url(assets/images/background/6.jpg)"}}></div>

                    <div className="auto-container">
                        <div className="content-box">
                            <div className="image">
                                <img src="assets/images/resource/image-1.png" alt="" />
                            </div>
                            
                            <div className="author-name">
                                <div className="author-inner">
                                    <div className="author-icon">
                                        <img src="assets/images/resource/author-1.jpg" alt="" />
                                    </div>
                                    by Mahfuz Riad
                                </div>
                            </div>
                            <h1>Roasted beet salad with arugula, <br/> feta, and garlic vinaigrette</h1>
                            <div className="info-list clearfix">
                                <div className="rating">
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star-half-o"></span>&ensp;
                                    8 Review
                                </div>
                            </div>
                            <ul className="post-meta">
                                <li><span className="icon flaticon-dish"></span>4 ingredients</li>
                                <li><span className="icon flaticon-clock-3"></span>6 Min</li>
                                <li><span className="icon flaticon-business-and-finance"></span>4 People</li>
                            </ul>
                        </div>  
                    </div>
                </div>

            
                <div className="slide-item">
                    <div className="image-layer" style={{backgroundImage:"url(assets/images/background/6.jpg)"}}></div>

                    <div className="auto-container">
                        <div className="content-box">
                            <div className="image">
                                <img src="assets/images/resource/image-1.png" alt="" />
                            </div>
                            
                            <div className="author-name">
                                <div className="author-inner">
                                    <div className="author-icon">
                                        <img src="assets/images/resource/author-1.jpg" alt="" />
                                    </div>
                                    by Mahfuz Riad
                                </div>
                            </div>
                            <h1>Roasted beet salad with arugula, <br/> feta, and garlic vinaigrette</h1>
                            <div className="info-list clearfix">
                                <div className="rating">
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star-half-o"></span>&ensp;
                                    8 Review
                                </div>
                            </div>
                            <ul className="post-meta">
                                <li><span className="icon flaticon-dish"></span>4 ingredients</li>
                                <li><span className="icon flaticon-clock-3"></span>6 Min</li>
                                <li><span className="icon flaticon-business-and-finance"></span>4 People</li>
                            </ul>
                        </div>  
                    </div>
                </div>
                
                
                <div className="slide-item">
                    <div className="image-layer" style={{backgroundImage:"url(assets/images/background/6.jpg)"}}></div>

                    <div className="auto-container">
                        <div className="content-box">
                            <div className="image">
                                <img src="assets/images/resource/image-1.png" alt="" />
                            </div>
                            
                            <div className="author-name">
                                <div className="author-inner">
                                    <div className="author-icon">
                                        <img src="assets/images/resource/author-1.jpg" alt="" />
                                    </div>
                                    by Mahfuz Riad
                                </div>
                            </div>
                            <h1>Roasted beet salad with arugula, <br/> feta, and garlic vinaigrette</h1>
                            <div className="info-list clearfix">
                                <div className="rating">
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star-half-o"></span>&ensp;
                                    8 Review
                                </div>
                            </div>
                            <ul className="post-meta">
                                <li><span className="icon flaticon-dish"></span>4 ingredients</li>
                                <li><span className="icon flaticon-clock-3"></span>6 Min</li>
                                <li><span className="icon flaticon-business-and-finance"></span>4 People</li>
                            </ul>
                        </div>  
                    </div>
                </div>
                
            </div>
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
							<div className="title">TRENDING</div>
							<h2>Standing Rib Roast</h2>
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
                            <Link to="recipes.html" className="theme-btn btn-style-one"><span className="txt">See all Post</span></Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="outer-container">
                <div className="row clearfix">
                    
                    
                    <div className="recipes-block style-three col-lg-3 col-md-6 col-sm-12">
                        <div className="inner-box">
                            <div className="image">
                                <Link to="recipes-detail.html"><img src="assets/images/resource/recipe-8.jpg" alt="" /></Link>
                            </div>
                            <div className="lower-content">
                                <div className="author-image"><img src="assets/images/resource/author-5.jpg" alt="" /></div>
                                {/* <div className="category">CHICKEN</div> */}
                                <h4><Link to="recipes-detail.html">Pressure-Cooker Beef Short Ribs with Chutney</Link></h4>
                                <div className="text">Discover a sleighload of tasty snacks that are just right for holiday feasting.</div>
                                <ul className="post-meta">
                                    {/* <li><span className="icon flaticon-dish"></span>4 ingredients</li> */}
                                    {/* <li><span className="icon flaticon-clock-3"></span>6 Min</li> */}
                                    <li><span className="icon flaticon-business-and-finance"></span>4 Votes</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    
                    <div className="recipes-block style-three col-lg-3 col-md-6 col-sm-12">
                        <div className="inner-box">
                            <div className="image">
                                <Link to="recipes-detail.html"><img src="assets/images/resource/recipe-9.jpg" alt="" /></Link>
                            </div>
                            <div className="lower-content">
                                <div className="author-image"><img src="assets/images/resource/author-4.jpg" alt="" /></div>
                                {/* <div className="category">Gluten Free Recipes</div> */}
                                <h4><Link to="recipes-detail.html">Pressure-Cooker Beef Short Ribs with Chutney</Link></h4>
                                <div className="text">Discover a sleighload of tasty snacks that are just right for holiday feasting.</div>
                                <ul className="post-meta">
                                    {/* <li><span className="icon flaticon-dish"></span>4 ingredients</li> */}
                                    {/* <li><span className="icon flaticon-clock-3"></span>6 Min</li> */}
                                    <li><span className="icon flaticon-business-and-finance"></span>4 Votes</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    
                    <div className="recipes-block style-three col-lg-3 col-md-6 col-sm-12">
                        <div className="inner-box">
                            <div className="image">
                                <Link to="recipes-detail.html"><img src="assets/images/resource/recipe-10.jpg" alt="" /></Link>
                            </div>
                            <div className="lower-content">
                                <div className="author-image"><img src="assets/images/resource/author-6.jpg" alt="" /></div>
                                {/* <div className="category">Cooking Style</div> */}
                                <h4><Link to="recipes-detail.html">Pressure-Cooker Beef Short Ribs with Chutney</Link></h4>
                                <div className="text">Discover a sleighload of tasty snacks that are just right for holiday feasting.</div>
                                <ul className="post-meta">
                                    {/* <li><span className="icon flaticon-dish"></span>4 ingredients</li> */}
                                    {/* <li><span className="icon flaticon-clock-3"></span>6 Min</li> */}
                                    <li><span className="icon flaticon-business-and-finance"></span>4 Votes</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    
                    
                    
                </div>
            </div>
	    </section>
        </>
    )
}
