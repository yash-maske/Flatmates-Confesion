import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api/user',
});

export const loginUser = (credentials) => API.post('/login', credentials);
export const fetchAllMessages = () => API.get('/all');
export const sendMessage = (data) => API.post('/confess', data);
