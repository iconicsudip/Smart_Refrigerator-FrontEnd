import './App.css';
import Header from './components/Header';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route,useParams } from "react-router-dom";
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Home from './components/Home';
import PrivateRoute from './utils/PrivateRoute';
import Dashboard from './components/Dashboard';
import {AuthProvider} from './context/AuthContext';
import Myrecipies from './components/Myrecipies';
import ViewRecipe from './components/ViewRecipe';
import 'bootstrap/dist/js/bootstrap.min.js'
import Footer from './components/Footer';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RefriBot from './components/RefriBot';
function App() {
  const [isAuth,setIsAuth] = useState(null)
  useEffect(()=>{
    localStorage.removeItem('steps')
  },[])
  return (
    <>
        <Router>
          <AuthProvider>
            <Header />
            {/* <PrivateRoute child={<RefriBot />}><RefriBot /></PrivateRoute> */}
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/dashboard" element={<PrivateRoute child={<Dashboard />}><Dashboard /></PrivateRoute>}/>
                <Route exact path="/myrecipies" element={<PrivateRoute child={<Myrecipies />}><Myrecipies /></PrivateRoute>}/>
                <Route exact path="/signup" element={<SignUp />} />
                <Route exact path="/signin" element={<SignIn />} />
                <Route exact path="/myrecipies/recipe/:recipe_id" element={<PrivateRoute child={<ViewRecipe />}><ViewRecipe /></PrivateRoute>} />
            </Routes>
            <Footer />
          </AuthProvider>
        </Router>
    </>
  );
}

export default App;
