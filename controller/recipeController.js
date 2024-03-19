import Recipe from "../models/recipeModel.js";
import asyncHandler from "express-async-handler";

// Controller for adding a new recipe
export const addRecipe = asyncHandler(async (req, res) => {
  const { name, ingredients, instructions, category, user_id } = req.body;

  // Create a new recipe
  const recipe = await Recipe.create({
    name,
    ingredients,
    instructions,
    category,
    user_id,
  });

  if (recipe) {
    res.status(201).json({
      _id: recipe._id,
      name: recipe.name,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      category: recipe.category,
      user_id: recipe.user_id,
      created_at: recipe.created_at,
      updated_at: recipe.updated_at,
    });
  } else {
    res.status(400);
    throw new Error("Invalid recipe data");
  }
});

// Controller for editing a recipe
export const editRecipe = asyncHandler(async (req, res) => {
  console.log(req.query);
  // const recipeId = req.params.id;
  const { recipeId, name, ingredients, instructions, category } = req.query;

  // Find the recipe by ID and update its fields
  const recipe = await Recipe.findByIdAndUpdate(
    recipeId,
    { name, ingredients, instructions, category, updated_at: Date.now() },
    { new: true }
  );

  if (recipe) {
    res.json({
      _id: recipe._id,
      name: recipe.name,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      category: recipe.category,
      user_id: recipe.user_id,
      created_at: recipe.created_at,
      updated_at: recipe.updated_at,
    });
  } else {
    res.status(404);
    throw new Error("Recipe not found");
  }
});

// Controller for deleting a recipe
export const deleteRecipe = asyncHandler(async (req, res) => {
  const { recipeId } = req.query;

  // Find the recipe by ID and remove it
  const recipe = await Recipe.findByIdAndRemove(recipeId);

  if (recipe) {
    res.json({
      _id: recipe._id,
      name: recipe.name,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      category: recipe.category,
      user_id: recipe.user_id,
      created_at: recipe.created_at,
      updated_at: recipe.updated_at,
    });
  } else {
    res.status(404);
    throw new Error("Recipe not found");
  }
});

// Controller for viewing a specific recipe by ID
export const getRecipeById = asyncHandler(async (req, res) => {
  const { recipeId } = req.query;

  // Find the recipe by ID
  const recipe = await Recipe.findById(recipeId);

  if (recipe) {
    res.json({
      _id: recipe._id,
      name: recipe.name,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      category: recipe.category,
      user_id: recipe.user_id,
      created_at: recipe.created_at,
      updated_at: recipe.updated_at,
    });
  } else {
    res.status(404);
    throw new Error("Recipe not found");
  }
});

// Controller for fetching all recipes of a specific user
export const getRecipesByUserId = asyncHandler(async (req, res) => {
  const { userId } = req.query;

  // Find all recipes belonging to the specified user ID
  const recipes = await Recipe.find({ user_id: userId });

  res.json(recipes);
});

// Controller for viewing all recipes
export const getAllRecipes = asyncHandler(async (req, res) => {
  // Find all recipes
  const recipes = await Recipe.find();

  res.json(recipes);
});

// Controller for searching recipes by name or ingredients
export const searchRecipes = asyncHandler(async (req, res) => {
  const { query } = req.query;

  // Find recipes that match the query in name or ingredients
  const recipes = await Recipe.find({
    $or: [
      { name: { $regex: query, $options: "i" } }, // Case-insensitive search for name
      { ingredients: { $regex: query, $options: "i" } }, // Case-insensitive search for ingredients
    ],
  });

  res.json(recipes);
});

// Controller for searching recipes by category
export const searchRecipesByCategory = asyncHandler(async (req, res) => {
  const { category } = req.query;

  // Find recipes that match the specified category
  const recipes = await Recipe.find({
    category: { $regex: category, $options: "i" },
  });

  res.json(recipes);
});
