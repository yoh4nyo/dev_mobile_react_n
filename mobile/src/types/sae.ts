export interface Sae {
  idSae: number;
  nom: string;
  contexte?: string | null;
  semestre: number;
  annee: number;
  referent?: string | null;
  dateDebut?: string | null;
  dateFin?: string | null;
  tauxReussite?: string | null;
}

export type SaeCreatePayload = Omit<Sae, 'idSae'>;