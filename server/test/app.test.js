const request = require("supertest");
const app = require("../src/index"); 
const { readUsers, writeUsers } = require("../src/users");

// Dados de usuário padrão para teste
const adminUser = {
  id: 1,
  email: "admin@test.com",
  password: "123456",
  name: "Admin",
  type: "admin",
};

describe("API Usuários e Autenticação", () => {
  let token;
  let createdUserId;

  beforeAll(() => {
    writeUsers([adminUser]);
  });

  afterAll(() => {
    writeUsers([]);
  });

  // LOGIN
  test("Login com usuário válido deve retornar token", async () => {
    const res = await request(app).post("/auth/login").send({
      email: adminUser.email,
      password: adminUser.password,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  test("Login com usuário inválido retorna erro", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "inexistente@test.com",
      password: "123456",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/não encontrado/);
  });

  // CRIAR USUÁRIO
  test("Criar usuário com dados válidos", async () => {
    const res = await request(app)
      .post("/users")
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "user1@test.com",
        name: "User One",
        type: "user",
        password: "123456",
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toMatch(/criado/);

    const users = readUsers();
    const created = users.find(u => u.email === "user1@test.com");
    expect(created).toBeDefined();
    createdUserId = created.id;
  });

  test("Criar usuário com email duplicado deve falhar", async () => {
    const res = await request(app)
      .post("/users")
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "user1@test.com",
        name: "User One Duplicate",
        type: "user",
        password: "123456",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/E-mail já cadastrado/);
  });

  test("Criar usuário sem token deve falhar", async () => {
    const res = await request(app)
      .post("/users")
      .send({
        email: "user2@test.com",
        name: "User Two",
        type: "user",
        password: "123456",
      });
    expect(res.statusCode).toBe(401);
  });

  // LISTAR USUÁRIOS
  test("Listar usuários com token deve funcionar", async () => {
    const res = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("Listar usuários sem token deve falhar", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toBe(401);
  });

  // ATUALIZAR USUÁRIO
  test("Atualizar usuário parcialmente", async () => {
    const res = await request(app)
      .put(`/users/${createdUserId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "User One Updated" });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/atualizado/);

    const users = readUsers();
    const updated = users.find(u => u.id === createdUserId);
    expect(updated.name).toBe("User One Updated");
  });

  test("Atualizar usuário inexistente retorna 404", async () => {
    const res = await request(app)
      .put(`/users/9999`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Não existe" });

    expect(res.statusCode).toBe(404);
  });

  // DELETAR USUÁRIO
  test("Deletar usuário existente", async () => {
    const res = await request(app)
      .delete(`/users/${createdUserId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/excluído/);

    const users = readUsers();
    const deleted = users.find(u => u.id === createdUserId);
    expect(deleted).toBeUndefined();
  });

  test("Deletar usuário inexistente retorna 404", async () => {
    const res = await request(app)
      .delete(`/users/9999`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
  });
});
