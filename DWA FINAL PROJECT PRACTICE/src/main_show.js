// export async function fetchPodcastData() {
//   try {
//     const response = await fetch("https://podcast-api.netlify.app/");
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching podcast data:", error);
//     return null;
//   }
// }




//   return fetch('https://podcast-api.netlify.app') // Replace with your API endpoint
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`Network response was not ok (status ${response.status})`);
//       }
//       return response.json();
//     })
//     .catch((error) => {
//       // Handle errors by logging them to the console
//       console.error('Error:', error);
//     });
// }

// // Call the fetchPodcastData function to initiate the fetch
// fetchPodcastData()
//   .then((data) => {
//     // Now you can access and work with the fetched data here
//     const datas=data[1].id
//     return datas;
//   })
//   .catch((error) => {
//     // Handle any errors that occurred during the fetch
//     console.error('Error:', error);
//   });
  
//   console.log(fetchPodcastData().data)


