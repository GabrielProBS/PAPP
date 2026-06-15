import { useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");

  return (
    <div id="Main">
      <h1 id="Title">PAPP</h1>
      <h3 id="SubTitle">
        Programa de Acompanhamento de Progressão Parcial
      </h3>

      <div id="Section">
        <form>
          <label>Email</label>

          <input
            id="emailInput"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </form>
      </div>
    </div>
  );
}

export default App;