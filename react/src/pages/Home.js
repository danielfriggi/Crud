import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#f0f2f5",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#333",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>
        Bem-vindo ao SPS React Test
      </h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "40px" }}>
        Um sistema simples para gerenciar usuários
      </p>
      <Link
        to="/users"
        style={{
          padding: "15px 30px",
          backgroundColor: "#4CAF50",
          color: "white",
          fontWeight: "600",
          fontSize: "1.1rem",
          borderRadius: "8px",
          textDecoration: "none",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={e => (e.target.style.backgroundColor = "#45a049")}
        onMouseLeave={e => (e.target.style.backgroundColor = "#4CAF50")}
      >
        Ver Usuários
      </Link>
          <Link
      to="/signin"
      style={{
        padding: "15px 30px",
        backgroundColor: "#4CAF50",
        color: "white",
        fontWeight: "600",
        fontSize: "1.1rem",
        borderRadius: "8px",
        textDecoration: "none",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        transition: "background-color 0.3s ease",
      }}
      onMouseEnter={(e) => (e.target.style.backgroundColor = "#45a049")}
      onMouseLeave={(e) => (e.target.style.backgroundColor = "#4CAF50")}
    >
      Login
    </Link>
    </div>
  );
}

export default Home;
