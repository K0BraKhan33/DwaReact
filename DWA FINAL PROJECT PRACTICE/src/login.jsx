import React, { useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';
import advance from "./advance";



const supabaseUrl = 'https://fguewcoipjtuyqdrcbyn.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZndWV3Y29pcGp0dXlxZHJjYnluIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc2MzI3NTMsImV4cCI6MjAxMzIwODc1M30.nFtZKKkIdw5OnJ7WKg0Zgfg0qDZCwUBfoAMKApZTdEA'; // Replace with your Supabase key

const supabase = createClient(supabaseUrl, SUPABASE_KEY);


function Login() {
   
    
    const [data, setData] = useState(null);
    const [username, setUsername] = useState(' ');
    const [password, setPassword] = useState(' ');
    //GET USERNAME AND PASSWORD TO IMPORT INTO DETAILS FOR EXPORT TO ADVANCE


    return (
        <div id="loginDetails" userName={username} password={password}>
            <h3>Login: <input type="Username" value={username} onChange={(e) => setUsername(e.target.value)} /></h3>
            <h3>Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></h3>
            <div>
                <button onClick={advance(username,password)}>Login</button>
                <button>Create New Account</button>
            </div>
        </div>
    );
}
// const loginName =advance().loginNameS; // Initialize with empty string
const deProp=document.getElementById("loginDetails");
const username= deProp.userName;
const password=deProp.passord

export const details= advance(username, password)

export default Login;
