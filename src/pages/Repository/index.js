import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function Repository({ match }) {
  const repoName = decodeURIComponent(match.params.repository);

  const fetchAll = async () => {
    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);

    console.log(repository);
    console.log(issues);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return <h1>Repository: {repoName}</h1>;
}

export default Repository;
