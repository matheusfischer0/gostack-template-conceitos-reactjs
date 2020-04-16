import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRespositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      console.log(response);
      setRespositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    // TODO
    const repository = {
      title: `New repository ${Date.now()}`,
      url:
        "https://github.com/matheusfischer0/gostack-template-conceitos-nodejs",
      techs: ["ReactJS", "NodeJS", "Express"],
    };
    api.post("repositories", repository).then((response) => {
      setRespositories([...repositories, response.data]);
    });
  }

  async function handleRemoveRepository(id) {
    const repositoryIndex = repositories.findIndex(
      (repository) => repository.id == id
    );

    if (repositoryIndex < 0) {
      return console.log("Error: Not found repository");
    }
    api.delete(`repositories/${id}`).then(() => {
      setRespositories([
        ...repositories.slice(0, repositoryIndex),
        ...repositories.slice(repositoryIndex + 1),
      ]);
    });

    // TODO
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button
              onClick={() => {
                handleRemoveRepository(repository.id);
              }}
            >
              Remover
            </button>
          </li>
        ))}
        {/* <li>
          Repositório 1
          <button onClick={() => handleRemoveRepository(1)}>Remover</button>
        </li> */}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
