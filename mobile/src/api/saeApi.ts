import axios from 'axios';

// url de base de l'api
const BASE_URL =
  process.env.EXPO_PUBLIC_API_URL?.trim() || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// recuperer toutes les SAE
export const getSaes = async () => {
  const res = await api.get('/saes');
  return res.data;
};

// recuperer les SAE d une annee
export const getSaesByAnnee = async (annee: number) => {
  const res = await api.get(`/saes/annee/${annee}`);
  return res.data;
};

// ajouter une SAE
export const addSae = async (saeData: any) => {
  const res = await api.post('/saes', saeData);
  return res.data;
};

// supprimer une SAE
export const deleteSae = async (id: number) => {
  await api.delete(`/saes/${id}`);
};

// recuperer toutes les UE
export const getUes = async () => {
  const res = await api.get('/ues');
  return res.data;
};

export default api;