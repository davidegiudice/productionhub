// File: src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Assicurati di aggiornare questo URL in produzione
});

export default api;
