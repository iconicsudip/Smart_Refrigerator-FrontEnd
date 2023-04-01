import React, { useEffect ,useContext,useState} from 'react'
import { useParams } from 'react-router-dom'
import AuthContext from '../context/AuthContext';

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
    )
}
