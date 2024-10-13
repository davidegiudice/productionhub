import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://hub.artide.cloud:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// User management endpoints
export const registerUser = async (userData) => {
  try {
    const response = await instance.post('/users/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await instance.post('/users/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

export const getUserDetails = async (userId) => {
  try {
    const response = await instance.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await instance.put(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await instance.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// Artist management endpoints
export const addArtist = async (artistData) => {
  try {
    const response = await instance.post('/artisti', artistData);
    return response.data;
  } catch (error) {
    console.error('Error adding artist:', error);
    throw error;
  }
};

export const getArtists = async () => {
  try {
    const response = await instance.get('/artisti');
    return response.data;
  } catch (error) {
    console.error('Error fetching artists:', error);
    throw error;
  }
};

// Request management endpoints
export const addRequest = async (requestData) => {
  try {
    const response = await instance.post('/richieste', requestData);
    return response.data;
  } catch (error) {
    console.error('Error adding request:', error);
    throw error;
  }
};

export const getRequests = async () => {
  try {
    const response = await instance.get('/richieste');
    return response.data;
  } catch (error) {
    console.error('Error fetching requests:', error);
    throw error;
  }
};

// Event management endpoints
export const addEvent = async (eventData) => {
  try {
    const response = await instance.post('/eventi', eventData);
    return response.data;
  } catch (error) {
    console.error('Error adding event:', error);
    throw error;
  }
};

export const getEvents = async () => {
  try {
    const response = await instance.get('/eventi');
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export default instance;
