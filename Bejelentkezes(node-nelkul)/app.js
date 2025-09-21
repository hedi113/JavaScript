import express from "express";
import cors from 'cors';

const port = 3000;
const app = express();

app.use(express.json());
app.use(cors());

let users = [];

app.get("/users", (req, res) => {
  res.status(200).json(users);
});

app.get("/users/:id", (req, res) => {
  const id = +req.params.id;
  const user = users.find((user) => user.id === id);
  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }
  res.status(200).json(user);
});

app.post("/users", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Invalid credentials!" });
  }
  const id = users[users.length - 1]?.id || 1;
  const newUser = { id, email, password };
  users.push(newUser);

  res.status(201).json(newUser);
});


app.listen(port, () => {
  console.log(`Server runs on https://localhost:${port}`);
});