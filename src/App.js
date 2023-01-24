import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom'
import { useCookies } from 'react-cookie';

// Pages
// import AddPormotion from './pages/addPromotion/addPromotion';
// import Edit from './pages/home'
import Error from './pages/error/Error'
import Home from './pages/home'
import SignIn from './pages/login/login'

function App() {
  let activeClassName = 'nav-active';
  let ClassName = 'nav-item';
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  if (!cookies.token) {
    return <SignIn setCookie={setCookie} removeCookie={removeCookie} />
  }


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
            <Route path='*' element={<Error />} />
          </Routes>
        </BrowserRouter>

      </div>
    </>
  );
}

export default App;
