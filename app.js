import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const checkWorkingHours = (req, res, next) => {
  const now = new Date();
  const day = now.getDay(); // 0 - Sunday, 1 - Monday, ..., 6 - Saturday
  const hour = now.getHours();

  // Check if it's Monday to Friday and between 9:00 AM and 5:00 PM
  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res
      .status(403)
      .send(
        "Sorry, our website is only available during working hours (Monday to Friday, 9:00 AM - 5:00 PM)."
      );
  }
};

app.use(checkWorkingHours);

// Serve static CSS files
app.use(express.static(path.join(__dirname, "public")));

//  routes for the pages
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/services", (req, res) => {
  res.render("services");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
