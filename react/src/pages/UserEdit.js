import React, { useState, useContext } from "react";
import UserService from "../services/UserService";
import AuthContext from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

function EditUser() {
  const { userId } = useParams();
  const { token } = useContext(AuthContext);
  const userService = new UserService(token);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    type: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState(null);

  function validate() {
    const newErrors = {};

    if (form.name && form.name.length < 3) {
      newErrors.name = "Nome deve ter pelo menos 3 caracteres";
    }

    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email inválido";
    }

    if (form.type && !["admin", "user"].includes(form.type.toLowerCase())) {
      newErrors.type = "Tipo deve ser 'admin' ou 'user'";
    }

    if (form.password && form.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
    setFormError(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Filtra campos preenchidos
    const dataToUpdate = {};
    Object.entries(form).forEach(([key, value]) => {
      if (value.trim() !== "") {
        dataToUpdate[key] = value.trim();
      }
    });

    if (Object.keys(dataToUpdate).length === 0) {
      setFormError("Preencha pelo menos um campo para atualizar");
      return;
    }

    if (!validate()) return;

    try {
      await userService.update(userId, dataToUpdate);
      navigate("/users");
    } catch (err) {
      setFormError(err.response?.data?.error || "Erro ao atualizar usuário");
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
        Edição de Usuário (ID: {userId})
      </h2>

      {formError && (
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
          {formError}
        </p>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {[
          { label: "Nome", name: "name", type: "text", placeholder: "Novo nome" },
          { label: "Email", name: "email", type: "email", placeholder: "Novo email" },
          { label: "Tipo", name: "type", type: "text", placeholder: "Novo tipo" },
          { label: "Senha", name: "password", type: "password", placeholder: "Nova senha" },
        ].map(({ label, name, type, placeholder }) => (
          <div key={name} style={{ marginBottom: 20 }}>
            <label
              htmlFor={name}
              style={{ display: "block", marginBottom: 6, fontWeight: "600" }}
            >
              {label}:
            </label>
            <input
              id={name}
              name={name}
              type={type}
              value={form[name]}
              onChange={handleChange}
              placeholder={placeholder}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: 6,
                border: errors[name] ? "1px solid #e74c3c" : "1px solid #ccc",
                fontSize: "1rem",
                boxSizing: "border-box",
              }}
            />
            {errors[name] && (
              <p style={{ color: "#e74c3c", marginTop: 6, marginBottom: 0 }}>
                {errors[name]}
              </p>
            )}
          </div>
        ))}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#17a2b8",
            border: "none",
            borderRadius: 8,
            color: "white",
            fontWeight: "700",
            fontSize: "1.1rem",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#117a8b")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#17a2b8")}
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

export default EditUser;
