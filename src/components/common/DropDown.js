import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './dropdown-menu.css';
import { useAuth } from './AuthContext';

const DropdownMenu = () => {
    const navigate = useNavigate();
    const { authUser } = useAuth();
    const {setIsLoggedIn}=useAuth();
    

    const handleDropdownSelection = async (route) => {
        try {
            if (route === '/logout') {
                console.log("Esegui il logout");
                {/*await axios.post("http://localhost:8080/user/logout");*/}
                setIsLoggedIn=false;

            } else {
                navigate(route);
            }
        } catch (error) {
            console.error("Errore durante la gestione dell'evento di dropdown:", error);
            
            alert("Errore durante la gestione dell'evento di dropdown. Riprova più tardi.");
        }
    };

    if (!authUser) {
        return (
            <Dropdown>
                <Dropdown.Toggle variant='success' id='dropdown-basic'>
                    Opzioni
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleDropdownSelection('/login')}>
                        Login
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDropdownSelection('/register')}>
                        Register
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );
    } else {
        return (
            <Dropdown>
                <Dropdown.Toggle variant='success' id='dropdown-basic'>
                    Opzioni
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleDropdownSelection('/user-profile')}>
                        Profile
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDropdownSelection('/logout')}>
                        Logout
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}

export default DropdownMenu;
