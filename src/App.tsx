import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

import "./index.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="container columns-2 flex flex-row">


      <div className="basis-1/3">
        <h2>Aujourd'hui</h2>
      </div>

      <div className="basis-2/3">
      <h1>Bonjour</h1>
      <div className="row">

      </div>

      <p>Aucun taches pour aujourd'hui</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>


      <p>{greetMsg}</p>
      </div>
    </div>
  );
}

export default App;
