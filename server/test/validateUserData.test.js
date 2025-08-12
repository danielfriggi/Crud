const validateUserData = require('../utils/validateUser');

describe("Validação de usuário", () => {
  test("Deve validar dados corretos para criação", () => {
    const data = {
      email: "teste@example.com",
      name: "Daniel",
      type: "admin",
      password: "123456"
    };
    expect(validateUserData(data, "create")).toBeNull();
  });

  test("Deve retornar erro para email inválido", () => {
    const data = {
      email: "testeexample.com",
      name: "Daniel",
      type: "admin",
      password: "123456"
    };
    expect(validateUserData(data, "create")).toBe("Email inválido ou não informado.");
  });

  test("Deve validar atualização parcial válida", () => {
    const data = {
      email: "novoemail@example.com"
    };
    expect(validateUserData(data, "update")).toBeNull();
  });

  test("Deve retornar erro para atualização com email inválido", () => {
    const data = {
      email: "emailerrado"
    };
    expect(validateUserData(data, "update")).toBe("Email inválido.");
  });
});
