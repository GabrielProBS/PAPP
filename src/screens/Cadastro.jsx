import { useState } from "react";
import "../styles/CadastroStyles.css";

function Cadastro({ onNavigateToLogin }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Cadastro attempt:", { fullName, email, password });
  };

  const handleLoginClick = (event) => {
    event.preventDefault();

    if (onNavigateToLogin) {
      onNavigateToLogin();
    }
  };

  return (
    <main id="Main">
      <div id="Card">
        <h1 id="Title">Cadastro</h1>

        <form id="Form" onSubmit={handleSubmit}>
          <div className="FieldGroup">
            <label htmlFor="fullNameInput">Nome Completo</label>
            <input
              id="fullNameInput"
              type="text"
              placeholder="Seu nome completo"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
            />
          </div>

          <div className="FieldGroup">
            <label htmlFor="emailInput">Email</label>
            <input
              id="emailInput"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="FieldGroup">
            <label htmlFor="passwordInput">Senha</label>
            <input
              id="passwordInput"
              type="password"
              placeholder="••••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <button type="submit" id="SubmitButton">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
            </svg>
            Cadastrar
          </button>
        </form>

        <p id="LoginRedirect">
          Não tem conta?{" "}
          <a href="#login" onClick={handleLoginClick}>
            Entrar.
          </a>
        </p>
      </div>
    </main>
  );
}

export default Cadastro;
