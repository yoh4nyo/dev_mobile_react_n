import axios from 'axios';

// Utilise ton adresse IP locale (ex: 192.168.x.x) pour que l'app mobile puisse
// joindre le serveur Spring Boot qui tourne sur le PC.
// Pour l'émulateur iOS, localhost fonctionne souvent. Pour Android, utiliser 10.0.2.2 
// ou l'IP réseau de l'ordinateur.
const BASE_URL = 'http://localhost:8080/api/saes';

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});

export const getSaes = async () => {
    try {
        const response = await api.get('');
        return response.data;
    } catch (error) {
        console.error("Erreur récupération SAés:", error);
        throw error;
    }
};

export const getSaesByAnnee = async (annee) => {
    try {
        const response = await api.get(`/annee/${annee}`);
        return response.data;
    } catch (error) {
        console.error("Erreur filtrage année:", error);
        throw error;
    }
};

export const getSaesByDomaine = async (domaine) => {
    try {
        const response = await api.get(`/domaine/${domaine}`);
        return response.data;
    } catch (error) {
        console.error("Erreur filtrage domaine:", error);
        throw error;
    }
};

export const addSae = async (saeData) => {
    try {
        const response = await api.post('', saeData);
        return response.data;
    } catch (error) {
        console.error("Erreur ajout SAé:", error);
        throw error;
    }
};

export default api;
