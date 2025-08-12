import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import UserService from "../services/UserService";
import { useNavigate } from "react-router-dom";

function UserCreate() {
  const { token } = useContext(AuthContext);
  const userService = new UserService(token);
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", name: "", type: "", password: "" });
  const [errors, setErrors] = useState({});

  function validate() {
    const newErrors = {};

    if (!form.email) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email inválido";
    }

    if (!form.name) {
      newErrors.name = "Nome é obrigatório";
    } else if (form.name.length < 3) {
      newErrors.name = "Nome deve ter pelo menos 3 caracteres";
    }

    if (!form.type) {
      newErrors.type = "Tipo é obrigatório";
    } else if (!["admin", "user"].includes(form.type)) {
      newErrors.type = "Tipo deve ser 'admin' ou 'user'";
    }

    if (!form.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (form.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) return;

    try {
      await userService.create(form);
      navigate("/users");
    } catch (err) {
      setErrors({ form: err.response?.data?.error || "Erro ao criar usuário" });
    }
  }

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "40px auto",
        padding: "30px 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#fff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        borderRadius: 8,
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 24, color: "#333" }}>
        Adicionar Usuário
      </h2>

      {errors.form && (
        <p
          style={{
            color: "white",
            backgroundColor: "#e74c3c",
            padding: "12px",
            borderRadius: 6,
            marginBottom: 20,
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          {errors.form}
        </p>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <label style={{ display: "block", marginBottom: 6, fontWeight: "600" }}>
          Email:
        </label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
          placeholder="Digite o email"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: errors.email ? 6 : 20,
            borderRadius: 6,
            border: errors.email ? "1px solid #e74c3c" : "1px solid #ccc",
            fontSize: "1rem",
            boxSizing: "border-box",
          }}
        />
        {errors.email && <p style={{ color: "#e74c3c", marginTop: 0, marginBottom: 20 }}>{errors.email}</p>}

        <label style={{ display: "block", marginBottom: 6, fontWeight: "600" }}>
          Nome:
        </label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Digite o nome"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: errors.name ? 6 : 20,
            borderRadius: 6,
            border: errors.name ? "1px solid #e74c3c" : "1px solid #ccc",
            fontSize: "1rem",
            boxSizing: "border-box",
          }}
        />
        {errors.name && <p style={{ color: "#e74c3c", marginTop: 0, marginBottom: 20 }}>{errors.name}</p>}

        <label style={{ display: "block", marginBottom: 6, fontWeight: "600" }}>
          Tipo:
        </label>
        <input
          name="type"
          value={form.type}
          onChange={handleChange}
          placeholder="Digite o tipo (ex: admin)"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: errors.type ? 6 : 20,
            borderRadius: 6,
            border: errors.type ? "1px solid #e74c3c" : "1px solid #ccc",
            fontSize: "1rem",
            boxSizing: "border-box",
          }}
        />
        {errors.type && <p style={{ color: "#e74c3c", marginTop: 0, marginBottom: 20 }}>{errors.type}</p>}

        <label style={{ display: "block", marginBottom: 6, fontWeight: "600" }}>
          Senha:
        </label>
        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          type="password"
          placeholder="Digite a senha"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: errors.password ? 6 : 30,
            borderRadius: 6,
            border: errors.password ? "1px solid #e74c3c" : "1px solid #ccc",
            fontSize: "1rem",
            boxSizing: "border-box",
          }}
        />
        {errors.password && <p style={{ color: "#e74c3c", marginTop: 0, marginBottom: 30 }}>{errors.password}</p>}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#28a745",
            border: "none",
            borderRadius: 8,
            color: "white",
            fontWeight: "700",
            fontSize: "1.1rem",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#218838")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#28a745")}
        >
          Salvar
        </button>

        <button
          type="button"
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "12px",
            backgroundColor: "#ce1111ff",
            border: "none",
            borderRadius: 8,
            color: "white",
            fontWeight: "700",
            fontSize: "1.1rem",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onClick={() => navigate("/users")}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#b31010")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#ce1111ff")}
        >
          Voltar
        </button>
      </form>
    </div>
  );
}

export default UserCreate;
