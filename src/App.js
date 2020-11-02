import { useState, useEffect } from "react";
import api from "./services/api";

import Header from "./components/Header";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("projects").then((res) => {
      setProjects(res.data);
    });
  }, []);

  async function handleAddProject() {
    const res = await api.post("projects", {
      title: `Novo Projeto ${Date.now()}`,
      owner: "Luciano dii Souza",
    });

    const project = res.data;

    setProjects([...projects, project]);
  }

  return (
    <>
      <Header title="React JS" />
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.title}</li>
        ))}
      </ul>

      <button type="button" onClick={handleAddProject}>
        Adicionar Projeto
      </button>
    </>
  );
}

export default App;
