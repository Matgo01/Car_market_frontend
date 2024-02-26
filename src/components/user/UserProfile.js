
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../common/AuthContext'; // Importa la funzione useAuth dal contesto di autenticazione
import './userprofile.css';

const UserProfile = () => {
    const { authUser } = useAuth(); // Ottieni l'utente autenticato dal contesto
    const [logUser, setLogUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: ''
    });

    useEffect(() => {
        const loadUser = async () => {
            try {
                if (authUser) {
                    const result = await axios.get(`http://localhost:8080/user/${authUser.id}`); // Utilizza l'id dell'utente autenticato
                    setLogUser(result.data);
                }
            } catch (error) {
                console.error("error loading user", error);
            }
        };

        loadUser(); 

    }, [authUser]);
    return (
        <section className='shadow' style={{ backgroundColor: 'whitesmoke' }}>
            <div className='container py-5'>
                <div className='row'>
                    <div className='col-lg-3'>
                        <div className='card mb-4'>
                            <div className='card-body text-center'>
                                <img
                                    src="https://mdbcd.b-cdn.net/img/Photos/new-templates/bootstrap-chat/avatar"
                                    alt="avatar"
                                    className="rounded-circle img-fluid"
                                    style={{ width: 150 }} />
                                <h5 className='my-3'>{`${logUser.firstName} ${logUser.lastName}`}</h5>
                                <div className='d-flex justify-content-center mb-2'>
                                    <Link to='/' className='btn btn-outline-warning btn-lg'>Back</Link>
                                    <Link to={{ pathname: '/cart-profile', state: { user: authUser } }} className='btn btn-outline-info btn-lg'>Cart</Link>
                                    <Link to='/edit-user' className='btn btn-outline-info'>Edit</Link>
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
                                        <h5 className='mb-0'>First Name</h5>
                                    </div>
                                    <div className='col-sm-9'>
                                        <p className='text-muted mb-0'>{logUser.firstName}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className='row'>
                                    <div className='col-sm-3'>
                                        <h5 className='mb-0'>LastName</h5>
                                    </div>
                                    <div className='col-sm-9'>
                                        <p className='text-muted mb-0'>{logUser.lastName}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className='row'>
                                    <div className='col-sm-3'>
                                        <h5 className='mb-0'>Email</h5>
                                    </div>
                                    <div className='col-sm-9'>
                                        <p className='text-muted mb-0'>{logUser.email}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className='row'>
                                    <div className='col-sm-3'>
                                        <h5 className='mb-0'>Username</h5>
                                    </div>
                                    <div className='col-sm-9'>
                                        <p className='text-muted mb-0'>{logUser.username}</p>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default UserProfile;
