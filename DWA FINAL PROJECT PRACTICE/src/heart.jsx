export function toggleclass(buttonId) {
  var button = document.getElementById(buttonId);

  if (button) {
    // Check if the button with the specified ID exists
    if (button.classList.contains("heart")) {
      button.classList.remove("heart");
      button.classList.add("heart_like");

      // Find the parent <div> and add the "hideable" class
  
    } else if (button.classList.contains("heart_like")) {
      button.classList.remove("heart_like");
      button.classList.add("heart");

      // Find the parent <div> and remove the "hideable" class
  
    }
  }
}
