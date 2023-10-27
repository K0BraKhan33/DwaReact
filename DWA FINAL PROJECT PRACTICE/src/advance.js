import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fguewcoipjtuyqdrcbyn.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZndWV3Y29pcGp0dXlxZHJjYnluIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc2MzI3NTMsImV4cCI6MjAxMzIwODc1M30.nFtZKKkIdw5OnJ7WKg0Zgfg0qDZCwUBfoAMKApZTdEA'
const supabase = createClient(supabaseUrl, SUPABASE_KEY);

export async function fetchData() {
  const { data, error } = await supabase
    .from('Logins')
    .select('Login_Id, UserName, Password, User_likes');

  if (error) {
    console.error('Error fetching data:', error);
  }
  return data;
}

// Define an 'advance' function to check user credentials
async function advance(username, password) {
  const data = await fetchData();
  
  if (data) {
    const foundUser = data.find((innerData) => innerData.UserName === username && innerData.Password === password);

    if (foundUser) {
      console.log(foundUser);
      const detailarray = [username, password];
      return true;
    } else {
      console.log('Enter valid username and password');
      return false;
    }
  } else {
    console.log('Data not available');
  }
}

export default advance;
