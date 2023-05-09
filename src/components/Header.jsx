import React,{useContext, useEffect} from 'react';
import {Link,useParams} from "react-router-dom";
import AuthContext from '../context/AuthContext';
import {Button} from '@mui/material'
import $ from 'jquery'; 
export default function Header() {
    let {username,logoutUser} = useContext(AuthContext);

    let params = useParams()
    // console.log(username["username"])
    useEffect(() => {
        //Hidden Sidebar
        if ($('.hidden-bar').length) {
            var hiddenBar = $('.sidebar-btn');
            var hiddenBarOpener = $('.sidebar-btn');
            var hiddenBarCloser = $('.hidden-bar-closer');
            $('.hidden-bar-wrapper').mCustomScrollbar();
            
            //Show Sidebar
            hiddenBarOpener.on('click', function () {
                hiddenBar.addClass('visible-sidebar');
            });
            
            //Hide Sidebar
            hiddenBarCloser.on('click', function () {
                hiddenBar.removeClass('visible-sidebar');
            });
        }
        
        
        //Submenu Dropdown Toggle
        // if($('.main-header li.dropdown ul').length){
        //     $('.main-header li.dropdown').append('<div class="dropdown-btn"><span class="fa fa-angle-down"></span></div>');
            
        //     //Dropdown Button
        //     $('.main-header li.dropdown .dropdown-btn').on('click', function() {
        //         $(this).prev('ul').slideToggle(500);
        //     });
            
        //     //Disable dropdown parent link
        //     $('.main-header .navigation li.dropdown > a,.hidden-bar .side-menu li.dropdown > a').on('click', function(e) {
        //         e.preventDefault();
        //     });
            
        //     //Main Menu Fade Toggle
        //     $('.main-header .nav-toggler').on('click', function() {
        //         $('.main-header .main-menu').fadeToggle(300);
        //     });
            
        // }

        if($('.mobile-menu').length && $('.mobile-menu .navbar-header').length===0){
		
            // $('.mobile-menu .menu-box').mCustomScrollbar();
            
            var mobileMenuContent = $('.main-header .nav-outer .main-menu').html();
            $('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent);
            $('.sticky-header .main-menu').append(mobileMenuContent);
            
            //Dropdown Button
            $('.mobile-menu li.dropdown .dropdown-btn').on('click', function() {
                $(this).toggleClass('open');
                $(this).prev('ul').slideToggle(500);
            });
            //Menu Toggle Btn
            $('.mobile-nav-toggler').on('click', function() {
                $('body').addClass('mobile-menu-visible');
            });
    
            //Menu Toggle Btn
            $('.mobile-menu .menu-backdrop,.mobile-menu .close-btn').on('click', function() {
                $('body').removeClass('mobile-menu-visible');
            });
        }
    },[params])
    return (
        <>
            <header className="main-header fixed-top header-style-one">
                <div className="header-upper">
                    <div className="auto-container">
                        <div className="clearfix">
                            
                            <div className="pull-left logo-box">
                                <div className="logo"><Link to="/"><img src="assets/images/logo.png" alt="" title=""/></Link></div>
                            </div>
                            
                            <div className="nav-outer clearfix">
                                <div className="mobile-nav-toggler"><span className="icon flaticon-menu"></span></div>
                                <nav className="main-menu navbar-expand-md">
                                    <div className="navbar-header">
                                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                            <span className="icon-bar"></span>
                                            <span className="icon-bar"></span>
                                            <span className="icon-bar"></span>
                                        </button>
                                    </div>

                                    <div className="navbar-collapse show collapse clearfix" id="navbarSupportedContent">
                                        <ul className="navigation clearfix">
                                            <li><Link to="/">Home</Link></li>
                                            {username ? (
                                                <>
                                                    <li>
                                                        <Link to="/dashboard">Dashboard</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/myrecipies">My Recipes</Link>
                                                    </li>
                                                </>
                                            ) : null}
                                            {/* <li><Link to="about-us.html">About</Link></li> */}
                                            {/* <li><Link to="category.html">Category</Link></li> */}
                                            {/* <li><Link to="blogs.html">Blogs</Link></li> */}
                                            {/* <li><Link to="contact.html">Contact us</Link></li> */}
                                        </ul>
                                    </div>
                                    
                                </nav>
                                
                                <div className="outer-box">
                                    <ul className="login-info">
                                        {username ? 
                                        <>
                                        <li>
                                            <Link to="" onClick={logoutUser}>Log out {username.username}</Link>                                            
                                        </li>
                                        <li className="recipe"><Link to="add-recipe.html"><span className="fa fa-plus-circle"></span>&nbsp; Add Recipe</Link></li>
                                        </>
                                        :
                                        <li><Link to="/signin"><span className="icon fa fa-user"></span>Login</Link></li>
                                        }
                                    </ul>
                                </div>
                                
                            </div>
                        
                        </div>
                    </div>
                </div>
                <div className="mobile-menu">
                    <div className="menu-backdrop"></div>
                    <div className="close-btn"><span className="icon fa fa-remove"></span></div>
                    
                    <nav className="menu-box">
                        <div className="nav-logo"><Link to="index.html"><img src="assets/images/logo-2.png" alt="" title=""/></Link></div>
                        <div className="menu-outer"></div>
                    </nav>
                </div>
                {/* {username ?  (username.username) : null} */}
            </header>
        </>
    )
}
