import { useMemo, useState } from "react";
import "../styles/TelaAlunoStyles.css";

const disciplinas = [
  {
    id: 1,
    status: "Pendente",
    statusClass: "status--pendente",
    disciplina: "Matemática",
    ano: "2º Ano",
    prazo: "05/08/2025",
    professor: "Prof. Edna",
    material: "Roteiro_Matematica_2025.pdf",
  },
  {
    id: 2,
    status: "Enviado",
    statusClass: "status--enviado",
    disciplina: "Física",
    ano: "2º Ano",
    prazo: "12/05/2026",
    professor: "Prof. Lucas",
    material: "Roteiro_Fisica_2025.pdf",
  },
  {
    id: 3,
    status: "Em avaliação",
    statusClass: "status--avaliacao",
    disciplina: "Química",
    ano: "1º Ano",
    prazo: "30/06/2025",
    professor: "Prof. Marina",
    material: "Roteiro_Quimica_2025.pdf",
  },
  {
    id: 4,
    status: "Aprovado",
    statusClass: "status--aprovado",
    disciplina: "História",
    ano: "1º Ano",
    prazo: "21/03/2025",
    professor: "Prof. Ana",
    material: "Roteiro_Historia_2025.pdf",
  },
  {
    id: 5,
    status: "Reprovado",
    statusClass: "status--reprovado",
    disciplina: "Biologia",
    ano: "2º Ano",
    prazo: "05/08/2025",
    professor: "Prof. Carlos",
    material: "Roteiro_Biologia_2025.pdf",
  },
];

function IconBook() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18.5a.5.5 0 0 1-.8.4l-2.2-1.65a3 3 0 0 0-1.8-.6H6.5A2.5 2.5 0 0 1 4 16.1V4.5Zm2.5-.5A.5.5 0 0 0 6 4.5v11.6a.5.5 0 0 0 .5.5H15a5 5 0 0 1 2.5.67V4H6.5Zm2 3.5h4v1.5h-4V7.5Zm0 3h7V12h-7v-1.5Z" />
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

function IconFile() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 2.75A1.75 1.75 0 0 1 7.75 1h6.69L19 5.56V21.25A1.75 1.75 0 0 1 17.25 23H7.75A1.75 1.75 0 0 1 6 21.25V2.75Zm8 .75H7.75a.25.25 0 0 0-.25.25v17.5c0 .14.11.25.25.25h9.5c.14 0 .25-.11.25-.25V6H14a.75.75 0 0 1-.75-.75V3.5Zm-2.5 8h-3v-1.5h3v1.5Zm5 3.5H8.5v-1.5h8v1.5Z" />
    </svg>
  );
}

function IconUpload() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3.5 16 7.5l-1.06 1.06-2.19-2.19V16h-1.5V6.37L8.06 8.56 7 7.5 12 2.5 12 3.5ZM5.5 12.5H7v6.25c0 .41.34.75.75.75h8.5c.41 0 .75-.34.75-.75V12.5h1.5v6.25A2.25 2.25 0 0 1 16.25 21H7.75A2.25 2.25 0 0 1 5.5 18.75V12.5Z" />
    </svg>
  );
}

function TelaAluno({ onLogout }) {
  const [selectedId, setSelectedId] = useState(null);

  const selectedDiscipline = useMemo(() => {
    return disciplinas.find((discipline) => discipline.id === selectedId) ?? disciplinas[0];
  }, [selectedId]);

  const openDiscipline = (id) => {
    setSelectedId(id);
  };

  const closeDrawer = () => {
    setSelectedId(null);
  };

  return (
    <main className="dashboard">
      <aside className="sidebar">
        <div className="sidebar__brand">
          <span className="sidebar__title">PAPP</span>
          <span className="sidebar__badge">Aluno</span>
        </div>

        <nav className="sidebar__nav" aria-label="Navegação principal">
          <button type="button" className="sidebar__item sidebar__item--active">
            <IconBook />
            <span>Minhas Disciplinas</span>
          </button>
        </nav>

        <button type="button" className="sidebar__logout" onClick={onLogout}>
          <IconLogout />
          <span>Sair</span>
        </button>
      </aside>

      <section className="content">
        <header className="content__header">
          <h1>Minhas Disciplinas</h1>
          <p>Progressão Parcial</p>
        </header>

        <div className="tableCard">
          <div className="tableCard__head">
            <span>Status</span>
            <span>Disciplina</span>
            <span>Prazo</span>
          </div>

          <div className="tableCard__body">
            {disciplinas.map((disciplina) => (
              <button
                key={disciplina.id}
                type="button"
                className={`disciplineRow ${selectedId === disciplina.id ? "disciplineRow--selected" : ""}`}
                onClick={() => openDiscipline(disciplina.id)}
              >
                <span className={`statusPill ${disciplina.statusClass}`}>{disciplina.status}</span>
                <span className="disciplineRow__name">{disciplina.disciplina}</span>
                <span className="disciplineRow__year">{disciplina.ano}</span>
                <span className="disciplineRow__deadline">{disciplina.prazo}</span>
                <span className="disciplineRow__arrow" aria-hidden="true">
                  &gt;
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <aside className={`drawer ${selectedId !== null ? "drawer--open" : ""}`} aria-hidden={selectedId === null}>
        <div className="drawer__header">
          <h2>
            {selectedDiscipline.disciplina} - {selectedDiscipline.ano}
          </h2>
          <button type="button" className="drawer__close" onClick={closeDrawer} aria-label="Fechar painel">
            &times;
          </button>
        </div>

        <dl className="drawer__meta">
          <div>
            <dt>Professor</dt>
            <dd>{selectedDiscipline.professor}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>
              <span className={`statusPill ${selectedDiscipline.statusClass}`}>{selectedDiscipline.status}</span>
            </dd>
          </div>
          <div>
            <dt>Prazo</dt>
            <dd>{selectedDiscipline.prazo}</dd>
          </div>
        </dl>

        <section className="drawer__section">
          <h3>Material de Estudo</h3>
          <button type="button" className="documentCard">
            <IconFile />
            <span>{selectedDiscipline.material}</span>
          </button>
        </section>

        <section className="drawer__section">
          <h3>Enviar Atividade</h3>
          <button type="button" className="uploadBox">
            <IconUpload />
            <span>Arraste um PDF ou clique aqui</span>
          </button>
        </section>
      </aside>
    </main>
  );
}

export default TelaAluno;
