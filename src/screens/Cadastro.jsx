import { useState } from "react";
import "../styles/CadastroStyles.css";
import { supabase } from "../../utils/supabase";

function Cadastro({ onNavigateToLogin }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("aluno");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setFeedback(null);
    try {
      // 1. Cria no Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName, role } },
      });
      if (error) throw error;
      if (!data.user) throw new Error("Usuário não retornado. Verifique se o email já existe.");

      console.log("Cadastro Auth OK:", data.user.id);

      // 2. Insere na tabela correta (Opção B: alunos / professores / coordenadores)
      const userId = data.user.id;
      let insertError = null;

      if (role === "aluno") {
        const { error: e } = await supabase.from("alunos").insert({
          id: userId,
          nome: fullName,
          email: email,
        });
        insertError = e;
      } else if (role === "professor") {
        const { error: e } = await supabase.from("professores").insert({
          id: userId,
          nome: fullName,
          email: email,
        });
        insertError = e;
      } else if (role === "coordenador") {
        const { error: e } = await supabase.from("coordenadores").insert({
          id: userId,
          nome: fullName,
          email: email,
        });
        insertError = e;
      }

      if (insertError) {
        // 42501 = RLS bloqueou -> instrução clara
        if (insertError.code === "42501") {
          throw new Error(
            `Usuário criado no Auth (${userId}) mas bloqueado na tabela ${role}. Rode o fix_rls_opcaoB.sql no SQL Editor do Supabase. Detalhe: ${insertError.message}`
          );
        }
        // 23505 = duplicado
        if (insertError.code === "23505") {
          throw new Error(`Email já cadastrado em ${role}: ${insertError.message}`);
        }
        throw insertError;
      }

      console.log(`Cadastro ${role} OK na tabela:`, userId);
      setFeedback({ type: "success", msg: `Cadastro como ${role} realizado! Faça login.` });
    } catch (err) {
      console.error("Cadastro erro:", err);
      // mensagens amigáveis
      if (err.message?.includes("rate limit") || err.status === 429) {
        setFeedback({ type: "error", msg: "Muitas tentativas. Aguarde 15 min ou crie via Dashboard > Authentication > Users > Add user (Auto Confirm)." });
      } else if (err.message?.includes("already registered") || err.message?.includes("already exists")) {
        setFeedback({ type: "error", msg: "Email já cadastrado. Tente fazer login." });
      } else if (err.code === "42501" || err.message?.includes("row-level security")) {
        setFeedback({ type: "error", msg: err.message });
      } else {
        setFeedback({ type: "error", msg: err.message });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick = (event) => {
    event.preventDefault();
    if (onNavigateToLogin) onNavigateToLogin();
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

          <div className="FieldGroup">
            <label htmlFor="roleInput">Perfil</label>
            <select
              id="roleInput"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{ width: '100%', boxSizing: 'border-box', padding: '10px 12px', fontSize: '0.95rem', background: '#eceff3', border: '1px solid #d7dbe3', borderRadius: 10, color: '#1a1a1a', outline: 'none' }}
            >
              <option value="aluno">Aluno</option>
              <option value="professor">Professor</option>
              <option value="coordenador">Coordenador</option>
            </select>
          </div>

          {feedback && (
            <div style={{ padding: '10px 12px', borderRadius: 8, fontSize: '0.85rem', background: feedback.type === 'success' ? '#e6f6ee' : feedback.type === 'error' ? '#fde8e9' : '#eef2ff', color: feedback.type === 'success' ? '#15965a' : feedback.type === 'error' ? '#d93a42' : '#2f6bff', border: `1px solid ${feedback.type === 'success' ? '#c8ebd8' : feedback.type === 'error' ? '#f8d0d2' : '#d6e2ff'}` }}>
              {feedback.msg}
            </div>
          )}

          <button type="submit" id="SubmitButton" disabled={loading}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
            </svg>
            {loading ? "Cadastrando..." : "Cadastrar"}
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
