import React from "react";
import { useContext } from "react";
import './sidebar.styles.css';
import {Link, useNavigate} from 'react-router-dom';
import environments from "../../../environments/environments";
import { AuthContext } from "../../../contexts/Auth.context";

const API_URL = environments.API_URL;

const Sidebar = (props) => {
    const navigate = useNavigate();
    const authContextValue = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            const response = await fetch(`${API_URL}/users/logout`,{
                method: 'POST',
                headers: {
                    'Authorization': authContextValue.userToken,
                },
            });

            if (!response.ok) {
                throw new Error()
            }

            const responseObj = await response.json();
            const message = responseObj.message;
            alert(message);

            localStorage.removeItem('user-token');
            authContextValue.setUserToken('');
            props.hideSideBar();
            navigate('/');

        } catch (error) {
            alert('Something went wrong!')
            console.log(error);
        }
    }

    return(
        <div className={`backdrop ${props.className}`}>
            
        <div className="sidebar">
            <button type="button" className="close-btn" onClick={props.hideSideBar}>
                X
            </button>

            <ul className="sidebar-items">
                <li className="sidebar-item">
                    <Link to={"/"} onClick={props.hideSideBar}>Home</Link>
                </li>

                {!authContextValue.userToken && (
                <li className="sidebar-item">
                    <Link to={"/users/login"} onClick={props.hideSideBar}>Login</Link>   
                </li>
                )}

                {authContextValue.userToken && (
                <li className="sidebar-item">
                    <Link to={"/cart"} onClick={props.hideSideBar}>Cart</Link>  
                </li>
                 )}
                 
                {authContextValue.userToken && (
                <li className="sidebar-item">
                    <button type="button" className="logout-btn" onClick={handleLogout}>
                        Logout  
                    </button>
                </li> 
                )}
            </ul>

        </div>
        </div>
    );

}

export default Sidebar;
