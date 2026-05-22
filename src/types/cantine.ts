export interface Produit {
  id: string;
  nom: string;
  prix: number;
  description?: string;
  disponible: boolean;
}

export type PlanType = 'basique' | 'pro' | 'boost';
export type StatutType = 'actif' | 'inactif' | 'expire';

export interface Cantine {
  id: string;
  nom: string;
  categorie: string;
  plan: PlanType;
  statut: StatutType;
  enVedette: boolean;
  vendeur: {
    nom: string;
    whatsapp: string;
  };
  description: string;
  photo?: string;
  localisation: string;
  dateDebut: string;
  dateFin: string;
  produits: Produit[];
  note: number;
  createdAt: string;
}

export const CATEGORIES = [
  'Alimentation & Épicerie',
  'Vêtements & Mode',
  'Électronique',
  'Maison & Déco',
  'Beauté & Santé',
  'Services',
  'Artisanat & Bijoux',
  'Téléphonie',
  'Autres',
];

export const PLANS: Record<PlanType, { label: string; prix: number; color: string }> = {
  basique: { label: 'Basique',  prix: 5000,  color: 'blue'   },
  pro:     { label: 'PRO',      prix: 10000, color: 'yellow' },
  boost:   { label: 'Pub Boost',prix: 25000, color: 'orange' },
};
