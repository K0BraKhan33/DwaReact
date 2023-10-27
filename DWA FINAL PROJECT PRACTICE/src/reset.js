import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fguewcoipjtuyqdrcbyn.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZndWV3Y29pcGp0dXlxZHJjYnluIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc2MzI3NTMsImV4cCI6MjAxMzIwODc1M30.nFtZKKkIdw5OnJ7WKg0Zgfg0qDZCwUBfoAMKApZTdEA';

const supabase = createClient(supabaseUrl, SUPABASE_KEY);
 async function fetchData() {
    const { data, error } = await supabase
        .from('Logins')
        .select('Login_Id, UserName, Password, User_likes');

    if (error) {
        console.error('Error fetching data:', error);
    }

    return data;
}

export async function resetUserLikes(username, password) {
    const confone = window.confirm('Doing this will reset all likes to none');
    if (confone === true) {
      const conftwo = window.confirm('FINAL CHANCE BEFORE ALL LIKES GONE');
      if (conftwo === true) {
        const { data, error } = await supabase
        .from('Logins')
        .update({User_likes:''})
        .eq('UserName', username)  // Use 'UserName' instead of 'Username'
        .eq('Password', password);

        location.reload();
  
        if (error) {
          console.error('Error updating data:', error);
          // Assign the error object to updateError
          const updateError = error;
        }
      }
    }
  }
  


// Call the resetUserLikes function to reset the 'User_likes' column

