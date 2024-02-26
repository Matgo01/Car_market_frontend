import React from 'react';
import MyCarousel from './components/common/Carousel'; 
import './home.css'

const Home = () => {
    return (
        <div className="home-container"> 
            <MyCarousel /> 
            <h2>Car Market</h2>
            <div className="welcome-message"> 
                <h2>Benvenuto</h2>
            </div>
        </div>
    )
}

export default Home;
