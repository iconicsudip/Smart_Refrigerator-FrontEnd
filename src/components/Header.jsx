import React,{useContext, useEffect,useState} from 'react';
import {Link,useParams} from "react-router-dom";
import AuthContext from '../context/AuthContext';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import AddItem from './AddItem';
import {Button} from '@mui/material'

import $ from 'jquery'; 
export default function Header() {
    let {username,logoutUser,userDetails} = useContext(AuthContext);
    // const [userDetails,setUserDetails] = useState(null);
    const [open, setOpen] = useState(false);
    const [Alert,setAlert] = useState('');
    const tempFormData = {
        recipe_name: "",
        vegetables: [],
        ingredients: [],
        recipe_process: [],
        video_link: "",
        recipe_image:"",
    }
    const [formData, setFormData] = useState({
        recipe_name: "",
        vegetables: [],
        ingredients: [],
        recipe_process: [],
        video_link: "",
        recipe_image:"",
    });
    const handleChange = React.useCallback((newValue) => {
        setOpen(newValue);
    }, []);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setFormData(tempFormData)
        localStorage.removeItem('steps');
    }
    let params = useParams()
    // console.log(username["username"])
    // const getUserDetails = async (username) => {
    //     await fetch(`${process.env.REACT_APP_API}/api/userdetails/${username}`,{
    //         method:'GET',
    //         headers:{
    //             'Content-Type':'application/json',
    //         },
    //     }).then(response=>response.json()).then(json=>{
    //         setUserDetails(json)
    //     })
    // }
    useEffect(() => {
        //Hidden Sidebar
        // getUserDetails(username.username)
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
                                <div className="logo"><Link to="/"><img src="logo_fp.png" alt="" title=""/></Link></div>
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
                                                <div className="dropdown text-end">
                                                    <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                        {userDetails?.image ?
                                                            <img src={`${userDetails?.image}`} width="32" height="32" alt="" className="rounded-circle" />
                                                            :
                                                            <img src="/assets/images/avatar.png" width="32" height="32" alt="" className="rounded-circle" />
                                                        }
                                                    </a>
                                                    <ul style={{background:"#222222"}} className="dropdown-menu text-small" data-popper-placement="bottom-end">
                                                        <li><Link className="dropdown-item" to={`/profile/${username.username}`} >Profile</Link></li>
                                                        <li><hr className="dropdown-divider"/></li>
                                                        <li><Link className="dropdown-item" to="" onClick={logoutUser}>Log out</Link></li>
                                                    </ul>
                                                </div>
                                            </li>
                                            <li className="recipe"><Link to="#" onClick={handleOpen}><span className="fa fa-plus-circle"></span>&nbsp; Add Recipe</Link></li>
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
                {Alert}
            </header>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <AddItem formData={formData} setFormData={setFormData} setOpen={setOpen} setAlert={setAlert} open={open} Open={handleChange} setMyrecipies={""} tempFormData={tempFormData} action={"create"}/>
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}
