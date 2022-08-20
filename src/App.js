import './App.css';
import Header from './components/Header';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Routes, Route } from "react-router-dom";
import SignUp from './components/SignUp';
import Home from './components/Home';
function App() {
  return (
    <>
        <Router>
          <Header />
          <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/signup" element={<SignUp />} />
          </Routes>    
        </Router>
    </>
  );
}

export default App;
