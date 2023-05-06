import React,{useContext} from 'react';
import {Link} from "react-router-dom";
import AuthContext from '../context/AuthContext';
import {Button} from '@mui/material'
export default function Header() {
    let {username,logoutUser} = useContext(AuthContext);
    // console.log(username["username"])
    return (
        <>
            <header className="main-header fixed-top header-style-one">
                <div className="header-upper">
                    <div className="auto-container">
                        <div className="clearfix">
                            
                            <div className="pull-left logo-box">
                                <div className="logo"><Link to="/"><img src="images/logo.png" alt="" title=""/></Link></div>
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
                                                        <Link className="nav-link" to="/dashboard">Dashboard</Link>
                                                    </li>
                                                    <li>
                                                        <Link className="nav-link" to="/myrecipies">My Recipies</Link>
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
                        <div className="nav-logo"><Link to="index.html"><img src="images/logo-2.png" alt="" title=""/></Link></div>
                        <div className="menu-outer"></div>
                    </nav>
                </div>
                {/* {username ?  (username.username) : null} */}
            </header>
        </>
    )
}
