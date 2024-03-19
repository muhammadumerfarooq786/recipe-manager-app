// Access user ID from the hidden div
const userId = document.getElementById("userIdContainer").innerText.trim();

function init() {
  // Sample function to simulate navigation to the add new recipe page
  function goToAddNewRecipe() {
    alert("Navigate to the Add New Recipe page");
    // You can replace the alert with actual navigation logic
  }

  // Sample function to simulate fetching user recipes and populating the table
  function fetchUserRecipes() {
    // Make an API call to fetch user recipes (replace with actual endpoint)
    fetch(`/recipe/getUserRecipe?userId=${userId}`)
      .then((response) => response.json())
      .then((recipes) => {
        const recipeTableBody = document.getElementById("recipeTableBody");
        recipeTableBody.innerHTML = ""; // Clear existing rows

        // Loop through recipes and add rows to the table
        recipes.forEach((recipe) => {
          const ingredientsHTML = recipe.ingredients
            .map((ingredient) => {
              const [name, quantity] = ingredient.split("##$$");
              return `${name}: ${quantity}g`;
            })
            .join(", ");
          const row = document.createElement("tr");
          row.innerHTML = `
                          <td>${recipe.name}</td>
                         <td>${ingredientsHTML}</td>
                          <td>${recipe.instructions}</td>
                          <td>${recipe.category}</td>
                          <td>${recipe.updated_at}</td>
                          <td>
                              <a href="/edit-recipe?recipeId=${recipe._id}">Edit | </a>
                              <a href="/delete-recipe?recipeId=${recipe._id}">Delete</a>
                          </td>
                      `;
          recipeTableBody.appendChild(row);
        });
      })
      .catch((error) => console.error(error));
  }

  // Sample function to simulate deleting a recipe
  function deleteRecipe(recipeId) {
    alert(`Delete recipe with ID: ${recipeId}`);
    // You can replace the alert with actual delete logic
  }

  // Fetch user recipes when the page loads
  fetchUserRecipes();
}

// Call the init function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", init);
