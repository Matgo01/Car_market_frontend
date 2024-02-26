import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import './App.css';
import React, { useState } from 'react';
import Navbar from './components/common/NavBar';
import Footer from './components/common/Footer';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home';
import Login from './components/login/Login';
import Register from './components/login/Register';
import UserProfile from './components/user/UserProfile';
import EditUser from './components/user/EditUser';
import Cart from './components/cart/Cart';
import AddCar from './components/car/AddCar';
import CarProfile from './components/car/CarProfile';
import EditCar from './components/car/EditCar';
import ViewCar from './components/car/ViewCar';
import { AuthProvider } from "./components/common/AuthContext";

function App() {
  


  return (
    <main className='container mt-5'>
    <AuthProvider>
      <Router>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/user-profile' element={<UserProfile />} />
            <Route exact path='/edit-user' element={<EditUser />} />
            <Route exact path='/cart-profile' element={<Cart />} />
            <Route exact path='/add-car' element={<AddCar />} />
            <Route exact path='/car-profile' element={<CarProfile />} />
            <Route exact path='/edit-car' element={<EditCar />} />
            <Route exact path='/view-cars' element={<ViewCar />} />
          </Routes>
          <Footer />
      </Router>
    </AuthProvider>
    </main>
  );
}

export default App;
