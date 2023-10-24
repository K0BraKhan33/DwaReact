import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://fguewcoipjtuyqdrcbyn.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZndWV3Y29pcGp0dXlxZHJjYnluIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc2MzI3NTMsImV4cCI6MjAxMzIwODc1M30.nFtZKKkIdw5OnJ7WKg0Zgfg0qDZCwUBfoAMKApZTdEA'; // Replace with your Supabase key

const supabase = createClient(supabaseUrl, SUPABASE_KEY);
async function fetchData() {
    const { data, error } = await supabase
        .from('Logins')
        .select('Login_Id, UserName, Password, User_likes');

    if (error) {
        console.error('Error fetching data:', error);

  
        
    }
    return data
}

    fetchData();
 // Call fetchData only once when the component mounts

function advance(username, password) {
    const data=fetchData().data
    if (data) {
        const found1 = data.find((innerData) => innerData.UserName === username && innerData.Password === password);

        if (found1) {
            console.log('Logged in');
            
            console.log(loginName, loginPassword)
            
                window.location.href="/mains";
                return [loginName,loginPassword]
        } else {
            console.log('Logged out');
            return [null, null];
        }
    } else {
        console.log('Data not available');
    }
  
}   
export default advance;