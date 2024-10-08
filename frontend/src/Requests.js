// File: src/components/Requests.js
import React, { useEffect, useState } from 'react';
import axios from '../services/api';

function Requests() {
  const [artisti, setArtisti] = useState([]);
  const [richieste, setRichieste] = useState([]);
  const [artistaId, setArtistaId] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descrizione, setDescrizione] = useState('');

  useEffect(() => {
    axios.get('/api/artisti')
      .then(response => setArtisti(response.data))
      .catch(error => console.error('Errore durante il caricamento degli artisti:', error));

    axios.get('/api/richieste')
      .then(response => setRichieste(response.data))
      .catch(error => console.error('Errore durante il caricamento delle richieste:', error));
  }, []);

  const handleAddRequest = (e) => {
    e.preventDefault();
    const nuovaRichiesta = {
      artista_id: artistaId,
      categoria,
      descrizione,
    };
    axios.post('/api/richieste', nuovaRichiesta)
      .then(response => {
        setRichieste(prev => [...prev, response.data]);
        setCategoria('');
        setDescrizione('');
      })
      .catch(error => {
        console.error('Errore durante l\'aggiunta della richiesta:', error);
      });
  };

  return (
    <div className="requests-container">
      <h2>Gestione Richieste degli Artisti</h2>
      <form onSubmit={handleAddRequest}>
        <select
          value={artistaId}
          onChange={(e) => setArtistaId(e.target.value)}
        >
          <option value="">Seleziona Artista</option>
          {artisti.map(artista => (
            <option key={artista.id} value={artista.id}>
              {artista.nome}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        />
        <textarea
          placeholder="Descrizione"
          value={descrizione}
          onChange={(e) => setDescrizione(e.target.value)}
        />
        <button type="submit">Aggiungi Richiesta</button>
      </form>
      <ul>
        {richieste.map(richiesta => (
          <li key={richiesta.id}>
            Artista: {richiesta.artista} - Categoria: {richiesta.categoria} - Descrizione: {richiesta.descrizione}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Requests;
