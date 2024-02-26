import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { FaEye, FaEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Search from '../common/Search';
import './viewcar.css';

 

const ViewCar = () => {
    
    const [car, setCar] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadCar();
    }, [])

    const loadCar = async () => {
        try {
            const result = await axios.get("http://localhost:8080/car", {
                validateStatus: () => {
                    return true;
                },
            });
            if (result.status === 302) {
                setCar(result.data);
            }
        } catch (error) {
            console.error("error loading car", error);
        }
    };

    return (
        <section>
            <Search search={search} setSearch={setSearch} />
             
            <table className='table table-bordered table-hover shadow'>
                <thead>
                    <tr className='text-center'>
                        <th>Car License Plate</th>
                        <th>Brand</th>
                        <th>Production Year</th>
                        <th>Price</th>
                        <th colSpan='2'>Actions</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {car
                        .filter((ca) => ca.carLicensePlate.toLowerCase().includes(search))
                        .map((car, index) => (
                            <tr key={car.carLicensePlate}>
                                <td>{car.carLicensePlate}</td>
                                <td>{car.brand}</td>
                                <td>{car.productionYear}</td>
                                <td>{car.price}</td>
                                <td className='mx-2'>
                                    <Link to={`/car-profile/${car.carLicensePlate}`} className='btn btn-info'>
                                        <FaEye />
                                    </Link>
                                </td>
                                <td className='mx-2'>
                                    <Link to={`/edit-car/${car.carLicensePlate}`} className='btn btn-warning'>
                                        <FaEdit />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </section>
    );
}

export default ViewCar;
