import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './register.css';


const Register = () => {
    let navigate = useNavigate();

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: ''
    });

    const [passwordError, setPasswordError] = useState('');

    const { firstName, lastName, email, username, password } = user;

    const handleInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
        return passwordRegex.test(password);
    };


    const saveUser = async (e) => {
        e.preventDefault();
        try {
            if(!validatePassword(password)){
                setPasswordError('La password deve contenere almeno una lettera maiuscola, un numero e un carattere speciale');
                return;
            }
            setPasswordError('');
            await axios.post("http://localhost:8080/user/register", user);
            navigate("/")
        } catch (error) {
            console.log(error);
            
        }
    }

    return (
        <div>
            <h2 className='mt-5'>Register User</h2>
            <form onSubmit={(e) => saveUser(e)}>
                <div className='input-group mb-5'>
                    <label className='input-group-text' htmlFor='firstName'>
                        First Name
                    </label>
                    <input
                        className='form-control col-sm-6'
                        type='text'
                        name='firstName'
                        id='firstName'
                        required
                        value={firstName}
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>
                <div className='input-group mb-5'>
                    <label className='input-group-text' htmlFor='lastName'>Last Name</label>
                    <input
                        className='form-control col-sm-6'
                        type='text'
                        name='lastName'
                        id='lastName'
                        required
                        value={lastName}
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>
                <div className='form-control col-sm-5'>
                    <label className='input-group-text' htmlFor='email'>Email</label>
                    <input
                        className='form-control col-sm-6'
                        type='text'
                        name='email'
                        id='email'
                        required
                        value={email}
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>
                <div className='form-control col-sm-5'>
                    <label className='input-group-text' htmlFor='username'>Username</label>
                    <input
                        className='form-control col-sm-6'
                        type='text'
                        name='username'
                        id='username'
                        required
                        value={username}
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>
                <div className='form-control col-sm-5'>
                    <label className='input-group-text' htmlFor='password'>Password</label>
                    <input
                        className='form-control col-sm-6'
                        type='password'
                        name='password'
                        id='password'
                        required
                        value={password}
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>
                <div>
                    <button type='submit' className='btn btn-outline-success btn-lg'> Save</button>
                </div>
                <div>
                    <Link to={'/'} className='btn btn-outline-warning btn-lg'>Cancel</Link>
                </div>
            </form>
        </div>);
}

export default Register;
