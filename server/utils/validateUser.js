function validateUserData(data, mode = "create") {
  if (mode === "create") {
    if (!data.email || typeof data.email !== "string" || !data.email.includes("@")) {
      return "Email inválido ou não informado.";
    }
    if (!data.name || typeof data.name !== "string" || data.name.length < 3) {
      return "Nome deve ter pelo menos 3 caracteres.";
    }
    if (!data.type || (data.type !== "admin" && data.type !== "user")) {
      return "Tipo deve ser 'admin' ou 'user'.";
    }
    if (!data.password || typeof data.password !== "string" || data.password.length < 6) {
      return "Senha deve ter pelo menos 6 caracteres.";
    }
  } else if (mode === "update") {

    if ("email" in data) {
      if (typeof data.email !== "string" || !data.email.includes("@")) {
        return "Email inválido.";
      }
    }
    if ("name" in data) {
      if (typeof data.name !== "string" || data.name.length < 3) {
        return "Nome deve ter pelo menos 3 caracteres.";
      }
    }
    if ("type" in data) {
      if (data.type !== "admin" && data.type !== "user") {
        return "Tipo deve ser 'admin' ou 'user'.";
      }
    }
    if ("password" in data) {
      if (typeof data.password !== "string" || data.password.length < 6) {
        return "Senha deve ter pelo menos 6 caracteres.";
      }
    }
  }
  return null;
}

module.exports = validateUserData;
