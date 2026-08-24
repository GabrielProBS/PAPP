import "../styles/TelaCoordenadorStyles.css";

const statsMock = {
  conclusao: { value: "10%", sub: "1 de 10 disciplinas" },
  alunosDP: { value: "5", sub: "" },
  criticos: { value: "0", sub: "0 entregas realizadas" },
  pendencias: { value: "3", sub: "Aguardando avaliação" },
};

const progressoMock = [
  { nome: "Ana Silva", progresso: 12 },
  { nome: "Carlos Souza", progresso: 8 },
  { nome: "Beatriz Ferreira", progresso: 100 },
  { nome: "Diego Lima", progresso: 14 },
  { nome: "Fernando Rocha", progresso: 6 },
];

const todosAlunosMock = [
  {
    id: 1,
    nome: "Ana Silva",
    ano: "2º Ano",
    tags: [
      { label: "Pendente", cls: "status--pendente" },
      { label: "Enviado", cls: "status--enviado" },
    ],
  },
  {
    id: 2,
    nome: "Carlos Souza",
    ano: "2º Ano",
    tags: [
      { label: "Em avaliação", cls: "status--avaliacao" },
      { label: "Pendente", cls: "status--pendente" },
    ],
  },
  {
    id: 3,
    nome: "Beatriz Ferreira",
    ano: "3º Ano",
    tags: [{ label: "Aprovado", cls: "status--aprovado" }],
  },
  {
    id: 4,
    nome: "Diego Lima",
    ano: "2º Ano",
    tags: [
      { label: "Enviado", cls: "status--enviado" },
      { label: "Pendente", cls: "status--pendente" },
    ],
  },
  {
    id: 5,
    nome: "Fernanda Rocha",
    ano: "1º Ano",
    tags: [{ label: "Reprovado", cls: "status--reprovado" }],
  },
];

function IconDashboard() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3.5 3.5h7v7h-7v-7Zm1.5 1.5v4h4v-4h-4Zm6.5-1.5h7v7h-7v-7Zm1.5 1.5v4h4v-4h-4ZM3.5 13.5h7v7h-7v-7Zm1.5 1.5v4h4v-4h-4Zm6.5-1.5h7v7h-7v-7Zm1.5 1.5v4h4v-4h-4Z" />
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

function TelaCoordenador({ onLogout }) {
  return (
    <main className="coordDashboard">
      <aside className="coordSidebar">
        <div className="coordSidebar__brand">
          <span className="coordSidebar__title">PAPP</span>
          <span className="coordSidebar__badge">Coordenador</span>
        </div>

        <nav className="coordSidebar__nav" aria-label="Navegação coordenador">
          <button type="button" className="coordSidebar__item coordSidebar__item--active">
            <IconDashboard />
            <span>Dashboard</span>
          </button>
        </nav>

        <button type="button" className="coordSidebar__logout" onClick={onLogout}>
          <IconLogout />
          <span>Sair</span>
        </button>
      </aside>

      <section className="coordContent">
        <header className="coordContent__header">
          <h1>Dashboard</h1>
          <p>PAPP</p>
        </header>

        <div className="coordStats">
          <div className="coordStatCard">
            <span className="coordStatCard__label">Conclusão Geral</span>
            <span className="coordStatCard__value">{statsMock.conclusao.value}</span>
            <span className="coordStatCard__sub">{statsMock.conclusao.sub}</span>
          </div>
          <div className="coordStatCard">
            <span className="coordStatCard__label">Alunos em DP</span>
            <span className="coordStatCard__value">{statsMock.alunosDP.value}</span>
            {statsMock.alunosDP.sub && <span className="coordStatCard__sub">{statsMock.alunosDP.sub}</span>}
          </div>
          <div className="coordStatCard">
            <span className="coordStatCard__label">Alunos Críticos</span>
            <span className="coordStatCard__value">{statsMock.criticos.value}</span>
            <span className="coordStatCard__sub">{statsMock.criticos.sub}</span>
          </div>
          <div className="coordStatCard">
            <span className="coordStatCard__label">Pendências do Professor</span>
            <span className="coordStatCard__value">{statsMock.pendencias.value}</span>
            <span className="coordStatCard__sub">{statsMock.pendencias.sub}</span>
          </div>
        </div>

        <div className="coordCard">
          <h2 className="coordCard__title">Progresso por aluno</h2>
          <div className="coordProgressList">
            {progressoMock.map((aluno) => (
              <div key={aluno.nome} className="coordProgressRow">
                <span className="coordProgressRow__name">{aluno.nome}</span>
                <span className="coordProgressRow__bar">
                  <span className="coordProgressRow__track">
                    <span className="coordProgressRow__fill" style={{ width: `${aluno.progresso}%` }} />
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="coordCard">
          <h2 className="coordCard__title">Todos os alunos</h2>
          <div className="coordStudentsList">
            {todosAlunosMock.map((aluno) => (
              <button key={aluno.id} type="button" className="coordStudentRow">
                <span className="coordStudentRow__name">{aluno.nome}</span>
                <span className="coordStudentRow__right">
                  <span className="coordStudentRow__ano">{aluno.ano}</span>
                  <span className="coordStudentRow__tags">
                    {aluno.tags.map((tag) => (
                      <span key={tag.label} className={`statusPill ${tag.cls}`}>
                        {tag.label}
                      </span>
                    ))}
                  </span>
                  <span className="coordStudentRow__arrow" aria-hidden="true">
                    &gt;
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default TelaCoordenador;
