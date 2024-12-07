const express = require("express");
const dotenv = require("dotenv");


// Load environment variables
dotenv.config();

const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Start the server
app.listen(PORT, () => {
  console.log("Server started on port " + PORT + "...");
});

// Route for rendering various pages
app.get("/", (req, res) => res.render("home"));
app.get("/logIn", (req, res) => res.render("login"));
app.get("/signUp", (req, res) => res.render("signup"));


// Error Handler for 404 Not Found
app.use((req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

// Error Handler for other errors
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});