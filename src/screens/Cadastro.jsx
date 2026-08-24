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
      // Tentativa real com Supabase - se falhar, cai no mock
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName, role } },
      });
      if (error) throw error;
      console.log("Cadastro Supabase OK:", data);
      setFeedback({ type: "success", msg: "Cadastro realizado! Verifique seu email." });
      // Futuro: inserir em public.profiles
      // await supabase.from('profiles').insert({ id: data.user.id, full_name: fullName, role })
    } catch (err) {
      console.log("Cadastro mock (Supabase não configurado ou erro):", { fullName, email, role, err: err.message });
      setFeedback({ type: "info", msg: `Mock: cadastrado como ${role} (${email}) - conecte o Supabase para persistir.` });
    } finally {
      setLoading(false);
    }
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
            <div style={{ padding: '10px 12px', borderRadius: 8, fontSize: '0.85rem', background: feedback.type === 'success' ? '#e6f6ee' : '#eef2ff', color: feedback.type === 'success' ? '#15965a' : '#2f6bff', border: `1px solid ${feedback.type === 'success' ? '#c8ebd8' : '#d6e2ff'}` }}>
              {feedback.msg}
            </div>
          )}

          <button type="submit" id="SubmitButton" disabled={loading}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
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
