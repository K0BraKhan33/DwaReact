import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import advance from "./advance";

function Login() {
    const nav = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async ()=> {
        const result =  await advance(username, password);
        console.log(result)

        if (result === true ) {
            // Redirect to the main page on successful login with properly encoded query parameters
            const encodedUsername = encodeURIComponent(username);
            const encodedPassword = encodeURIComponent(password);
            console.log(result)
           window.location.href = `/mains?username=${encodedUsername}&password=${encodedPassword}`;
        } else {
            // Handle login failure, e.g., show an error message
            console.log('Login failed');
        }
    }

    return (<div>
        <h1 className="intro"><img className="logo_l"type="png" src="./favicon_package_v0.16/android-chrome-512x512.png"></img> Listen Along With US <img className="logo       "type="png" src="./favicon_package_v0.16/android-chrome-512x512.png"></img></h1>
    
        <div className="body" id="loginDetails" data-usernames={username} data-passwords={password}>
            
            <h3 className="qur" id="usernameN">Login: <input className="inputs" type="text" value={username} onChange={(e) => setUsername(e.target.value)} /></h3>
            <h3 className="qur" id="passwordN">Password: <input className="inputs" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></h3>
            <div className="btnholder">
                <button className="btn" onClick={handleLogin}>Login</button>
                <button className="btn" onClick={() => window.location.href = "/CreateAccount"}>Create New Account</button>
            </div>
        </div>
        </div>
    );
}

export default Login;
