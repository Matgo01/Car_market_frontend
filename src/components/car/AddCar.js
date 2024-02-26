import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './addcar.css';


const AddCar = () => {
    let navigate = useNavigate();
    

    const [car, setCar] = useState({
        carLicensePlate: '',
        brand: '',
        productionYear: '',
        price: '',
        imageUrl: ''
    });

    const { carLicensePlate, brand, productionYear, price, imageUrl } = car;

    const handleInputChange = (e) => {
        setCar({ ...car, [e.target.name]: e.target.value });
    };

    const saveCar = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/car", car);
            navigate("/view-cars");
        } catch (error) {
            console.error("Error saving car:", error);
            // Gestisci l'errore qui
        }
    };

    return (
        <div className='col-sm-8 py-2 px-5'>
            <h2 className='mt-5'>Add Car</h2>
            <form onSubmit={(e) => saveCar(e)}>
                <div className='input-group mb-5'>
                    <label className='input-group-text' htmlFor='carLicensePlate'>
                        Car License Plate
                    </label>
                    <input
                        className='form-control col-sm-6'
                        type='text'
                        name='carLicensePlate'
                        id='carLicensePlate'
                        required
                        value={carLicensePlate}
                        onChange={(e) => handleInputChange(e)} />
                </div>
                <div className='input-group mb-5'>
                    <label className='input-group-text' htmlFor='brand'>Brand</label>
                    <input
                        className='form-control col-sm-6'
                        type='text'
                        name='brand'
                        id='brand'
                        required
                        value={brand}
                        onChange={(e) => handleInputChange(e)} />
                </div>
                <div className='input-group mb-5'>
                    <label className='input-group-text' htmlFor='productionYear'>Production Year</label>
                    <input
                        className='form-control col-sm-6'
                        type='text'
                        name='productionYear'
                        id='productionYear'
                        required
                        value={productionYear}
                        onChange={(e) => handleInputChange(e)} />
                </div>
                <div className='input-group mb-5'>
                    <label className='input-group-text' htmlFor='price'>Price</label>
                    <input
                        className='form-control col-sm-6'
                        type='number'
                        name='price'
                        id='price'
                        min='0'
                        required
                        value={price}
                        onChange={(e) => handleInputChange(e)} />
                </div>
                <div className='input-group mb-5'>
                    <label className='input-group-text' htmlFor='imageUrl'>Image URL</label>
                    <input
                        className='form-control col-sm-6'
                        type='text'
                        name='imageUrl'
                        id='imageUrl'
                        required
                        value={imageUrl}
                        onChange={(e) => handleInputChange(e)} />
                </div>
                <div>
                    <button type='submit' className='btn btn-outline-success btn-lg'>Save</button>
                </div>
                <div>
                    <Link to={'/view-cars'} className='btn btn-outline-warning btn-lg'>Cancel</Link>
                </div>
            </form>
        </div>
    );
};

export default AddCar;
