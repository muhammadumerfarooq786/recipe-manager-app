import express from "express";
import {
  addRecipe,
  deleteRecipe,
  editRecipe,
  getAllRecipes,
  searchRecipes,
  searchRecipesByCategory,
  getRecipeById,
  getRecipesByUserId,
} from "../controller/recipeController.js";

// DEFINE THE ROUTER
const router = express.Router();

router.route("/add").post(addRecipe);
router.route("/delete").delete(deleteRecipe);
router.route("/edit").put(editRecipe);
router.route("/getAll").get(getAllRecipes);
router.route("/getOne").get(getRecipeById);
router.route("/search").get(searchRecipes);
router.route("/getUserRecipe").get(getRecipesByUserId);
router.route("/searchByCategory").get(searchRecipesByCategory);

export default router;
