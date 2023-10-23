import React, { useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';



const supabaseUrl = 'https://fguewcoipjtuyqdrcbyn.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZndWV3Y29pcGp0dXlxZHJjYnluIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc2MzI3NTMsImV4cCI6MjAxMzIwODc1M30.nFtZKKkIdw5OnJ7WKg0Zgfg0qDZCwUBfoAMKApZTdEA'; // Replace with your Supabase key

const supabase = createClient(supabaseUrl, SUPABASE_KEY);

function Login() {
   
    
    const [data, setData] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        fetchData();
    }, []); // Call fetchData only once when the component mounts

    async function fetchData() {
        const { data, error } = await supabase
            .from('Logins')
            .select('Login_Id, UserName, Password, User_likes');

        if (error) {
            console.error('Error fetching data:', error);
        } else {
            setData(data);
            console.log(data);
        }
    }

    function advance() {
        if (data) {
            const found1 = data.find((innerData) => innerData.UserName === username && innerData.Password === password);

            if (found1) {
                console.log('Logged in');
                window.location.href="/mains";
            } else {
                console.log('Logged out');
            }
        } else {
            console.log('Data not available');
        }
    }

    return (
        <div>
            <h3>Login: <input type="Username" value={username} onChange={(e) => setUsername(e.target.value)} /></h3>
            <h3>Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></h3>
            <div>
                <button onClick={advance}>Login</button>
                <button>Create New Account</button>
            </div>
        </div>
    );
}

export default Login;
