// File: src/components/Calendar.js
import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from '../services/api';

function Calendar() {
  const [eventi, setEventi] = useState([]);

  useEffect(() => {
    axios.get('/api/eventi')
      .then(response => {
        const eventiDalBackend = response.data.map(evento => ({
          id: evento.id,
          title: evento.titolo,
          start: evento.data_inizio,
          end: evento.data_fine,
        }));
        setEventi(eventiDalBackend);
      })
      .catch(error => console.error('Errore durante il caricamento degli eventi:', error));
  }, []);

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={eventi}
      />
    </div>
  );
}

export default Calendar;
