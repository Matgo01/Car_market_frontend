import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from '../common/Search';
import { Link } from 'react-router-dom';
import { FaTrashAlt, FaEye, FaEdit } from "react-icons/fa";
import { useAuth } from '../common/AuthContext';

const Cart = () => {
    const { authUser } = useAuth();
    const [cart, setCart] = useState([]);
    const [loadingCart, setLoadingCart] = useState(true);
    const [loadingUser, setLoadingUser] = useState(true);
    const [search, setSearch] = useState("");
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await axios.get(`http://localhost:8080/user/${authUser.id}`);
                setUser(result.data);
                setLoadingUser(false);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [authUser.id]); // Include authUser.id in the dependency array

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get('http://localhost:8080/cart');
                setCart(response.data);
                setLoadingCart(false);
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };

        fetchCart();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/car/delete/${id}`);
            setCart(prevCart => prevCart.filter(item => item.id !== id));
        } catch (error) {
            console.error("error deleting patients", error);
        }
    };

    if (loadingCart || loadingUser) {
        return <p>Loading...</p>;
    }

    if (!cart || cart.length === 0) {
        return <p>No items in cart</p>;
    }

    return (
        <section>
            <Search search={search} setSearch={setSearch} />
            <table>
                <thead>
                    <tr>
                        <th>Cart ID</th>
                        <th>User</th>
                        <th>Car IDs</th>
                        <th colSpan={'3'}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{user.firstName} {user.lastName}</td> 
                            <td>
                                <ul>
                                    {item.car.map(car => (
                                        <li key={car.id}>{car.id} - {car.brand} {car.model}</li>
                                    ))}
                                </ul>
                            </td>
                            <td>
                                <Link to={`/car-profile/${item.id}`} className="btn btn-info">
                                    <FaEye />
                                </Link>
                            </td>
                            <td>
                                <Link to={`/edit-cart/${item.id}`} className="btn btn-warning">
                                    <FaEdit />
                                </Link>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>
                                    <FaTrashAlt />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default Cart;
