import React, { useState, useEffect } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { Container, Form, SubmitButton, List } from './styles';
import api from '../../services/api';

const Main = () => {
  const [loading, setLoading] = useState(false);
  const [newRepo, setNewRepo] = useState('');
  const [repositories, setRepositories] = useState([]);
  const localReposName = 'repositories';

  const updateLocalRepos = () => {
    const localRepos = localStorage.getItem(localReposName);
    console.log(localRepos);
    if (localRepos) setRepositories(JSON.parse(localRepos));
  };

  useEffect(() => {
    updateLocalRepos();
  }, [setRepositories]);

  const handleInputChange = (e) => {
    setNewRepo(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const response = await api.get(`/repos/${newRepo}`);

    const data = {
      name: response.data.full_name,
    };

    const newRepos = [...repositories, data];
    localStorage.setItem(localReposName, JSON.stringify(newRepos));
    setRepositories(newRepos);
    setNewRepo('');
    setLoading(false);
  };

  return (
    <Container>
      <h1>
        <FaGithubAlt />
        Repositórios
      </h1>
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Adicionar repositório"
          value={newRepo}
          onChange={handleInputChange}
        />
        <SubmitButton loading={loading}>
          {loading ? (
            <FaSpinner color="#FFF" size={14} />
          ) : (
            <FaPlus color="#FFF" size={14} />
          )}
        </SubmitButton>
      </Form>

      <List>
        {repositories.map((repository, index) => (
          <li key={index}>
            <span>{repository.name}</span>
            <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
              Detalhes
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
};

export default Main;
