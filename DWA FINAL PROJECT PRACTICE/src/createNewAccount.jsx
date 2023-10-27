import React, { useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';

export default function NewAccounts() {
  const [username, setUsername] = useState("");
  const [passwordFirst, setPasswordFirst] = useState("");
  const [passwordSecond, setPasswordSecond] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const[datalength,setdatalength]=useState(0);

  const supabaseUrl = 'https://fguewcoipjtuyqdrcbyn.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZndWV3Y29pcGp0dXlxZHJjYnluIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc2MzI3NTMsImV4cCI6MjAxMzIwODc1M30.nFtZKKkIdw5OnJ7WKg0Zgfg0qDZCwUBfoAMKApZTdEA';

  const supabase = createClient(supabaseUrl, SUPABASE_KEY);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data, error } = await supabase
      .from('Logins')
      .select('Login_Id, UserName, Password, User_likes');

    if (error) {
      setError(error.message);
    } else {
      setData(data);
      setdatalength(data.length)
    }
  }

  async function handleCreateAccount() {
    if (!username || !passwordFirst || !passwordSecond) {
      window.alert("Please fill in all fields.");
      return;
    }

    if (passwordFirst !== passwordSecond) {
      window.alert("Passwords do not match.");
      return;
    }

    const usernameExists = data.some((entry) => entry.UserName === username);
    if (usernameExists) {
      window.alert("Username already in use.");
      return;
    }

    // At this point, the data is valid, and you can create the account or perform other actions.
    try {
      const { data, error } = await supabase
        .from('Logins')
        .insert([{ Login_Id: (datalength+1),UserName: username, Password: passwordFirst, User_likes: '' }])  // Corrected


      if (error) {
        window.alert("Error creating the account.");
      } else {
        window.alert("Account created");
        window.location.href = `/`
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  return (<div>
    <h1 className="intro"><img className="logo_l"type="png" src="./favicon_package_v0.16/android-chrome-512x512.png"></img> Listen Along With US <img className="logo       "type="png" src="./favicon_package_v0.16/android-chrome-512x512.png"></img></h1>
    
    <div className="body" id="newdetails">
      <h3 className="qur" id="newUsername">
        Login: <input className="inputs" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </h3>
      <h3 className="qur" id="newPassword">
        Password: <input className="inputs" type="password" value={passwordFirst} onChange={(e) => setPasswordFirst(e.target.value)} />
      </h3>
      <h3 className="qur" id="rePassword">
        Password: <input className="inputs" type="password" value={passwordSecond} onChange={(e) => setPasswordSecond(e.target.value)} />
      </h3>
      <div className="btnholder">
        <button className="btn" onClick={handleCreateAccount}>Create New Account</button>
        <button className="btn" onClick={()=>window.location.href="/"}>Cancel</button>
      </div>
    </div>
    </div>  
  );
}
