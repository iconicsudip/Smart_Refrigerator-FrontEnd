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
import { useState,useContext} from 'react';
export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [Alert,setAlert] = useState('');
  const [search,setSearch] = useState('');
  const [searchresult,setSearchResult] = useState(null);
  const [loader,setLoader] = useState(true);
  const {authToken} = useContext(AuthContext);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    localStorage.removeItem('steps');
  }
  const handleChange = React.useCallback((newValue) => {
    setOpen(newValue);
  }, []);
  const toSearch = async (e,item=false)=>{
    let final_item = "";
    if(e.target!==undefined){
      final_item = e.target.value;
    }else{
      final_item = e
    }
    if(final_item===""){
      setSearch(null)
    }
    if(final_item===""){
      setSearch('');
    }else{
      setSearch(final_item);
    }
    // setSearchResult(null)
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
      <div className='text-center mt-5'>
        {Alert}
        <Button className='add-item' onClick={handleOpen} variant="contained">Add Recipe</Button>
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <AddItem setOpen={setOpen} setAlert={setAlert} open={open} Open={handleChange}/>
            </Typography>
          </Box>
        </Modal>
      </div>
    </>
  )
}
