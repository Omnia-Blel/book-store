// frontend/src/services/api.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Gestion des erreurs globale
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const articlesAPI = {
  // Récupérer tous les articles
  getAll: async () => {
    const response = await api.get('/articles');
    return response.data;
  },

  // Récupérer un article par ID
  getById: async (id) => {
    const response = await api.get(`/articles/${id}`);
    return response.data;
  },

  // Créer un nouvel article
  create: async (articleData) => {
    const response = await api.post('/articles', articleData);
    return response.data;
  },

  // Mettre à jour un article
  update: async (id, articleData) => {
    const response = await api.put(`/articles/${id}`, articleData);
    return response.data;
  },

  // Supprimer un article
  delete: async (id) => {
    const response = await api.delete(`/articles/${id}`);
    return response.data;
  },
};

export default api;