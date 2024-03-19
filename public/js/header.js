document.addEventListener("DOMContentLoaded", function () {
  const burgerMenu = document.querySelector(".burger-menu");
  const navList = document.querySelector(".nav-list");

  burgerMenu.addEventListener("click", function () {
    // Toggle the visibility of the menu
    navList.style.display = navList.style.display === "flex" ? "none" : "flex";
  });

  // Close the menu when clicking outside of it
  document.addEventListener("click", function (event) {
    if (!navList.contains(event.target) && event.target !== burgerMenu) {
      navList.style.display = "none";
    }
  });

  // Ensure that the menu is hidden when the screen is enlarged
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      navList.style.display = "flex"; // Change to 'flex' to make the menu visible
    } else {
      navList.style.display = "none";
    }
  });
});
