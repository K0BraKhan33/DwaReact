  //heart.jsx
  //import { loginName, loginPassword } from "./login";

  import { createClient } from '@supabase/supabase-js';
  
  // Declare module-level variables

  
  


  const supabaseUrl = 'https://fguewcoipjtuyqdrcbyn.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZndWV3Y29pcGp0dXlxZHJjYnluIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc2MzI3NTMsImV4cCI6MjAxMzIwODc1M30.nFtZKKkIdw5OnJ7WKg0Zgfg0qDZCwUBfoAMKApZTdEA';

  const supabase = createClient(supabaseUrl, supabaseKey);

  export async function toggleclass(buttonId, username, password) {
    const { data, error } = await supabase
      .from('Logins')
      .select('User_likes')
      .eq('UserName', username)
      .eq('Password', password);
  
    if (error) {
      console.error(error);
      return;
    }
  
    const existingUserLikes = data[0].User_likes;
    const button = document.getElementById(buttonId);
  
    if (button) {
      if (button.classList.contains("heart")) {
        button.classList.remove("heart");
        button.classList.add("heart_like");
        // Add 'buttonId' to the existing likes
        const updatedUserLikes = existingUserLikes ? `${existingUserLikes},${buttonId}` : buttonId;
  
        // Update the 'User_likes' field in the database
        const { updateData, updateError } = await supabase
          .from('Logins')
          .update({ User_likes: updatedUserLikes })
          .eq('UserName', username)
          .eq('Password', password);
  
        if (updateError) {
          button.classList.remove("heart_like");
          button.classList.add("heart");
          console.error(updateError);
        } 
       
      } else if (button.classList.contains("heart_like")) {
        // Remove 'buttonId' from the existing likes
        const updatedUserLikes = existingUserLikes.split(',').filter(like => like !== buttonId).join(',');
  
        // Update the 'User_likes' field in the database
        const { updateData, updateError } = await supabase
          .from('Logins')
          .update({ User_likes: updatedUserLikes })
          .eq('UserName', username)
          .eq('Password', password);
  
        if (updateError) {
          console.error(updateError);
        } else {
          // Update the button's class
          button.classList.remove("heart_like");
          button.classList.add("heart");
        }
      }
    }
  }
    