document.addEventListener("DOMContentLoaded", function () {
  // Extract recipeId from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get("recipeId");

  // Make API call to get recipe details
  fetch(`/recipe/getOne?recipeId=${recipeId}`)
    .then((response) => response.json())
    .then((recipe) => {
      // Display recipe details on the page
      displayRecipeDetails(recipe);
    })
    .catch((error) => console.error(error));
});

function displayRecipeDetails(recipe) {
  // Populate form elements with recipe details
  document.getElementById("name").value = recipe.name;

  // Populate ingredients with dynamic fields
  const ingredientsContainer = document.getElementById("ingredients");
  recipe.ingredients.forEach((ingredient, index) => {
    const ingredientDiv = document.createElement("div");

    const nameLabel = document.createElement("label");
    nameLabel.textContent = `Ingredient ${index + 1}: `;
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    const ingredientArray = ingredient.split("##$$");
    const ingredientName = ingredientArray[0];
    nameInput.value = ingredientName;
    ingredientDiv.appendChild(nameLabel);
    nameInput.classList.add("ingredient-name-input"); // Add class

    ingredientDiv.appendChild(nameInput);

    const quantityLabel = document.createElement("label");
    quantityLabel.textContent = " Quantity (grams): ";
    const quantityInput = document.createElement("input");
    quantityInput.type = "text";
    quantityInput.value = ingredientArray[1];
    quantityInput.classList.add("ingredient-quantity-input"); // Add class

    ingredientDiv.appendChild(quantityLabel);
    ingredientDiv.appendChild(quantityInput);

    ingredientsContainer.appendChild(ingredientDiv);
  });

  document.getElementById("instructions").value = recipe.instructions;
  document.getElementById("category").value = recipe.category;
}

function saveChanges() {
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get("recipeId");
  // Collect updated data from the form
  const updatedName = document.getElementById("name").value;
  const updatedInstructions = document.getElementById("instructions").value;
  const updatedCategory = document.getElementById("category").value;
  const updatedIngredients = [];

  const ingredientsDivs = document.querySelectorAll("#ingredients div");

  ingredientsDivs.forEach((div) => {
    const nameInput = div.querySelector(".ingredient-name-input");
    const quantityInput = div.querySelector(".ingredient-quantity-input");

    // Check if the inputs are found before accessing their values
    if (nameInput && quantityInput) {
      const name = nameInput.value;
      const quantity = quantityInput.value;
      updatedIngredients.push(`${name}##$$${quantity}`);
    }
  });

  const ingredientsJSON = JSON.stringify(updatedIngredients);
  console.log(ingredientsJSON);

  // Make API call to edit recipe
  fetch(
    `/recipe/edit?recipeId=${recipeId}&name=${updatedName}&instructions=${updatedInstructions}&category=${updatedCategory}&ingredients=${encodeURIComponent(
      updatedIngredients
    )}`,
    {
      method: "PUT", // Adjust the method based on your API requirements
    }
  )
    .then((response) => response.json())
    .then((updatedRecipe) => {
      // Handle the response, you may redirect the user or show a success message
      console.log("Recipe updated:", updatedRecipe);
      window.location.href = "../your_recipes";
    })
    .catch((error) => console.error(error));
}
