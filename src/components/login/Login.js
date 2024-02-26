import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';
import { useAuth } from '../common/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { setAuthUser } = useAuth(); // Ottieni la funzione setAuthUser dal contesto di autenticazione
    const {setLogged}=useAuth();
    const [user, setUserCredentials] = useState({
        email: '',
        password: ''
    });

    const { email, password } = user;

    const handleInputChange = (e) => {
        setUserCredentials({ ...user, [e.target.name]: e.target.value });
    };

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/user/login", user);
            if (response.status === 200) {
                const userId = response.data.id
                await axios.post(`http://localhost:8080/cart/${userId}`);
                setAuthUser({
                    id:user.email
                });
                setLogged=(true); // Imposta l'ID dell'utente nel contesto di autenticazione
                alert("Login successful. Cart created.");
                navigate("/");
            } else {
                console.error("Errore durante il login:", response.data);
            }
        } catch (error) {
            console.error("Errore durante la richiesta di login:", error);
            alert("Errore durante il login. Riprova più tardi.");
        }
    };

    return (
        <div>
            <h2 className='mt-5'>Login</h2>
            <form onSubmit={(e) => loginUser(e)}>
                <div className='input-group mb-5'>
                    <label className='input-group-text' htmlFor='email'> Email</label>
                    <input
                        className='form-control col-sm-6'
                        type='text'
                        name='email'
                        id='email'
                        required
                        value={email}
                        onChange={(e) => handleInputChange(e)} />
                </div>
                <div className='input-group mb-5'>
                    <label className='input-group-text' htmlFor='password'>Password</label>
                    <input
                        name='password'
                        className='form-control col-sm-6'
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => handleInputChange(e)} />
                </div>
                <div>
                    <button type='submit' className='btn btn-outline-success btn-lg'> Login</button>
                </div>
                <div>
                    <Link to={'/'} className='btn btn-outline-warning btn-lg'>Back</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;
