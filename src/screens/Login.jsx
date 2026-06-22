import { useState } from "react";
import "../styles/LoginStyles.css";

function Login({ onNavigateToCadastro, onNavigateToAluno }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (onNavigateToAluno) {
      onNavigateToAluno();
    }
  };

  const handleCadastroClick = (event) => {
    event.preventDefault();

    if (onNavigateToCadastro) {
      onNavigateToCadastro();
    }
  };

  return (
    <main id="Main">
      <section id="LoginShell" aria-label="Tela de login do PAPP">
        <header id="HeaderBlock">
          <h1 id="Title">PAPP</h1>
          <p id="SubTitle">Programa de Acompanhamento da Progressão Parcial</p>
        </header>

        <div id="Section">
          <form id="LoginForm" onSubmit={handleSubmit}>
            <div className="FieldGroup">
              <label htmlFor="emailInput">Email</label>
              <input
                id="emailInput"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="FieldGroup">
              <label htmlFor="passwordInput">Senha</label>
              <input
                id="passwordInput"
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            <button id="SubmitButton" type="submit">
              <span className="ButtonIcon" aria-hidden="true">
                →
              </span>
              <span>Entrar</span>
            </button>
          </form>
        </div>

        <p id="LoginRedirect">
          Não tem conta?{" "}
          <a href="#cadastro" onClick={handleCadastroClick}>
            Cadastrar-se.
          </a>
        </p>
      </section>
    </main>
  );
}

export default Login;
