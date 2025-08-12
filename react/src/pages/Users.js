import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import UserService from "../services/UserService";
import { useNavigate } from "react-router-dom";

function Users() {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const userService = new UserService(token);

  async function loadUsers() {
    setLoading(true);
    try {
      const data = await userService.list();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Erro ao carregar usuários");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) loadUsers();
  }, [token]);

  async function handleDelete(id) {
    if (!window.confirm("Confirma exclusão do usuário?")) return;

    try {
      await userService.delete(id);
      loadUsers();
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao excluir usuário");
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
          paddingBottom: 10,
          borderBottom: "2px solid #ddd",
        }}
      >
        <h1 style={{ margin: 0 }}>Usuários</h1>
        <button
          onClick={() => navigate("/users/new")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            border: "none",
            borderRadius: 5,
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          + Adicionar Usuário
        </button>
      </div>

      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          boxShadow: "0 0 10px rgba(0,0,0,0.05)",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f8f9fa" }}>
            <th style={{ textAlign: "left", padding: "12px", borderBottom: "1px solid #ddd" }}>Nome</th>
            <th style={{ textAlign: "left", padding: "12px", borderBottom: "1px solid #ddd" }}>Email</th>
            <th style={{ textAlign: "left", padding: "12px", borderBottom: "1px solid #ddd" }}>Tipo</th>
            <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "12px" }}>{u.name}</td>
              <td style={{ padding: "12px" }}>{u.email}</td>
              <td style={{ padding: "12px" }}>{u.type}</td>
              <td style={{ padding: "12px", textAlign: "center" }}>
                <button
                  onClick={() => navigate(`/users/${u.id}`)}
                  style={{
                    marginRight: 8,
                    padding: "6px 12px",
                    backgroundColor: "#ffc107",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                  title="Editar usuário"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(u.id)}
                  style={{
                    padding: "6px 12px",
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                  title="Excluir usuário"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
          {users.length === 0 && !loading && (
            <tr>
              <td colSpan="4" style={{ padding: "20px", textAlign: "center", color: "#999" }}>
                Nenhum usuário encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
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
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#ce1111ff")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#ce1111ff")}
          onClick={() => navigate("/")}
        >
          Voltar para Home
        </button>
    </div>
  );
}

export default Users;
