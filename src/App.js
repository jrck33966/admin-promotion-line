import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom'


// Pages
// import AddPormotion from './pages/addPromotion/addPromotion';
// import Edit from './pages/home'
import Error from './pages/error/Error'
import Home from './pages/home'

function App() {
  let activeClassName = 'nav-active';
  let ClassName = 'nav-item';

  return (
    <>
      <div className='main'>
        <BrowserRouter basename="/admin-promotion-line">
          <nav className='navbar'>
             {/* <NavLink end to="/" className={({ isActive }) => isActive ? activeClassName : ClassName} >Add Promotion</NavLink> */}
            {/* <NavLink to="/edit" className={({ isActive }) => isActive ? activeClassName : ClassName} >Edit Promotion</NavLink>     */}
          </nav>
          <Routes>
            <Route path='/' element={<Home />} />
            {/* <Route path='/edit' element={<Edit />} /> */}
            <Route path='*' element={<Error />} />
          </Routes>
        </BrowserRouter>

      </div>
    </>
  );
}

export default App;
