import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Make sure you import useHistory from 'react-router-dom'
import advance from "./advance";

function Login() {
    const nav = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        const result = advance(username, password);

        if (result) {
            // Redirect to the main page on successful login with query parameters
            nav(`/mains?username=${username}&password=${password}`);
        } else {
            // Handle login failure, e.g., show an error message
            console.log('Login failed');
        }
    }

    return (
    
        
        
            <div className="body" id="loginDetails" data-usernames={username} data-passwords={password}>
             <h3 className="qur" id="usernameN">Login: <input className="inputs"type="text" value={username} onChange={(e) => setUsername(e.target.value)} /></h3>
             <h3  className="qur"id="passwordN">Password: <input  className="inputs"type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></h3>
                <div className="btnholder">
                <button className="btn" onClick={handleLogin}>Login</button>
                <button className="btn" onClick={()=>window.location.href="/CreateAccount"}>Create New Account</button>
                </div>
             </div>
       
    );
}

export default Login;
