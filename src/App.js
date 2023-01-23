import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom'


// Pages
import AddPormotion from './addPromotion/addPromotion';
import Edit from './pages/Edit'
import Error from './pages/Error'

function App() {
  let activeClassName = 'nav-active';
  let ClassName = 'nav-item';

  return (
    <>
      <div className='main'>
        <BrowserRouter>
          <nav className='navbar'>
             <NavLink end to="/" className={({ isActive }) => isActive ? activeClassName : ClassName} >Add Promotion</NavLink>
            <NavLink to="/edit" className={({ isActive }) => isActive ? activeClassName : ClassName} >Edit Promotion</NavLink>    
          </nav>
          <Routes>
            <Route path='/' element={<AddPormotion />} />
            <Route path='/edit' element={<Edit />} />
            <Route path='*' element={<Error />} />
          </Routes>
        </BrowserRouter>

      </div>
    </>
  );
}

export default App;
