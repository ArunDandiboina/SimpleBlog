import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
import path from "path";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

let posts = [
  { title: "First Blog Post", content: "This is the first blog post." },
  { title: "Second Blog Post", content: "This is the second blog post." },
  { title: "Third Blog Post", content: "This is the third blog post." },
];

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { posts });
});

app.get("/post/:id", (req, res) => {
  const id = req.params.id;
  res.render("post", { post: posts[id], id });
});

app.get("/new", (req, res) => {
  res.render("new");
});

app.post("/create", (req, res) => {
  const { title, content } = req.body;
  posts.push({ title, content });
  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  res.render("edit", { post: posts[id], id });
});

app.post("/update/:id", (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  posts[id] = { title, content };
  res.redirect("/post/" + id);
});

app.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  posts.splice(id, 1);
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Blog app running on http://localhost:3000");
});
