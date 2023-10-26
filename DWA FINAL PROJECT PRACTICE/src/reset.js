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

async function resetUserLikes() {
    const data = await fetchData();

    for (const record of data) {
        const { Login_Id } = record;

        const { data: updatedData, error: updateError } = await supabase
            .from('Logins')
            .update({ User_likes: "" })
            .eq('Login_Id', Login_Id);

        if (updateError) {
            console.error('Error updating data:', updateError);
        }
    }
}

// Call the resetUserLikes function to reset the 'User_likes' column
resetUserLikes();
