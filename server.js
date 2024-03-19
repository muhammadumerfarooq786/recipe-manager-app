import express from "express";
import dotenv from "dotenv";
import Connect_DB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import session from "express-session";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();
Connect_DB();

const app = express();
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(
  session({
    secret: "recipe",
    resave: false,
    saveUninitialized: true,
  })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "views"));

app.get("/", async (req, res) => {
  try {
    const userSession = req.session.user;
    res.render("homepage", { userSession });
  } catch (error) {
    console.error("Error fetching user session data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/your_recipes", async (req, res) => {
  try {
    const userSession = req.session.user;
    res.render("yourRecipes", { userSession });
  } catch (error) {
    console.error("Error fetching user session data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/edit-recipe", async (req, res) => {
  try {
    const userSession = req.session.user;
    res.render("editRecipes", { userSession });
  } catch (error) {
    console.error("Error fetching user session data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/delete-recipe", async (req, res) => {
  try {
    const userSession = req.session.user;
    res.render("deleteRecipe", { userSession });
  } catch (error) {
    console.error("Error fetching user session data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/login", async (req, res) => {
  try {
    const userSession = req.session.user;
    res.render("login", { userSession });
  } catch (error) {
    console.error("Error fetching user session data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/logout", (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.status(500).json({ error: "Error destroying session" });
    } else {
      // Redirect to the main index page
      res.redirect("/");
    }
  });
});

app.get("/signup", async (req, res) => {
  try {
    const userSession = req.session.user;
    res.render("signup", { userSession });
  } catch (error) {
    console.error("Error fetching user session data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/user/create-session", (req, res) => {
  req.session.user = req.body;
  res.sendStatus(200);
});

app.get("/add_new", async (req, res) => {
  try {
    const userSession = req.session.user;
    res.render("addnew", { userSession });
  } catch (error) {
    console.error("Error fetching user session data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.use("/user", userRoutes);
app.use("/recipe", recipeRoutes);

app.get("/", (req, res) => {
  console.log("App is running");
  res.send(`API is running`);
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
