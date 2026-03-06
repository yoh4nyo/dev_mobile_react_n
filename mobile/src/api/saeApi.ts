import axios from 'axios';

const BASE_URL =
  process.env.EXPO_PUBLIC_API_URL?.trim() || 'http://localhost:8080/api/saes';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const getSaes = async () => {
  try {
    const response = await api.get('');
    return response.data;
  } catch (error) {
    console.error('Erreur récupération SAés:', error);
    throw error;
  }
};

export const getSaesByAnnee = async (annee: number) => {
  try {
    const response = await api.get(`/annee/${annee}`);
    return response.data;
  } catch (error) {
    console.error('Erreur filtrage année:', error);
    throw error;
  }
};

export const addSae = async (saeData: any) => {
  try {
    const response = await api.post('', saeData);
    return response.data;
  } catch (error) {
    console.error('Erreur ajout SAé:', error);
    throw error;
  }
};

export default api;