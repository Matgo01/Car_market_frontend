import React, { useEffect, useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import './edituser.css';
import { useAuth } from '../common/AuthContext';


const EditUser = () => {
    let navigate = useNavigate();
    const { authUser } = useAuth();
    const [passwordError, setPasswordError] = useState('');
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: ''
    });

    const { firstName, lastName, email, username, password } = user;

    useEffect(() => {
        const loadUser = async () => {
            try {
                if (authUser) {
                    const result = await axios.get(`http://localhost:8080/user/${authUser.id}`); // Utilizza l'id dell'utente autenticato
                    setUser(result.data);
                }
            } catch (error) {
                console.error("error loading user", error);
            }
        };

        loadUser(); 

    }, [authUser]);

    const handleInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            if (!validatePassword(password)) {
                setPasswordError('La password deve contenere almeno una lettera maiuscola, un numero e un carattere speciale');
                return;
            }
            
            setPasswordError('');
            await axios.put(`http://localhost:8080/user/update/${authUser.id}`, user);
            navigate("/user-profile");
        } catch (error) {
            console.error("error updating user", error)
        }
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
        return passwordRegex.test(password);
    };


    return (
        <div className='col-sm-8 py-2 px-5'>
            <h2 className='mt-5'>Edit User</h2>
            <form onSubmit={(e) => updateUser(e)}>
                <div className='input-group mb-5'>
                    <label className='input-group-text' htmlFor='firstName'>First Name</label>
                    <input
                        className='from control col-sm-6'
                        type='text'
                        name='firstName'
                        id='firstName'
                        required
                        value={firstName}
                        onChange={(e) => handleInputChange(e)} />
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
                        onChange={(e) => handleInputChange(e)} />
                </div>
                <div className='input-group mb-5'>
                    <label className='input-group-text' htmlFor='email'>Email</label>
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
                    <label className='input-group-text' htmlFor='username'>Username</label>
                    <input
                        className='form-control col-sm-6'
                        type='text'
                        name='username'
                        id='username'
                        required
                        value={username}
                        onChange={(e) => handleInputChange(e)} />
                </div>
                <div className='input-group mb-5'>
                    <label className='input-group-text' htmlFor='password'>Password</label>
                    <input
                        className='form-control col-sm-6'
                        type='password'
                        name='password'
                        id='password'
                        required
                        value={password}
                        onChange={(e) => handleInputChange(e)} />
                </div>
                <div>
                    <button type='submit' className='btn btn-outline-success btn-lg'>Save</button>
                </div>
                <div>
                    <Link to='/user-profile' className='btn btn-outline-warning btn-lg'>Cancel</Link>
                </div>
            </form>
        </div>);
}

export default EditUser;
