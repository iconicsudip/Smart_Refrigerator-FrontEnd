import { createContext,useState,useEffect,useCallback} from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children})=>{
    const navigate = useNavigate ();
    const [loading,setLoading] = useState(true);
    const [authToken,setAuthToken] = useState(()=>localStorage.getItem("Authtoken")?JSON.parse(localStorage.getItem("Authtoken")):null);
    const [username,setUsername] = useState(()=>localStorage.getItem("Authtoken")?jwt_decode(localStorage.getItem("Authtoken")):null);
    const [userDetails,setUserDetails] = useState(null)
    const [customalert,setAlert] = useState('');
    let loginUser = async (e)=>{
        e.preventDefault();
        let username_url = `${process.env.REACT_APP_API}/api/getusername/`+e.target.email.value;
        let user_name = await fetch(username_url);
        const raw = await user_name.json();
        // console.log(raw)
        if(await user_name.status === 400){
            setAlert(
                <div className="alert alert-danger" role="alert">
                    <b>{raw.error}</b>
                    <button onClick={()=>{setAlert('')}} type="button" className="add-item close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            );
        }else{
            let response = await fetch(`${process.env.REACT_APP_API}/api/token/`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({'username':raw.username,'password':e.target.password.value})
            })
            let data = await response.json();
            if(await response.status===200){
                setAuthToken(data);
                setUsername(jwt_decode(data['access']));
                localStorage.setItem("Authtoken",JSON.stringify(data));
                navigate("/dashboard");
            }else{
                setAlert(
                    <div className="alert alert-danger" role="alert">
                        <b>Wrong Credentials</b>
                        <button onClick={()=>{setAlert('')}} type="button" className="add-item close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                );
            }
        }
    }
    let logoutUser = useCallback(()=>{
        setAuthToken(null)
        setUsername(null)
        setUserDetails(null)
        localStorage.removeItem("Authtoken");
        navigate("/signin")
    },[navigate])

    let updateToken = useCallback(async ()=>{
        let response = await fetch(`${process.env.REACT_APP_API}/api/token/refresh/`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({'refresh':authToken?.refresh})
        })
        let data = await response.json()
        if(response.status===200){
            setAuthToken(data);
            setUsername(jwt_decode(data.access))
            localStorage.setItem("Authtoken",JSON.stringify(data))
        }else{
            logoutUser();
        }
        if(loading){
            setLoading(false);
        }
    },[authToken,loading,logoutUser])
    const contextData = {
        loginUser:loginUser,
        logoutUser:logoutUser,
        customalert:customalert,
        username:username,
        authToken:authToken,
        userDetails:userDetails
    }
    useEffect(()=>{
        if(loading){
            updateToken()
        }
        let fiveMinutes = 1000*60*5;
        let interval = setInterval(() => {
            if(authToken){
                updateToken();
            }
        },fiveMinutes);
        return ()=>clearInterval(interval)
    },[updateToken,authToken,loading])
    const getUserDetails = async (username) =>{
        await fetch(`${process.env.REACT_APP_API}/api/userdetails/${username}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
            },
        }).then(response=>response.json()).then(json=>{
            setUserDetails(json)
        })
    }
    useEffect(()=>{
        if(username){
            getUserDetails(username.username)
        }
    },[username])
    return (
        <AuthContext.Provider value={contextData}>
            {loading?null:children}
        </AuthContext.Provider>
    )
}