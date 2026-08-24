import { useState } from "react";
import "../styles/LoginStyles.css";
import { supabase } from "../../utils/supabase";

function Login({ onNavigateToCadastro, onNavigateToAluno, onNavigateToProfessor, onNavigateToCoordenador }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const navigateByRole = (role) => {
    const r = (role || "").toLowerCase();
    if (r === "coordenador" || r === "coord") {
      onNavigateToCoordenador && onNavigateToCoordenador();
    } else if (r === "professor" || r === "prof") {
      onNavigateToProfessor && onNavigateToProfessor();
    } else {
      onNavigateToAluno && onNavigateToAluno();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg(null);
    setLoading(true);
    const normalized = email.toLowerCase().trim();

    try {
      // Tenta Supabase real
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      if (data?.user) {
        // tenta pegar role do metadata ou profiles
        let role = data.user.user_metadata?.role;
        if (!role) {
          try {
            const { data: profile } = await supabase.from("profiles").select("role").eq("id", data.user.id).single();
            role = profile?.role;
          } catch (_) {}
        }
        // fallback por email se role não existir
        if (!role) {
          if (normalized.includes("coord")) role = "coordenador";
          else if (normalized.includes("prof")) role = "professor";
          else role = "aluno";
        }
        navigateByRole(role);
        return;
      }
    } catch (err) {
      // Se Supabase falhar (tabela não existe, user não existe), usa mock por email
      console.warn("Login Supabase falhou, usando mock:", err?.message);
      if (normalized.includes("coord")) {
        navigateByRole("coordenador");
        return;
      }
      if (normalized.includes("prof")) {
        navigateByRole("professor");
        return;
      }
      // se for erro real de senha, mostra mas ainda permite mock para dev
      if (err?.message && !normalized.includes("@")) {
        setErrorMsg(err.message);
        setLoading(false);
        return;
      }
      navigateByRole("aluno");
      return;
    } finally {
      setLoading(false);
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

            {errorMsg && (
              <div style={{ padding: '10px 12px', borderRadius: 8, fontSize: '0.85rem', background: '#fde8e9', color: '#d93a42', border: '1px solid #f8d0d2' }}>
                {errorMsg}
              </div>
            )}

            <button id="SubmitButton" type="submit" disabled={loading}>
              <span className="ButtonIcon" aria-hidden="true">
                {loading ? "…" : "→"}
              </span>
              <span>{loading ? "Entrando..." : "Entrar"}</span>
            </button>
          </form>
        </div>

        <p id="LoginRedirect">
          Não tem conta?{" "}
          <a href="#cadastro" onClick={handleCadastroClick}>
            Cadastrar-se.
          </a>
        </p>

        <div className="DevShortcuts" style={{ marginTop: 18, display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{ width: '100%', textAlign: 'center', fontSize: '0.78rem', color: '#8a93a3', marginBottom: 4 }}>Acesso rápido (dev):</span>
          <button type="button" onClick={() => onNavigateToAluno && onNavigateToAluno()} style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid #d6dce6', background: '#fff', color: '#2b7fff', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer' }}>Aluno</button>
          <button type="button" onClick={() => onNavigateToProfessor && onNavigateToProfessor()} style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid #d6dce6', background: '#fff', color: '#2b7fff', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer' }}>Professor</button>
          <button type="button" onClick={() => onNavigateToCoordenador && onNavigateToCoordenador()} style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid #d6dce6', background: '#fff', color: '#2b7fff', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer' }}>Coordenador</button>
        </div>
        <p style={{ marginTop: 10, fontSize: '0.74rem', color: '#8a93a3', textAlign: 'center', maxWidth: 340 }}>
          Dica: use <strong>prof@</strong> no email para entrar como professor e <strong>coord@</strong> para coordenador (preparado para Supabase).
        </p>
      </section>
    </main>
  );
}

export default Login;
