import { useState } from "react";
import Cadastro from "./Cadastro.jsx";
import Login from "./Login.jsx";
import TelaAluno from "./TelaAluno.jsx";
import TelaProfessor from "./TelaProfessor.jsx";
import TelaCoordenador from "./TelaCoordenador.jsx";

function App() {
  const [screen, setScreen] = useState("login");

  if (screen === "cadastro") {
    return <Cadastro onNavigateToLogin={() => setScreen("login")} />;
  }

  if (screen === "aluno") {
    return <TelaAluno onLogout={() => setScreen("login")} />;
  }

  if (screen === "professor") {
    return <TelaProfessor onLogout={() => setScreen("login")} />;
  }

  if (screen === "coordenador") {
    return <TelaCoordenador onLogout={() => setScreen("login")} />;
  }

  return (
    <Login
      onNavigateToCadastro={() => setScreen("cadastro")}
      onNavigateToAluno={() => setScreen("aluno")}
      onNavigateToProfessor={() => setScreen("professor")}
      onNavigateToCoordenador={() => setScreen("coordenador")}
    />
  );
}

export default App;
