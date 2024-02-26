import React, { useEffect, useState } from 'react'; // Importa useContext
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './carprofile.css';
// Importa il contesto dell'utente

const CarProfile = () => {
    const { carLicensePlate } = useParams();
    // Ottieni il contesto dell'utente
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCar = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/car/${carLicensePlate}`);
                setCar(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error loading car:", error);
                setLoading(false);
            }
        };
        
        loadCar();
    }, [carLicensePlate]);

    const addToCart = async () => {
        try {
            const response = await axios.put('http://localhost:8080/buy', car);
            if (response.status === 200) {
                console.log("Car added to cart:", response.data);
            } else {
                console.error("Error adding car to cart:", response.data);
            }
        } catch (error) {
            console.error("Error in API call:", error);
        }
    };

    if (loading) {
        return <p>Loading car...</p>;
    }

    if (!car) {
        return <p>No car found with the provided license plate</p>;
    }

    return (
        <section className='shadow' style={{ backgroundColor: 'whitesmoke' }}>
            <div className='container py-5'>
                <div className='row'>
                    <div className='col-lg-3'>
                        <div className='card mb-4'>
                            <div className='card-body text-center'>
                                <img
                                    src={car.imageUrl}
                                    alt="car"
                                    className="rounded-circle img-fluid"
                                    style={{ width: 150 }} />
                                <h5 className='my-3'>{`${car.carLicensePlate} ${car.brand}`}</h5>
                                <div className='d-flex justify-content-center mb-2'>
                                    <button type='button' className='btn btn-outline-primary' onClick={addToCart}>Buy</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-9'>
                        <div className='card mb-4'>
                            <div className='card-body'>
                                <hr />
                                <div className='row'>
                                    <div className='col-sm-3'>
                                        <h5 className='mb-0'>Car License Plate</h5>
                                    </div>
                                    <div className='col-sm-9'>
                                        <p className='text-muted mb-0'>{car.carLicensePlate}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className='row'>
                                    <div className='col-sm-3'>
                                        <h5 className='mb-0'>Brand</h5>
                                    </div>
                                    <div className='col-sm-9'>
                                        <p className='text-muted mb-0'>{car.brand}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className='row'>
                                    <div className='col-sm-3'>
                                        <h5 className='mb-0'>Production Year</h5>
                                    </div>
                                    <div className='col-sm-9'>
                                        <p className='text-muted mb-0'>{car.productionYear}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className='row'>
                                    <div className='col-sm-3'>
                                        <h5 className='mb-0'>Price</h5>
                                    </div>
                                    <div className='col-sm-9'>
                                        <p className='text-muted mb-0'>{car.price}</p>
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <Link to={'/'} className='btn btn-outline-warning btn-lg'>Back</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CarProfile;

