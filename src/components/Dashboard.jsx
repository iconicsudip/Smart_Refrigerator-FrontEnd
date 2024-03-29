import React from 'react';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import AddItem from './AddItem';
import AuthContext from '../context/AuthContext';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { useState,useContext,useEffect} from 'react';
import {Link} from 'react-router-dom'
import RefriBot from './RefriBot';
export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [Alert,setAlert] = useState('');
  const [search,setSearch] = useState('');
  const [searchresult,setSearchResult] = useState(null);
  const [loader,setLoader] = useState(true);
  const {authToken,username,userDetails} = useContext(AuthContext);
  const [recipeResult,setRecipeResult] = useState(null)
  const [pageStart,setPageStart] = useState(0);
  const [total,setTotal] = useState(0)
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    localStorage.removeItem('steps');
  }
  const getRecipies = async (item)=>{
    console.log(item)
    if(total>pageStart || pageStart===0){
      setLoader(true)
      await fetch(`${process.env.REACT_APP_API}/api/getrecipies/${item}/start=${pageStart}`,{
          method:'GET',
          headers:{
              'Content-Type':'application/json',
              'Authorization':'Bearer '+ String(authToken.access),
          },
      }).then(response=>response.json()).then(json=>{
        // console.log(json)
          if(json["notfound"]){
            setRecipeResult(json["notfound"])
          }else{
            setTotal(json["total"])
            if(item==="all"){
              if(recipeResult!==null){
                setRecipeResult([...recipeResult,...json["results"]]);
              }else{
                setRecipeResult([...json["results"]]);
              }
            }else{
              setRecipeResult([...recipeResult,...json["results"]]);
            }
            let newStart = pageStart +4;
            setPageStart(newStart)
          }
          setLoader(false);
      })
    }
  }
  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
        setTimeout(() => {
          if(search === "" || search===null || search===undefined){
            setSearchResult(null)
            getRecipies("all")
          }else{
            setSearchResult(null)
            getRecipies(search)
          }
        }, 0);
    }
  };
  useEffect(() => {
    // fetchData();
      window.addEventListener('scroll', handleScroll);
      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, [pageStart]);
  useEffect(()=>{
    getRecipies("all")
  },[])
  useEffect(()=>{
    if(search === ""){
      setSearchResult(null)
      setPageStart(0)
      setTotal(0)
      getRecipies("all")
    }else{
      console.log(search)
      setSearchResult(null)
      setPageStart(0)
      setTotal(0)
      getRecipies(search)
    }
  },[search])
  const handleChange = React.useCallback((newValue) => {
    setOpen(newValue);
  }, []);
  const toSearch = async (e,item=false)=>{
    let final_item = "";
    if(e.target!==undefined){
      final_item = e.target.value;
    }else{
      final_item = ""
    }
    if(final_item===""){
      setSearch(null)
    }
    if(final_item===""){
      setSearch('');
    }else{
      setSearch(final_item);
    }
    
    setLoader(true)
    if(final_item!==""){
      
      await fetch(`${process.env.REACT_APP_API}/api/gosearch/`,{
          method:'POST',
          body: JSON.stringify({item:final_item}),
          headers:{
              'Content-Type':'application/json',
              'Authorization':'Bearer '+ String(authToken.access),
          },
      }).then(response=>response.json()).then(json=>{
          if(json["notfound"]){
            setSearchResult(json["notfound"])
          }else{
            setSearchResult(json["search_result"]);
          }
          setLoader(false);
      })
    }else{
      setSearchResult(null)
      setPageStart(0)
      setTotal(0)
      setLoader(false);
    }
  }
  const getItem = (e)=>{
    var selected_item = e.target.innerHTML.split('<b>')[1].split('<span')[0].split('</b>').join('')
    setSearch(selected_item)
    toSearch(selected_item)
  }
  const searchItems = (e)=>{
    e.preventDefault();
    toSearch(search)
    
  }
  const eraseList = (e)=>{
    setSearchResult(null)
  }
  return (
    <>
      {username!==null?<RefriBot username={username} userDetails={userDetails}/>:null}
      <section className="page-title" style={{backgroundImage:"url(assets/images/background/10.jpg"}}>
          <div className="auto-container">
              <h1>Dashboard</h1>
          </div>
      </section>
      <section className="product-form-section style-two">
        <div className="auto-container">
          <div className="inner-container margin-top">
            <div className="default-form">
              <form method="post" onSubmit={searchItems}>
                <div className="clearfix">
                  <div className="form-group col-lg-10">
                    <input type="text" name="text" value={search} onChange={toSearch} placeholder="Recipe Kayword" required/>
                    {searchresult?
                    <div className="search_result">
                      {loader?
                      <div className="loader" style={{marginTop:0}}>
                          <img src="./loading.gif" width={40} alt="" />
                      </div>:
                      <div className="close-items">
                        <span className="close" onClick={eraseList}>&times;</span>
                        {Array.isArray(searchresult)?
                          <List style={{width:"100%"}}>
                            {searchresult.map((sr,ind)=>{
                              return (
                                <ListItem disablePadding onClick={getItem} key={"item"+ind}>
                                  <ListItemButton >
                                    <b>{search.charAt(0).toUpperCase() + search.slice(1)}</b>{sr.substring(search.length)}
                                  </ListItemButton>
                                </ListItem>
                              )
                            })}
                          </List>
                        :<span style={{textAlign:"center",width: "100%"}}>{searchresult}</span>}
                      </div>}
                    </div>
                  :null}
                  </div>
                  <div className="form-group col-lg-2 col-md-12 col-sm-12">
                    <button onClick={searchItems} className="theme-btn search-btn"><span className="fa fa-search"> Search</span></button>
                  </div>
                  
                </div>
              </form>
            </div>
            
          </div>
        </div>
      </section>
      <section className="popular-recipes-section style-three">
        <div className="auto-container">
            <div className="sec-title">
                <div className="clearfix">
                    <div className="pull-left">
                        <h2>All recipes</h2>
                        <div className="text">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed tincidunt ut</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="outer-container">
          <div className="row clearfix ">
            
            {Array.isArray(recipeResult)?recipeResult.map((item)=>{
                return (
                    <div className="recipes-block style-three col-lg-3 col-md-6 col-sm-12">
                        <div className="inner-box">
                            <div className="image">
                            
                                <Link to={`/myrecipies/recipe/${item?.id}`}>
                                  {item?.recipe_image==="None" ?
                                      <img src="assets/images/resource/entertaining-5.jpg" alt="" />
                                  :
                                    <img src={`${item?.recipe_image}`} alt="" />
                                  }
                                </Link>
                            </div>
                            <div className="lower-content">
                                <div className="author-image">
                                  <Link to={`/profile/${item?.author_name}`}>
                                    {item?.author_image ?
                                        <img src={`${item?.author_image}`} alt="" />
                                        :
                                        <img src="/assets/images/avatar.png" alt="" />
                                    }
                                  </Link>
                                </div>
                                <div className="category">by {item?.author_name}</div>
                                <h4><Link to={`/myrecipies/recipe/${item?.id}`}>{item?.recipe_name}</Link></h4>
                                <div className="text">{(item?.recipe_process).toString().slice(0,100)}...</div>
                                <ul className="post-meta">
                                    <li><span className="icon flaticon-dish"></span>{item?.ingredient?.length} ingredients</li>
                                    <li><span className="icon flaticon-business-and-finance"></span>{item?.votes} Votes</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )
            }):
            <h3 className='text-center w-100'>{recipeResult}</h3>
            }
            {loader?
              <div className="loader d-flex justify-content-center w-100">
                  <img src="./loading.gif" width={40} alt="" />
              </div>:null}
          </div>
        </div>
      </section>
    </>
  )
}
