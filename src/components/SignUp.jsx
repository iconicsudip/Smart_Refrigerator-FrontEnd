import React,{useState} from 'react'
import { useNavigate  } from "react-router-dom";
import {Link} from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function SignUp() {
    const navigate = useNavigate ();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [fpassword, setFpassword] = useState("");
    const [spassword, setSpassword] = useState("");
    const [customalert,setAlert] = useState('');
    const [type,setType] = useState('password');
    const showAlert = async(e)=>{
        setAlert(
            <div className="alert alert-success" role="alert">
                Data saved succesfully
                <button onClick={()=>{setAlert('')}} type="button" className="add-item close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        );
    }
    const Submit =async (e)=>{
        e.preventDefault();
        if(username==="" || name==="" || email===""||fpassword===""||spassword===""){
            alert("Fill these place");
        }else{
            // console.log(name,username,email,fpassword,spassword);
            const result = await fetch(`${process.env.REACT_APP_API}/api/user/register/`, {
                method: "post",
                credentials:'same-origin',
                body: JSON.stringify({ name,username, email,fpassword,spassword }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const status =await result.status;
            const raw = await result.json();
            // console.log(raw)
            if (status.toString() === "200") {
                showAlert();
                setEmail("");
                setName("");
                setUsername("");
                setFpassword("");
                setSpassword("");
                navigate("/signin");
            }
            if(status.toString()==="400"){
                setAlert(
                    <div className="alert alert-danger" role="alert">
                        {raw.error}
                        <button onClick={()=>{setAlert('')}} type="button" className="add-item close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                );
            }   
        }
    }
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });
    
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
        if(type==='password'){
            setType('text');
        }else{
            setType('password');
        }
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <>


            <section class="page-title" style={{backgroundImage:"url(assets/images/background/17.png)"}}>
                <div class="auto-container">
                    <h1>Register</h1>
                </div>
            </section>
            <div class="register-container margin">
                <div class="top-layer" style={{backgroundImage:"url(assets/images/background/20.png)"}}></div>
                <div class="bottom-layer" style={{backgroundImage:"url(assets/images/background/21.png)"}}></div>
                <div class="auto-container">
                    <div class="inner-container">
                        <div class="row clearfix">
                            <div class="image-column col-lg-6 col-md-12 col-sm-12">
                                <div class="inner-column">
                                    <div class="image">
                                        <img src="assets/images/resource/contact.jpg" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div class="form-column col-lg-6 col-md-12 col-sm-12">
                                <div class="inner-column">
                                    <div class="pattern-layer" style={{backgroundImage:"url(assets/images/background/18.png)"}}></div>
                                    <div class="pattern-layer-2" style={{backgroundImage:"url(assets/images/background/19.png)"}}></div>
                                    <div class="register-form">
                                            
                                        <form method="POST" onSubmit={Submit}>
                                            {customalert}
                                            <div class="form-group">
                                                <input type="text" name="username" placeholder="User Name" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                                            </div>
                                            
                                            <div class="form-group">
                                                <input type="text" value={name} name="name" placeholder="Full Name" onChange={(e) => setName(e.target.value)} required/>
                                            </div>
                                            <div class="form-group">
                                                <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                            </div>
                                            <div class="form-group position-relative d-flex">
                                                <input type={type} name="password" placeholder="Password" value={fpassword} onChange={(e) => setFpassword(e.target.value)} required/>
                                                <IconButton className='eye-button' aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end" >
                                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </div>

                                            <div class="form-group">
                                                <input type="password" name="password" placeholder="Confirm password" value={spassword} onChange={(e) => setSpassword(e.target.value)} required/>
                                            </div>
                                            
                                            
                                            <div class="form-group">
                                                <button class="theme-btn btn-style-one" type="submit" name="submit-form"><span class="txt">Register</span></button>
                                                Already have an account? <Link to="/signin">Log In</Link>
                                            </div>

                                        </form>
                                            
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
	        </div>
        </>
    )
}
