import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './editcar.css';

const EditCar = () => {
    let navigate = useNavigate();
    const { id } = useParams();

    const [car, setCar] = useState({
        carLicensePlate: '',
        brand: '',
        productionYear: '',
        price: '',
        imageUrl: ''
    });

    const { carLicensePlate, brand, productionYear, price, imageUrl } = car;

    useEffect(() => {
        const loadCar = async () => {
            try {
                const result = await axios.get(`http://localhost:8080/car/${id}`);
                setCar(result.data);
            } catch (error) {
                console.error("error loading car", error);
            }
        };
        loadCar();
    }, [id]);

    const handleInputChange = (e) => {
        setCar({ ...car, [e.target.name]: e.target.value });
    };

    const updateCar = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/car/update/${id}`, car);
            navigate("/view-cars");
        } catch (error) {
            console.error("error updating car", error)
        }
    };

    return (
        <div className='col-sm-8 py-2 px-5'>
            <h2 className='mt-5'>Edit Car</h2>
            <form onSubmit={(e) => updateCar(e)}>
                <div className='input-group mb-5'>
                    <label className='input-group-text' htmlFor='carLicensePlate'>Car License Plate</label>
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
                <button type='submit' className='btn btn-outline-success btn-lg'>Save</button>
                <Link to={'/view-cars'} className='btn btn-outline-warning btn-lg'>Cancel</Link>
            </form>
        </div>
    );
}

export default EditCar;
