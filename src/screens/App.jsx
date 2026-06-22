import { useState } from "react";
import Cadastro from "./Cadastro.jsx";
import Login from "./Login.jsx";
import TelaAluno from "./TelaAluno.jsx";

function App() {
  const [screen, setScreen] = useState("login");

  if (screen === "cadastro") {
    return <Cadastro onNavigateToLogin={() => setScreen("login")} />;
  }

  if (screen === "aluno") {
    return <TelaAluno onLogout={() => setScreen("login")} />;
  }

  return (
    <Login
      onNavigateToCadastro={() => setScreen("cadastro")}
      onNavigateToAluno={() => setScreen("aluno")}
    />
  );
}

export default App;
