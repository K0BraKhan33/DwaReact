function SortLikes() {
  const sortingLikes = () => {
    // Get the heart_like elements
    const elementHeart = document.querySelectorAll(".heart_like");
    var ulgridElements = document.querySelectorAll(".ulgrid");
    ulgridElements.forEach((element) => {
      element.classList.add("likesMode");
    });

    // Extract and store the IDs in an array, removing the "like" prefix
    const ids = Array.from(elementHeart).map((element) =>
      element.id.replace("like", "")
    );

    // Log the IDs to the console
    console.log("Heart Like IDs:", ids);

    // Compare IDs of orderedList to heart_like and add/remove the "hidable" class
    const elementList = document.querySelectorAll(".mainorder");
    elementList.forEach((sList) => {
      const elementId = sList.getAttribute("id");
      if (!ids.includes(elementId)) {
        sList.classList.add("hideable");
      } else {
        sList.classList.remove("hideable");
        sList.classList.add("likesMode"); // Add the "likesMode" class to the specific element
      }
    });
  };
  sortingLikes()

  // You can add a button or trigger event to call sortingLikes when needed
}

export default SortLikes;
