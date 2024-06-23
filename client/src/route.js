// src/route.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/login/login';
import Register from './Pages/register/register';
import Menu from './components/menu/menu';

function AppRoutes() {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
