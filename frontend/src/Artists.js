// File: src/components/Artists.js
import React, { useEffect, useState } from 'react';
import axios from '../services/api';

function Artists() {
  const [artisti, setArtisti] = useState([]);
  const [nome, setNome] = useState('');
  const [genere, setGenere] = useState('');

  useEffect(() => {
    axios.get('/api/artisti')
      .then(response => {
        setArtisti(response.data);
      })
      .catch(error => {
        console.error('Errore durante il caricamento degli artisti:', error);
      });
  }, []);

  const handleAddArtist = (e) => {
    e.preventDefault();
    const nuovoArtista = { nome, genere };
    axios.post('/api/artisti', nuovoArtista)
      .then(response => {
        setArtisti(prev => [...prev, response.data]);
        setNome('');
        setGenere('');
      })
      .catch(error => {
        console.error('Errore durante l\'aggiunta dell\'artista:', error);
      });
  };

  return (
    <div className="artists-container">
      <h2>Gestione Artisti</h2>
      <form onSubmit={handleAddArtist}>
        <input
          type="text"
          placeholder="Nome Artista"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="text"
          placeholder="Genere"
          value={genere}
          onChange={(e) => setGenere(e.target.value)}
        />
        <button type="submit">Aggiungi Artista</button>
      </form>
      <ul>
        {artisti.map(artista => (
          <li key={artista.id}>
            {artista.nome} - {artista.genere}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Artists;
