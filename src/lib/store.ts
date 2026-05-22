import { Cantine } from '@/types/cantine';

const STORAGE_KEY = 'marche_ocass_cantines';
const AUTH_KEY    = 'marche_ocass_admin';

export const ADMIN_PASSWORD = 'ocass2025';

// ── Auth ────────────────────────────────────────────────────
export const checkPassword = (p: string) => p === ADMIN_PASSWORD;
export const setAuth  = () => typeof window !== 'undefined' && sessionStorage.setItem(AUTH_KEY, '1');
export const clearAuth= () => typeof window !== 'undefined' && sessionStorage.removeItem(AUTH_KEY);
export const isAuth   = () => typeof window !== 'undefined' && sessionStorage.getItem(AUTH_KEY) === '1';

// ── Helpers ─────────────────────────────────────────────────
export const genId = () => Date.now().toString(36) + Math.random().toString(36).slice(2);

export const daysLeft = (dateFin: string): number => {
  const diff = new Date(dateFin).getTime() - Date.now();
  return Math.ceil(diff / 86_400_000);
};

export const addDays = (n: number): string => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().split('T')[0];
};

export const today = () => new Date().toISOString().split('T')[0];

export const formatPrice = (n: number) =>
  n.toLocaleString('fr-FR') + ' F';

// ── Seed data ─────────────────────────────────────────────
const seed: Cantine[] = [
  {
    id: 'c1',
    nom: 'Boutique Élite Touba',
    categorie: 'Vêtements & Mode',
    plan: 'pro',
    statut: 'actif',
    enVedette: true,
    vendeur: { nom: 'Serigne Modou Ba', whatsapp: '221771234567' },
    description: 'Vêtements traditionnels et modernes, qualité supérieure. Boubous, kaftans, bazins brodés.',
    localisation: 'Touba Darou Khoudoss',
    dateDebut: today(),
    dateFin: addDays(28),
    produits: [
      { id: 'p1', nom: 'Boubou grand modèle', prix: 15000, disponible: true },
      { id: 'p2', nom: 'Kaftan brodé',         prix: 25000, disponible: true  },
      { id: 'p3', nom: 'Bazin riche 5m',       prix: 18000, disponible: false },
    ],
    note: 4.8,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'c2',
    nom: 'Épicerie Mouride',
    categorie: 'Alimentation & Épicerie',
    plan: 'basique',
    statut: 'actif',
    enVedette: false,
    vendeur: { nom: 'Fatou Diallo', whatsapp: '221769876543' },
    description: 'Épicerie complète, produits frais et secs, livraison Touba centre.',
    localisation: 'Touba Ndamatou',
    dateDebut: today(),
    dateFin: addDays(5),
    produits: [
      { id: 'p4', nom: 'Riz parfumé 25kg', prix: 12500, disponible: true },
      { id: 'p5', nom: 'Huile Jumbo 5L',   prix: 6000,  disponible: true },
    ],
    note: 4.5,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'c3',
    nom: 'Tech & Phones Touba',
    categorie: 'Téléphonie',
    plan: 'boost',
    statut: 'actif',
    enVedette: true,
    vendeur: { nom: 'Ibrahima Ndiaye', whatsapp: '221775551234' },
    description: 'Smartphones, accessoires, réparations. Toutes marques.',
    localisation: 'Marché Ocass Centre',
    dateDebut: today(),
    dateFin: addDays(22),
    produits: [
      { id: 'p6', nom: 'Samsung A15',         prix: 95000, disponible: true  },
      { id: 'p7', nom: 'Tecno Camon 30',      prix: 120000, disponible: true },
      { id: 'p8', nom: 'Coque iPhone 14',     prix: 3500,  disponible: true  },
    ],
    note: 4.9,
    createdAt: new Date().toISOString(),
  },
];

// ── CRUD ────────────────────────────────────────────────────
export const getCantines = (): Cantine[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw) as Cantine[];
  } catch {
    return [];
  }
};

export const getCantine = (id: string): Cantine | undefined =>
  getCantines().find(c => c.id === id);

export const upsertCantine = (c: Cantine): void => {
  if (typeof window === 'undefined') return;
  const list = getCantines();
  const i = list.findIndex(x => x.id === c.id);
  if (i >= 0) list[i] = c;
  else list.push(c);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};

export const removeCantine = (id: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(getCantines().filter(c => c.id !== id))
  );
};

export const renewCantine = (id: string): void => {
  const c = getCantine(id);
  if (!c) return;
  const base = daysLeft(c.dateFin) > 0 ? c.dateFin : today();
  const d = new Date(base);
  d.setDate(d.getDate() + 30);
  upsertCantine({ ...c, statut: 'actif', dateFin: d.toISOString().split('T')[0] });
};
