import React, { useState } from 'react';
import api from '../services/api';

function AddEvent() {
  const [titolo, setTitolo] = useState('');
  const [descrizione, setDescrizione] = useState('');
  const [dataInizio, setDataInizio] = useState('');
  const [dataFine, setDataFine] = useState('');

  const handleAddEvent = async (e) => {
    e.preventDefault();

    const nuovoEvento = {
      titolo,
      descrizione,
      data_inizio: dataInizio,
      data_fine: dataFine,
    };

    try {
      const response = await api.post('api/eventi', nuovoEvento);
      console.log('Evento aggiunto con successo:', response.data);
      setTitolo('');
      setDescrizione('');
      setDataInizio('');
      setDataFine('');
    } catch (error) {
      console.error('Errore durante l\'aggiunta dell\'evento:', error);
    }
  };

  return (
    <div className="add-event-container">
      <h2>Aggiungi Evento</h2>
      <form onSubmit={handleAddEvent}>
        <input
          type="text"
          placeholder="Titolo Evento"
          value={titolo}
          onChange={(e) => setTitolo(e.target.value)}
          required
        />
        <textarea
          placeholder="Descrizione"
          value={descrizione}
          onChange={(e) => setDescrizione(e.target.value)}
        />
        <input
          type="datetime-local"
          placeholder="Data Inizio"
          value={dataInizio}
          onChange={(e) => setDataInizio(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          placeholder="Data Fine"
          value={dataFine}
          onChange={(e) => setDataFine(e.target.value)}
          required
        />
        <button type="submit">Aggiungi Evento</button>
      </form>
    </div>
  );
}

export default AddEvent;
