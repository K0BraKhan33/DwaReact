      //advance.js
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
              return data

          }


          // Call fetchData only once when the component mounts

          let loginDetailsDiv = ' '
          let usernames = ' '
          let passwords = ' '
      


          // Define an 'advance' function to check user credentials
          async function advance(username, password) {
              const initialData = fetchData();
              const data = await initialData;
              console.log(fetchData());
              if (data) {
                  const found1 = data.find((innerData) => innerData.UserName === username && innerData.Password === password);

                  if (found1) {
                      console.log('Logged in');
                      loginDetailsDiv = document.getElementById("loginDetails");
                      usernames = loginDetailsDiv.getAttribute("data-usernames");
                      passwords = loginDetailsDiv.getAttribute("data-passwords");
                      
                

                      
                      
                          window.location.href="/mains";
                          const detailarray=[username, password]
                          return detailarray
                  } else {
                      console.log('Enter valid user name and password');
                      return [null, null];
                  }
              } else {
                  console.log('Data not available');
              }
          }   

        
          
              // Rest of your code that relies on these values.
          

  
          export default advance;