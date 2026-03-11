import express, { json } from "express";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 8080;

app.use(json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).send("This is your home page.");
});

app.get("/login", (req, res) => {
  const name = req.query.name || "Guest";
  res.cookie("name", name, { maxAge: 900000, httpOnly: true });
  res.send(`You are now logged in.`);
});

app.get("/hello", (req, res) => {
  const user = req.cookies.name;

  if (user) {
    res.send(`Welcome ${user}!`);
  } else {
    res.send("You are not logged in.");
  }
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`),
);
