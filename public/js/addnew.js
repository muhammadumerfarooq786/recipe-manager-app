// addnew.js
const userId = document.getElementById("userIdContainer").innerText.trim();

function addIngredient() {
  const ingredientsContainer = document.getElementById("ingredientsContainer");
  const newIngredientRow = document.createElement("div");
  newIngredientRow.className = "ingredient-row";
  newIngredientRow.innerHTML = `
        <input type="text" class="ingredient-name" placeholder="Ingredient Name" required />
        <input type="text" class="ingredient-quantity" placeholder="Quantity (grams)" required />
    `;
  ingredientsContainer.appendChild(newIngredientRow);
}

function submitRecipe() {
  const name = document.getElementById("name").value.trim();
  const instructions = document.getElementById("instructions").value.trim();
  const category = document.getElementById("category").value.trim();

  const ingredients = [];
  const ingredientRows = document.querySelectorAll(".ingredient-row");
  ingredientRows.forEach((row) => {
    const ingredientName = row.querySelector(".ingredient-name").value.trim();
    const ingredientQuantity = row
      .querySelector(".ingredient-quantity")
      .value.trim();
    if (ingredientName && ingredientQuantity) {
      ingredients.push(`${ingredientName}##$$${ingredientQuantity}`);
    }
  });

  if (!name || !instructions || !category || ingredients.length === 0) {
    alert("Please fill in all fields and add at least one ingredient.");
    return;
  }

  const recipeData = {
    name,
    instructions,
    category,
    ingredients,
    user_id: userId,
  };

  // Make API call to submit the recipe (replace with actual endpoint)
  fetch("/recipe/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipeData),
  })
    .then((response) => {
      if (response.ok) {
        alert("Recipe added successfully!");
        // Redirect to your desired page after successful submission
        window.location.href = "/your_recipes";
      } else {
        throw new Error("Recipe submission failed. Please try again.");
      }
    })
    .catch((error) => alert(error));
}
