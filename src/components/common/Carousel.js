import React from 'react';
import { Carousel } from 'react-bootstrap'; // Importa Carousel da 'react-bootstrap'
import './my-carousel.css';



const MyCarousel = () => {
    return (
        <div>
            <Carousel wrap={true}>
                <Carousel.Item>
                    <img 
                        className='d-block w-100'
                        src='./img/car1.jpg' // Estensione corretta del file: .jpg
                        alt='Car 1'
                    />
                    <Carousel.Caption>
                        <h3>Car 1</h3>
                        <p>Description</p> {/* Corretto il testo della descrizione */}
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img 
                        className='d-block w-100'
                        src='./img/car2.jpg' // Estensione corretta del file: .jpg
                        alt='Car 2'
                    />
                    <Carousel.Caption>
                        <h3>Car 2</h3>
                        <p>Description</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img 
                        className='d-block w-100'
                        src='./img/car3.jpg' // Estensione corretta del file: .jpg
                        alt='Car 3'
                    />
                    <Carousel.Caption>
                        <h3>Car 3</h3>
                        <p>Description</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img 
                        className='d-block w-100'
                        src='./img/car4.jpg' // Estensione corretta del file: .jpg
                        alt='Car 4'
                    />
                    <Carousel.Caption>
                        <h3>Car 4</h3>
                        <p>Description</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default MyCarousel;
