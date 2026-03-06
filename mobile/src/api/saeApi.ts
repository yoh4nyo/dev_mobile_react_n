import axios from 'axios';
import type { Sae, SaeCreatePayload } from '../types/sae';

const BASE_URL = 'http://localhost:8080/api/saes';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const getSaes = async (): Promise<Sae[]> => {
  try {
    const response = await api.get<Sae[]>('');
    return response.data;
  } catch (error) {
    console.error('Erreur récupération SAés:', error);
    throw error;
  }
};

export const getSaesByAnnee = async (annee: number): Promise<Sae[]> => {
  try {
    const response = await api.get<Sae[]>(`/annee/${annee}`);
    return response.data;
  } catch (error) {
    console.error('Erreur filtrage année:', error);
    throw error;
  }
};

export const addSae = async (saeData: SaeCreatePayload): Promise<Sae> => {
  try {
    const response = await api.post<Sae>('', saeData);
    return response.data;
  } catch (error) {
    console.error('Erreur ajout SAé:', error);
    throw error;
  }
};

export default api;