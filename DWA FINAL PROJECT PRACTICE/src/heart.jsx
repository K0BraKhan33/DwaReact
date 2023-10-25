  //heart.jsx
  //import { loginName, loginPassword } from "./login";

  import { createClient } from '@supabase/supabase-js';
  import { usernames, passwords } from './advance';
  
  // Declare module-level variables

  
  


  const supabaseUrl = 'https://fguewcoipjtuyqdrcbyn.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZndWV3Y29pcGp0dXlxZHJjYnluIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc2MzI3NTMsImV4cCI6MjAxMzIwODc1M30.nFtZKKkIdw5OnJ7WKg0Zgfg0qDZCwUBfoAMKApZTdEA';

  const supabase = createClient(supabaseUrl, supabaseKey);

  export async function toggleclass(buttonId) { // Add 'async' here
    const button = document.getElementById(buttonId);
    console.log(buttonId)

    if (button) {
      console.log(usernames, passwords);
      // Check if the button with the specified ID exists
      if (button.classList.contains("heart")) {
        button.classList.remove("heart");
        button.classList.add("heart_like");
      

     
        // console.log(loginName, loginPassword)

        // const { data, error } = await supabase
        //   .from('Logins')
        //   .update({ User_likes: buttonId })
        //   .eq('UserName', loginName)
        //   .eq('Password', loginPassword);
        
        // Rest of your code...
      } else if (button.classList.contains("heart_like")) {
        button.classList.remove("heart_like");
        button.classList.add("heart");



        // Find the parent <div> and add the "hideable" class
    
      } else if (button.classList.contains("heart_like")) {
        button.classList.remove("heart_like");
        button.classList.add("heart");

        // Find the parent <div> and remove the "hideable" class
    
      }
    }
  }
