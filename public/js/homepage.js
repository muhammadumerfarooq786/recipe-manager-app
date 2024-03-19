document.addEventListener("DOMContentLoaded", function () {
  // Fetch all recipes on page load
  fetchRecipes("/recipe/getAll");
  // Add event listener to the search input to prevent event propagation
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("click", function (event) {
    event.stopPropagation();
  });

  const searchButton = document.getElementById("searchButton");
  searchButton.addEventListener("click", function (event) {
    event.stopPropagation();
  });
});

function searchRecipes() {
  const searchInput = document.getElementById("searchInput");
  const searchTerm = searchInput.value.trim();

  if (searchTerm === "") {
    document.getElementById("norecipe").innerHTML =
      '<div class="empty-message">Search field is empty</div>';
    document.getElementById("recipeList").innerHTML =
      '<div class="empty-message"></div>';
  } else {
    document.getElementById("norecipe").innerHTML =
      '<div class="empty-message"></div>';
    fetchRecipes(`/recipe/search?query=${searchTerm}`);
  }
}

function fetchRecipes(endpoint) {
  fetch(endpoint)
    .then((response) => response.json())
    .then((recipes) => {
      displayRecipes(recipes);
    })
    .catch((error) => console.error("Error fetching recipes:", error));
}

function displayRecipes(recipes) {
  document.getElementById("norecipe").innerHTML =
    '<div class="empty-message"></div>';
  const recipeList = document.getElementById("recipeList");
  recipeList.innerHTML = "";

  if (recipes.length === 0) {
    document.getElementById("norecipe").innerHTML =
      '<div class="empty-message"></div>';
    recipeList.innerHTML = '<div class="empty-message">No recipes found</div>';
    return;
  }

  recipes.forEach((recipe) => {
    const ingredientsHTML = recipe.ingredients
      .map((ingredient) => {
        const [name, quantity] = ingredient.split("##$$");
        return `${name}: ${quantity}g`;
      })
      .join(", ");
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.innerHTML = `
            <h3>${recipe.name}</h3>
            <p><strong>Ingredients:</strong> <br/>${ingredientsHTML}</p>
            <p><strong>Instructions:</strong> <br/> ${recipe.instructions}</p>
            <p><strong>Category:</strong> ${recipe.category}</p>
            <p><strong>Last Updated:</strong> ${new Date(
              recipe.updated_at
            ).toLocaleString()}</p>
        `;

    // card.addEventListener("click", function () {
    //   window.location.href = `/view_recipe/${recipe._id}`;
    // });

    recipeList.appendChild(card);
  });
}
