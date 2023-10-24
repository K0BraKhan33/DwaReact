import React, { useState } from "react";
import advance from "./advance";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        advance(username, password);
    }

    return (
        <div id="loginDetails" userNames="username" passWords="password">
            <h3>Login: <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /></h3>
            <h3>Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></h3>
            <div>
                <button onClick={handleLogin}>Login</button>
                <button>Create New Account</button>
            </div>
        </div>
    );
}
const loginDetails=document.getElementById("loginDetails");
console.log(loginDetails)



export default Login;
