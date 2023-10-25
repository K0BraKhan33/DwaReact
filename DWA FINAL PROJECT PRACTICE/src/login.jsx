    import React, { useState } from "react";
    import advance from "./advance";
    
    function Login() {

        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
         function sender(){
            window.location.href = "/mains";}

        const handleLogin = () => {
        advance(username, password);
        
     
//use useParam


        }

        return (
            <div id="loginDetails" data-usernames={username} data-passwords={password}>
                <h3 id="usernameN">Login: <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /></h3>
                <h3 id="passwordN">Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></h3>
                <div>
                    <button onClick={handleLogin}>Login</button>
                    <button>Create New Account</button>
                </div>
            </div>
        );
    }


// In a file named loginDetails.js


    export default Login;
