import mongoose from "mongoose";
import userModel from "./userModel.js";

const recipeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: userModel,
      required: true,
    },
    created_at: {
      type: Date,
      immutable: true,
      default: () => Date.now(),
    },
    updated_at: {
      type: Date,
      default: () => Date.now(),
    },
  },
  { timestamps: true }
);

recipeSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

const recipeModel = mongoose.model("Recipe", recipeSchema);

export default recipeModel;
