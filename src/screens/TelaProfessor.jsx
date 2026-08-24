import { useState } from "react";
import "../styles/TelaProfessorStyles.css";

const alunosMock = [
  {
    id: 1,
    nome: "Ana Silva",
    ano: "2º Ano",
    pendentes: 2,
    disciplinas: [
      { id: 11, nome: "Matemática", status: "Pendente", statusClass: "status--pendente", meta: "Aguardando envio" },
      { id: 12, nome: "Física", status: "Enviado", statusClass: "status--enviado", meta: "Avaliar", action: "Avaliar" },
    ],
  },
  {
    id: 2,
    nome: "Carlos Souza",
    ano: "1º Ano",
    pendentes: 3,
    disciplinas: [
      { id: 21, nome: "Química", status: "Em Avaliação", statusClass: "status--avaliacao", meta: "Avaliar", action: "Avaliar" },
      { id: 22, nome: "História", status: "Pendente", statusClass: "status--pendente", meta: "Aguardando envio" },
      { id: 23, nome: "Biologia", status: "Pendente", statusClass: "status--pendente", meta: "Aguardando envio" },
    ],
  },
  {
    id: 3,
    nome: "Beatriz Ferreira",
    ano: "3º Ano",
    pendentes: 0,
    disciplinas: [
      { id: 31, nome: "Matemática", status: "Aprovado", statusClass: "status--aprovado", meta: "8.0" },
    ],
  },
  {
    id: 4,
    nome: "Diego Lima",
    ano: "2º Ano",
    pendentes: 2,
    disciplinas: [
      { id: 41, nome: "Física", status: "Pendente", statusClass: "status--pendente", meta: "Aguardando envio" },
      { id: 42, nome: "Português", status: "Enviado", statusClass: "status--enviado", meta: "Avaliar", action: "Avaliar" },
    ],
  },
  {
    id: 5,
    nome: "Fernanda Rocha",
    ano: "1º Ano",
    pendentes: 2,
    disciplinas: [
      { id: 51, nome: "Química", status: "Pendente", statusClass: "status--pendente", meta: "Aguardando envio" },
      { id: 52, nome: "História", status: "Reprovado", statusClass: "status--reprovado", meta: "4.5" },
    ],
  },
];

function IconUsers() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8.5 8.75A2.75 2.75 0 1 0 8.5 3.25a2.75 2.75 0 0 0 0 5.5Zm0-1.5a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5ZM15.5 9.75a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0-1.5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1ZM8.5 11.25c-2.47 0-4.5 1.42-4.5 3.18V16.5h9v-2.07c0-1.76-2.03-3.18-4.5-3.18Zm0 1.5c1.55 0 3 0.8 3 1.68V15H5.5v-.57c0-.88 1.45-1.68 3-1.68Zm6.5-1.1c-0.35 0-0.69 0.05-1.01 0.13 0.7 0.64 1.11 1.47 1.11 2.35V16.5h3.9v-1.25c0-1.38-1.79-2.56-4-2.56Z" />
    </svg>
  );
}

function IconLogout() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M10 5.5A1.5 1.5 0 0 1 11.5 4h7A1.5 1.5 0 0 1 20 5.5v13A1.5 1.5 0 0 1 18.5 20h-7A1.5 1.5 0 0 1 10 18.5V16h1.5v2.5h7v-13h-7V8H10V5.5Zm-2.8 5.5 2.7-2.7 1.1 1.1-1 1H4.5V9h5.5l1-1 1.1 1.1L7.2 11.8 6.1 10.7Z" />
    </svg>
  );
}

function IconChevron({ open }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={open ? "chevron chevron--open" : "chevron"}>
      <path d="M9.5 6.5 15 12l-5.5 5.5-1.06-1.06L13 12 8.44 7.56 9.5 6.5Z" />
    </svg>
  );
}

function TelaProfessor({ onLogout }) {
  const [expandedId, setExpandedId] = useState(null);
  const [alunos, setAlunos] = useState(alunosMock);
  const [avaliandoId, setAvaliandoId] = useState(null);
  const [notaInput, setNotaInput] = useState("");

  const toggle = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleAvaliarClick = (alunoId, disciplinaId) => {
    setAvaliandoId(`${alunoId}-${disciplinaId}`);
    setNotaInput("");
  };

  const handleConfirmAvaliacao = (alunoId, disciplinaId) => {
    // futuramente: supabase.from('entregas').update({ status: 'Aprovado', nota: notaInput })
    const nota = notaInput.trim() || "8.0";
    setAlunos((prev) =>
      prev.map((aluno) =>
        aluno.id === alunoId
          ? {
              ...aluno,
              pendentes: Math.max(0, aluno.pendentes - 1),
              disciplinas: aluno.disciplinas.map((d) =>
                d.id === disciplinaId
                  ? { ...d, status: "Aprovado", statusClass: "status--aprovado", meta: nota, action: undefined }
                  : d
              ),
            }
          : aluno
      )
    );
    setAvaliandoId(null);
    setNotaInput("");
  };

  return (
    <main className="profDashboard">
      <aside className="profSidebar">
        <div className="profSidebar__brand">
          <span className="profSidebar__title">PAPP</span>
          <span className="profSidebar__badge">Professor</span>
        </div>

        <nav className="profSidebar__nav" aria-label="Navegação professor">
          <button type="button" className="profSidebar__item profSidebar__item--active">
            <IconUsers />
            <span>Alunos em DP</span>
          </button>
        </nav>

        <button type="button" className="profSidebar__logout" onClick={onLogout}>
          <IconLogout />
          <span>Sair</span>
        </button>
      </aside>

      <section className="profContent">
        <header className="profContent__header">
          <h1>Alunos em Progressão Parcial</h1>
          <p>5 alunos • Ciclo 2024.1</p>
        </header>

        <div className="profList">
          {alunos.map((aluno) => {
            const isOpen = expandedId === aluno.id;
            return (
              <div key={aluno.id} className={`profCard ${isOpen ? "profCard--open" : ""}`}>
                <button type="button" className="profCard__header" onClick={() => toggle(aluno.id)} aria-expanded={isOpen}>
                  <span className="profCard__chevron">
                    <IconChevron open={isOpen} />
                  </span>
                  <span className="profCard__name">{aluno.nome}</span>
                  <span className="profCard__meta">
                    <span className="profCard__ano">{aluno.ano}</span>
                    <span className="profCard__pill">{aluno.pendentes} pendentes</span>
                  </span>
                </button>

                {isOpen && (
                  <div className="profCard__body">
                    {aluno.disciplinas.map((disc) => (
                      <div key={disc.id} className="profDisciplineRow">
                        <span className={`statusPill ${disc.statusClass}`}>{disc.status}</span>
                        <span className="profDisciplineRow__name">{disc.nome}</span>
                        <span className="profDisciplineRow__right">
                          {avaliandoId === `${aluno.id}-${disc.id}` ? (
                            <span className="profEvaluateInline">
                              <input
                                type="text"
                                placeholder="Nota"
                                value={notaInput}
                                onChange={(e) => setNotaInput(e.target.value)}
                                className="profEvaluateInline__input"
                                autoFocus
                              />
                              <button
                                type="button"
                                className="profEvaluateInline__confirm"
                                onClick={() => handleConfirmAvaliacao(aluno.id, disc.id)}
                              >
                                Salvar
                              </button>
                              <button type="button" className="profEvaluateInline__cancel" onClick={() => setAvaliandoId(null)}>
                                Cancelar
                              </button>
                            </span>
                          ) : disc.action === "Avaliar" ? (
                            <button type="button" className="profBtnAvaliar" onClick={() => handleAvaliarClick(aluno.id, disc.id)}>
                              Avaliar
                            </button>
                          ) : (
                            <span className="profDisciplineRow__meta">{disc.meta}</span>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default TelaProfessor;
