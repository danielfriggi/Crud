const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { readUsers, writeUsers } = require("./users");
const { authMiddleware, SECRET } = require("./auth");
const validateUserMiddleware = require("../middleware/validateUserMiddleware");

const routes = Router();

routes.use(require("express").json());

// Login
routes.post("/auth/login", (req, res) => {
  const users = readUsers();
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ error: "Usuário não encontrado" });

  if (user.password !== password) return res.status(400).json({ error: "Senha incorreta" });

  const token = jwt.sign({ id: user.id, email: user.email, type: user.type }, SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// Criar usuário
routes.post("/users", authMiddleware, validateUserMiddleware("create"), (req, res) => {
  const { email, name, type, password } = req.body;
  const users = readUsers();

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: "E-mail já cadastrado" });
  }

  const id = users.length ? users[users.length - 1].id + 1 : 1;
  users.push({ id, email, name, type, password });
  writeUsers(users);

  res.status(201).json({ message: "Usuário criado" });
});

// Listar usuários
routes.get("/users", authMiddleware, (req, res) => {
  const users = readUsers();
  res.json(users);
});

// Editar usuário
routes.put("/users/:id", authMiddleware, validateUserMiddleware("update"), (req, res) => {
  const id = parseInt(req.params.id);
  const users = readUsers();

  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

  Object.assign(user, req.body);

  writeUsers(users);
  res.json({ message: "Usuário atualizado" });
});

// Excluir usuário
routes.delete("/users/:id", authMiddleware, (req, res) => {
  const id = parseInt(req.params.id);
  const users = readUsers();

  const index = users.findIndex(u => u.id === id);
  if (index === -1) return res.status(404).json({ error: "Usuário não encontrado" });

  users.splice(index, 1);

  writeUsers(users);
  res.json({ message: "Usuário excluído" });
});

module.exports = routes;
