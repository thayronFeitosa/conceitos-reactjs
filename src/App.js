import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setPepositoriess] = useState([]);
  useEffect(() => {
    api.get('repositories').then(repositories => {
      setPepositoriess(repositories.data)
    })
  }, [])


  async function handleAddRepository() {
    const response = await api.post("repositories", {
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    });

    setPepositoriess([...repositories, response.data])


  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setPepositoriess(repositories.filter(
      repository => repository.id !== id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => <li key={repository.id}>{repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover</button></li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
