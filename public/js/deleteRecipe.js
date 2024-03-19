// deleteRecipe.js

const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get("recipeId");

function deleteRecipe(recipeId) {
  // Make an API call to delete the recipe
  fetch(`/recipe/delete?recipeId=${recipeId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((deletedRecipe) => {
      // Redirect to the recipe list page or any desired location
      window.location.href = "/your_recipes"; // Update with the correct URL
    })
    .catch((error) => console.error(error));
}

deleteRecipe(recipeId);
