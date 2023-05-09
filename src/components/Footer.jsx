import React from 'react'
import {Link} from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="main-footer" style={{backgroundImage:"url(assets/images/background/5.png)"}}>
            <div className="auto-container">
                <div className="logo">
                    <Link to="index.html"><img src="images/footer-logo.png" alt="" /></Link>
                </div>
                <ul className="footer-nav">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/myrecipies">My Recipes</Link></li>
                </ul>
                <ul className="social-box">
                    <li><Link to="#"><span className="fa fa-pinterest-p"></span></Link></li>
                    <li><Link to="#"><span className="fa fa-facebook-f"></span></Link></li>
                    <li><Link to="#"><span className="fa fa-instagram"></span></Link></li>
                    <li><Link to="#"><span className="fa fa-twitter"></span></Link></li>
                    <li><Link to="#"><span className="fa fa-youtube-play"></span></Link></li>
                </ul>
                <div className="copyright">&copy; All Right Reserved {new Date().getFullYear()}</div>
            </div>
        </footer>
    )
}
