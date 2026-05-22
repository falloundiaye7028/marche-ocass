"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search, Store, ShoppingBag, Star, TrendingUp, Shield,
  Megaphone, CheckCircle, X, Phone, MapPin, Tag, Users,
  Sparkles, Crown, Zap, ArrowRight, Package, BadgeCheck,
  Clock, Heart, Eye
} from "lucide-react";

// ── Données ────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "alimentation", label: "Alimentation",    emoji: "🥗", count: 124 },
  { id: "vetements",    label: "Vêtements",        emoji: "👗", count: 87  },
  { id: "electronique", label: "Électronique",     emoji: "📱", count: 63  },
  { id: "maison",       label: "Maison & Déco",    emoji: "🏠", count: 51  },
  { id: "beaute",       label: "Beauté & Santé",   emoji: "💄", count: 45  },
  { id: "services",     label: "Services",          emoji: "🔧", count: 38  },
  { id: "chaussures",   label: "Chaussures",        emoji: "👟", count: 29  },
  { id: "autres",       label: "Autres",            emoji: "📦", count: 72  },
];

const CANTINES = [
  {
    id: 1, nom: "Boutique Fatou Diop", categorie: "Vêtements & Textile",
    description: "Mode sénégalaise haut de gamme — bazin, wax, tissus et tenues sur mesure.",
    produits: 48, note: 4.9, avis: 124, badge: "VIP", sponsor: true, emoji: "👗", couleur: "#0e7d52",
  },
  {
    id: 2, nom: "Épicerie Al Amine", categorie: "Alimentation",
    description: "Produits locaux et importés, épices de qualité, légumes frais. Livraison Touba.",
    produits: 130, note: 4.7, avis: 89, badge: "VÉRIFIÉ", sponsor: true, emoji: "🥗", couleur: "#ff7a2a",
  },
  {
    id: 3, nom: "Tech Mobile Touba", categorie: "Électronique & Téléphones",
    description: "Smartphones, accessoires, réparation rapide. Meilleurs prix garantis.",
    produits: 72, note: 4.8, avis: 57, badge: "TOP VENDEUR", sponsor: true, emoji: "📱", couleur: "#1d4ed8",
  },
  {
    id: 4, nom: "Maison Déco Sénégal", categorie: "Maison & Décoration",
    description: "Tapis, rideaux, artisanat sénégalais, mobilier. Sublimez votre intérieur.",
    produits: 35, note: 4.6, avis: 41, badge: null, sponsor: false, emoji: "🏠", couleur: "#7c3aed",
  },
  {
    id: 5, nom: "Pharmacie Touba Santé", categorie: "Santé & Beauté",
    description: "Produits de santé, cosmétiques naturels, soins africains traditionnels.",
    produits: 55, note: 4.9, avis: 63, badge: "VÉRIFIÉ", sponsor: false, emoji: "💊", couleur: "#dc2626",
  },
  {
    id: 6, nom: "Chaussures & Style", categorie: "Chaussures",
    description: "Sandales, baskets, chaussures habillées — toutes les pointures disponibles.",
    produits: 44, note: 4.5, avis: 38, badge: null, sponsor: false, emoji: "👟", couleur: "#b45309",
  },
];

const PRODUITS = [
  { id: 1, nom: "Bazin Riche 5m",         prix: 35000, cantine: "Boutique Fatou Diop",    cat: "vetements",    emoji: "👘", vues: 210 },
  { id: 2, nom: "Smartphone Samsung A15", prix: 89000, cantine: "Tech Mobile Touba",        cat: "electronique", emoji: "📱", vues: 340 },
  { id: 3, nom: "Sac de riz 25kg",         prix: 16000, cantine: "Épicerie Al Amine",        cat: "alimentation", emoji: "🌾", vues: 180 },
  { id: 4, nom: "Tapis prière brodé",      prix: 12000, cantine: "Maison Déco Sénégal",     cat: "maison",       emoji: "🧶", vues: 95  },
  { id: 5, nom: "Parfum Oud Al Shams",     prix: 22000, cantine: "Boutique Fatou Diop",    cat: "beaute",       emoji: "✨", vues: 156 },
  { id: 6, nom: "Écouteurs Bluetooth",     prix: 8500,  cantine: "Tech Mobile Touba",        cat: "electronique", emoji: "🎧", vues: 88  },
  { id: 7, nom: "Huile de Coco 500ml",     prix: 3500,  cantine: "Épicerie Al Amine",        cat: "alimentation", emoji: "🥥", vues: 67  },
  { id: 8, nom: "Boubou Homme Luxe",       prix: 45000, cantine: "Boutique Fatou Diop",    cat: "vetements",    emoji: "🧥", vues: 122 },
];

const PLANS = [
  {
    id: "starter", nom: "STARTER", prix: 5000, couleurBadge: "#0e7d52", bg: "#f0faf4",
    description: "Pour débuter sur MARCHÉ OCASS",
    avantages: ["1 cantine active","Jusqu'à 20 produits listés","Profil vendeur basique","Apparition dans les résultats","Contact WhatsApp intégré","Support par email"],
    desavantages: ["Pas de mise en avant","Pas de badge vérifié"],
    btnStyle: "btn-primary", badge: null,
  },
  {
    id: "pro", nom: "PRO", prix: 10000, couleurBadge: "#b86e00", bg: "#fffbea",
    description: "Visibilité maximale sur le portail",
    avantages: ["Cantine en vedette (page d'accueil)","Jusqu'à 100 produits listés","Badge ✓ VÉRIFIÉ affiché","Priorité dans les résultats","Fiche enrichie avec photos","Contact WhatsApp + téléphone direct","Statistiques de visites","Support prioritaire 7j/7"],
    desavantages: [],
    btnStyle: "btn-gold", badge: "POPULAIRE",
  },
  {
    id: "boost", nom: "PUB BOOST", prix: null, couleurBadge: "#e04a00", bg: "#fff4ed",
    description: "Promotion via les canaux ATV",
    avantages: ["Post sponsorisé TikTok ATV (15K+)","Story & Réel Instagram ciblé Touba","Diffusion WhatsApp (5 000+ abonnés)","Visuel publicitaire créé par ATV","Campagne Facebook Ads géo-ciblée","Rapport de performance inclus"],
    desavantages: [],
    btnStyle: "btn-orange", badge: "SUR DEVIS",
  },
];

const TEMOIGNAGES = [
  { nom: "Moustapha Ndiaye", role: "Épicerie Al Amine", texte: "Mes ventes ont doublé en 2 mois. Les clients de la diaspora commandent maintenant depuis l'étranger !", note: 5, mois: "Mars 2025" },
  { nom: "Astou Diallo", role: "Mode Touba Fashion", texte: "Le plan PRO vaut son prix. Ma cantine est en tête des résultats et j'ai 3× plus de contacts depuis.", note: 5, mois: "Avril 2025" },
  { nom: "Ibrahima Seck", role: "Tech & Accessoires", texte: "Le PUB BOOST via les réseaux ATV m'a rapporté des ventes en 48h. ROI exceptionnel.", note: 5, mois: "Février 2025" },
];

// ── Page ──────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [recherche, setRecherche] = useState("");
  const [catActive, setCatActive] = useState("tous");
  const [showModal, setShowModal] = useState(false);
  const [planChoisi, setPlanChoisi] = useState<string | null>(null);
  const [favoris, setFavoris] = useState<number[]>([]);

  const ouvrirModal = (plan: string) => { setPlanChoisi(plan); setShowModal(true); };
  const toggleFavori = (id: number) => setFavoris(p => p.includes(id) ? p.filter(f => f !== id) : [...p, id]);
  const produitsFiltres = catActive === "tous" ? PRODUITS : PRODUITS.filter(p => p.cat === catActive);

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#042c1d 0%,#07402b 35%,#0a6342 65%,#1d9c68 100%)", minHeight: 500 }}
      >
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l5 10 11 0-9 8 3 11-10-7-10 7 3-11-9-8 11 0z' fill='%23ffffff'/%3E%3C/svg%3E")`, backgroundSize: "60px 60px" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest border mb-6"
            style={{ background: "rgba(255,200,0,0.15)", borderColor: "rgba(255,200,0,0.4)", color: "#ffc800" }}>
            <Sparkles size={13} /> Portail commercial de Touba
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 leading-none" style={{ fontFamily: "'Syne',sans-serif" }}>
            MARCHÉ <span style={{ WebkitTextStroke: "2px #ffc800", color: "transparent" }}>OCASS</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto" style={{ color: "#b3e5c8" }}>
            Ouvrez votre cantine en ligne — vendez à Touba et partout au Sénégal
          </p>

          {/* Barre de recherche */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex items-center bg-white rounded-2xl shadow-2xl overflow-hidden">
              <Search className="ml-5 text-gray-400 flex-shrink-0" size={20} />
              <input
                type="text" value={recherche} onChange={e => setRecherche(e.target.value)}
                placeholder="Rechercher un produit, une cantine, une catégorie..."
                className="flex-1 px-4 py-4 text-gray-900 focus:outline-none text-base"
              />
              <button className="m-2 px-6 py-3 rounded-xl font-bold text-gray-900 text-sm flex-shrink-0"
                style={{ background: "linear-gradient(135deg,#ffc800,#ff7a2a)" }}>
                Rechercher
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { val: "240+",   label: "Cantines actives",  icon: <Store size={16} /> },
              { val: "3 800+", label: "Produits listés",   icon: <ShoppingBag size={16} /> },
              { val: "12 000+",label: "Clients / mois",    icon: <Users size={16} /> },
              { val: "5 000F", label: "Tarif mensuel",     icon: <Tag size={16} /> },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="flex items-center justify-center gap-1.5 text-xs mb-1" style={{ color: "#45b485" }}>
                  {s.icon} {s.label}
                </div>
                <div className="font-black text-white text-2xl md:text-3xl" style={{ fontFamily: "'Syne',sans-serif" }}>
                  {s.val}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg viewBox="0 0 1200 50" className="w-full h-8 fill-white"><path d="M0,50 C400,0 800,0 1200,50 L1200,50 L0,50 Z" /></svg>
        </div>
      </section>

      {/* ── BANNIÈRE VENDEUR ──────────────────────────────────────────── */}
      <div className="bg-white py-5 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm md:text-base">
            <strong className="text-vert-700">Vous vendez à Touba ?</strong> Ouvrez votre cantine dès aujourd&apos;hui pour seulement <strong>5 000 FCFA/mois</strong>
          </p>
          <button onClick={() => ouvrirModal("starter")} className="btn-primary whitespace-nowrap">
            <Store size={16} /> Ouvrir ma cantine
          </button>
        </div>
      </div>

      {/* ── CATÉGORIES ────────────────────────────────────────────────── */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-title text-center mb-8">Toutes les catégories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
            {CATEGORIES.map(cat => (
              <button key={cat.id}
                onClick={() => setCatActive(cat.id === catActive ? "tous" : cat.id)}
                className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${
                  catActive === cat.id ? "border-vert-600 bg-vert-50 shadow-md" : "border-gray-100 bg-white hover:border-vert-300"
                }`}
              >
                <span className="text-3xl">{cat.emoji}</span>
                <span className="text-xs font-semibold text-gray-700 text-center leading-tight">{cat.label}</span>
                <span className="text-xs text-gray-400">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── CANTINES EN VEDETTE ───────────────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Crown size={18} className="text-or-500" />
                <span className="text-xs font-bold uppercase tracking-widest text-or-600">Cantines en vedette</span>
              </div>
              <h2 className="section-title">Les meilleures boutiques</h2>
            </div>
            <Link href="/cantines" className="hidden md:flex items-center gap-1 text-vert-700 font-semibold text-sm hover:text-vert-600">
              Voir toutes <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CANTINES.map(c => (
              <div key={c.id} className="card hover:shadow-lg transition-all duration-300 overflow-hidden group">
                <div className="h-24 flex items-center justify-center relative" style={{ background: `${c.couleur}15` }}>
                  <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{c.emoji}</span>
                  {c.sponsor && (
                    <span className="absolute top-3 right-3 text-white text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ background: "linear-gradient(135deg,#ffc800,#ff7a2a)" }}>SPONSORISÉ</span>
                  )}
                </div>
                <div className="p-4">
                  {c.badge && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full mb-2"
                      style={{ background: `${c.couleur}15`, color: c.couleur }}>
                      <BadgeCheck size={10} /> {c.badge}
                    </span>
                  )}
                  <h3 className="font-bold text-gray-900 text-base mb-1">{c.nom}</h3>
                  <p className="text-xs text-gray-500 mb-2">{c.categorie}</p>
                  <p className="text-xs text-gray-600 leading-relaxed mb-3 line-clamp-2">{c.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Star size={12} className="text-or-400 fill-or-400" />
                      <strong className="text-gray-700">{c.note}</strong> ({c.avis} avis)
                    </span>
                    <span className="flex items-center gap-1"><Package size={12} /> {c.produits} produits</span>
                  </div>
                  <button className="w-full btn-outline text-xs py-2">Voir la cantine</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUITS POPULAIRES ───────────────────────────────────────── */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={18} className="text-vert-600" />
                <span className="text-xs font-bold uppercase tracking-widest text-vert-700">Produits du moment</span>
              </div>
              <h2 className="section-title">Produits populaires</h2>
            </div>
            <div className="hidden md:flex gap-2">
              {["tous","alimentation","vetements","electronique"].map(c => (
                <button key={c} onClick={() => setCatActive(c)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    catActive === c ? "bg-vert-700 text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-vert-400"
                  }`}>
                  {c === "tous" ? "Tous" : CATEGORIES.find(cat => cat.id === c)?.label ?? c}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {produitsFiltres.map(p => (
              <div key={p.id} className="card hover:shadow-md transition-all overflow-hidden group">
                <div className="h-36 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative">
                  <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{p.emoji}</span>
                  <button onClick={() => toggleFavori(p.id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:scale-110 transition-all">
                    <Heart size={14} className={favoris.includes(p.id) ? "fill-red-500 text-red-500" : "text-gray-300"} />
                  </button>
                </div>
                <div className="p-3">
                  <p className="text-xs text-vert-600 font-semibold mb-1 truncate">{p.cantine}</p>
                  <h3 className="font-bold text-gray-900 text-sm mb-2 leading-tight">{p.nom}</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-black text-vert-700 text-base">{p.prix.toLocaleString("fr-SN")} F</span>
                    <span className="flex items-center gap-1 text-xs text-gray-400"><Eye size={11} /> {p.vues}</span>
                  </div>
                  <button className="w-full mt-3 bg-vert-50 hover:bg-vert-100 text-vert-700 font-semibold text-xs py-2 rounded-xl transition-colors flex items-center justify-center gap-1">
                    <Phone size={12} /> Contacter
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5 ÉTAPES ─────────────────────────────────────────────────── */}
      <section className="py-16" style={{ background: "linear-gradient(135deg,#042c1d,#07402b,#0a6342)" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3" style={{ fontFamily: "'Syne',sans-serif" }}>
              Ouvrez votre cantine en 5 étapes
            </h2>
            <p className="text-lg" style={{ color: "#7dcfaa" }}>Simple, rapide — commencez à vendre aujourd&apos;hui</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { num:"01", titre:"S'inscrire",       desc:"Créez votre compte vendeur gratuitement en 2 minutes.", icon:"✍️" },
              { num:"02", titre:"Choisir un plan",  desc:"Starter 5 000F ou Pro 10 000F selon vos besoins.", icon:"💳" },
              { num:"03", titre:"Créer votre cantine", desc:"Personnalisez votre boutique — nom, description, logo.", icon:"🏪" },
              { num:"04", titre:"Ajouter vos produits", desc:"Listez vos articles avec photos, prix et description.", icon:"📦" },
              { num:"05", titre:"Recevoir des clients", desc:"Vos produits sont visibles — les clients vous contactent.", icon:"🎉" },
            ].map(e => (
              <div key={e.num} className="text-center">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg text-3xl"
                  style={{ background: "linear-gradient(135deg,#ffc800,#ff7a2a)" }}>{e.icon}</div>
                <div className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: "#ffc800" }}>{e.num}</div>
                <h3 className="text-white font-bold text-sm mb-2">{e.titre}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "#45b485" }}>{e.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button onClick={() => ouvrirModal("starter")} className="btn-gold text-base px-10 py-4">
              <Store size={20} /> Ouvrir ma cantine maintenant
            </button>
            <p className="text-sm mt-3" style={{ color: "#1d9c68" }}>Paiement via Wave, Orange Money ou espèces</p>
          </div>
        </div>
      </section>

      {/* ── PLANS & TARIFS ────────────────────────────────────────────── */}
      <section className="py-16 bg-white" id="tarifs">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Tag size={18} className="text-vert-600" />
              <span className="text-xs font-bold uppercase tracking-widest text-vert-700">Tarifs & abonnements</span>
            </div>
            <h2 className="section-title mb-3">Choisissez votre plan</h2>
            <p className="section-subtitle max-w-xl mx-auto">Commencez à 5 000 F/mois — sans commission sur vos ventes</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PLANS.map(plan => (
              <div key={plan.id}
                className={`relative rounded-2xl border-2 p-6 transition-all duration-300 hover:shadow-xl ${
                  plan.id === "pro" ? "shadow-2xl scale-105 border-or-400" : plan.id === "boost" ? "border-orange-500 shadow-sm" : "border-vert-600 shadow-sm"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 rounded-full text-xs font-black text-white shadow"
                      style={{ background: plan.id === "pro" ? "linear-gradient(135deg,#ffc800,#ff7a2a)" : "linear-gradient(135deg,#ff7a2a,#e04a00)" }}>
                      {plan.badge}
                    </span>
                  </div>
                )}
                <div className="inline-block px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest mb-3"
                  style={{ background: plan.bg, color: plan.couleurBadge }}>
                  {plan.nom}
                </div>
                <div className="mb-2">
                  {plan.prix
                    ? <div className="flex items-end gap-1">
                        <span className="text-4xl font-black text-gray-900" style={{ fontFamily: "'Syne',sans-serif" }}>{plan.prix.toLocaleString("fr-SN")}</span>
                        <span className="text-gray-500 text-sm mb-1">F CFA/mois</span>
                      </div>
                    : <div className="text-3xl font-black text-gray-900" style={{ fontFamily: "'Syne',sans-serif" }}>Sur devis</div>
                  }
                </div>
                <p className="text-gray-500 text-sm mb-5">{plan.description}</p>
                <ul className="space-y-2.5 mb-6">
                  {plan.avantages.map(av => (
                    <li key={av} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle size={14} className="text-vert-600 flex-shrink-0 mt-0.5" /> {av}
                    </li>
                  ))}
                  {plan.desavantages.map(d => (
                    <li key={d} className="flex items-start gap-2 text-sm text-gray-400">
                      <X size={14} className="text-gray-300 flex-shrink-0 mt-0.5" /> {d}
                    </li>
                  ))}
                </ul>
                <button onClick={() => ouvrirModal(plan.id)} className={`w-full ${plan.btnStyle} justify-center`}>
                  {plan.id === "boost" ? <><Megaphone size={15} /> Demander un devis</> : <><Zap size={15} /> Choisir {plan.nom}</>}
                </button>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm mt-8">Pas de commission · Annulation mensuelle · Paiement local accepté</p>
        </div>
      </section>

      {/* ── PUB BOOST ─────────────────────────────────────────────────── */}
      <section className="py-16 bg-gray-50" id="pub-boost">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Megaphone size={20} className="text-orange-500" />
                <span className="text-xs font-bold uppercase tracking-widest text-orange-600">Service Premium</span>
              </div>
              <h2 className="section-title mb-4">
                Boostez votre cantine<br />
                <span className="text-orange-500">via nos canaux ATV</span>
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Agence Touba Visuel dispose de canaux digitaux actifs avec des milliers d&apos;abonnés ciblés sur Touba et la diaspora.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  { canal:"TikTok ATV",         detail:"Vidéo dédiée — portée organique massive",         emoji:"📱", badge:"15K+" },
                  { canal:"Instagram ATV",       detail:"Story + Réel sponsorisé géo-ciblé Touba",        emoji:"📸", badge:"8K+"  },
                  { canal:"WhatsApp Broadcast",  detail:"Message direct à +5 000 abonnés qualifiés",      emoji:"💬", badge:"5K+"  },
                  { canal:"Facebook Ads",        detail:"Campagne payante — ville + diaspora sénégalaise", emoji:"🎯", badge:"Ciblé"},
                ].map(c => (
                  <div key={c.canal} className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <span className="text-xl">{c.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-bold text-gray-900 text-sm">{c.canal}</span>
                        <span className="text-xs text-vert-600 font-bold bg-vert-50 px-2 py-0.5 rounded-full">{c.badge}</span>
                      </div>
                      <p className="text-xs text-gray-500">{c.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => ouvrirModal("boost")} className="btn-orange text-base px-8 py-4">
                <Megaphone size={18} /> Demander une promotion
              </button>
            </div>
            <div className="rounded-3xl p-8 border" style={{ background: "rgba(255,122,42,0.04)", borderColor: "rgba(255,122,42,0.15)" }}>
              <p className="text-orange-600 text-xs font-bold uppercase tracking-widest mb-5">Résultats moyens campagne Boost</p>
              {[
                { label:"Vues sur la cantine",  val:"+850%", sub:"première semaine",          color:"#ff7a2a" },
                { label:"Nouvelles commandes",  val:"+3×",   sub:"vs semaine normale",         color:"#ffc800" },
                { label:"Nouveaux abonnés",     val:"+240",  sub:"en moyenne",                 color:"#0e7d52" },
                { label:"ROI de la campagne",   val:"8–15×", sub:"retour sur investissement",  color:"#1d4ed8" },
              ].map(r => (
                <div key={r.label} className="flex items-center gap-4 mb-4">
                  <div className="text-2xl font-black w-20 text-right flex-shrink-0" style={{ color: r.color, fontFamily: "'Syne',sans-serif" }}>{r.val}</div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{r.label}</p>
                    <p className="text-gray-400 text-xs">{r.sub}</p>
                  </div>
                </div>
              ))}
              <div className="mt-4 p-4 rounded-xl" style={{ background: "rgba(255,200,0,0.1)", border: "1px solid rgba(255,200,0,0.3)" }}>
                <p className="text-sm font-semibold text-gray-800">💡 <strong>Offre combinée :</strong> PRO + Pub Boost mensuel pour une visibilité maximale toute l&apos;année.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TÉMOIGNAGES ───────────────────────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="section-title mb-3">Ils font confiance à MARCHÉ OCASS</h2>
            <p className="section-subtitle">Vendeurs satisfaits qui ont transformé leur business</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TEMOIGNAGES.map(t => (
              <div key={t.nom} className="card p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({length:t.note}).map((_,i) => <Star key={i} size={15} className="text-or-400 fill-or-400" />)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">&ldquo;{t.texte}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ background: "linear-gradient(135deg,#0e7d52,#1d9c68)" }}>
                    {t.nom.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{t.nom}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                  <span className="ml-auto text-xs text-gray-300 flex items-center gap-1"><Clock size={11} /> {t.mois}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ─────────────────────────────────────────────────── */}
      <section className="py-20 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#042c1d 0%,#07402b 50%,#0a6342 100%)" }}>
        <div className="relative max-w-3xl mx-auto px-4">
          <div className="text-6xl mb-6">🏪</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight" style={{ fontFamily: "'Syne',sans-serif" }}>
            Rejoignez<br />MARCHÉ OCASS
          </h2>
          <p className="text-xl mb-8 leading-relaxed" style={{ color: "#b3e5c8" }}>
            Plus de 240 cantines vous attendent. Ouvrez votre boutique en ligne et atteignez des milliers de clients dès aujourd&apos;hui.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => ouvrirModal("starter")} className="btn-gold text-lg px-10 py-4">
              <Store size={22} /> Ouvrir ma cantine — 5 000F/mois
            </button>
            <a href="https://wa.me/221768001717?text=Je%20veux%20ouvrir%20une%20cantine%20sur%20MARCH%C3%89%20OCASS"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white border-2 hover:bg-white/10 transition-all text-base"
              style={{ borderColor: "rgba(255,255,255,0.3)" }}>
              <Phone size={20} /> Nous contacter
            </a>
          </div>
          <p className="text-sm mt-6" style={{ color: "#1d9c68" }}>Paiement Wave · Orange Money · Espèces · Sans engagement</p>
        </div>
      </section>

      {/* ── MODAL INSCRIPTION ─────────────────────────────────────────── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
          onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="p-6 text-white relative" style={{ background: "linear-gradient(135deg,#07402b,#0a6342)" }}>
              <button onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                <X size={16} className="text-white" />
              </button>
              <Store size={28} className="mb-3" style={{ color: "#ffc800" }} />
              <h3 className="text-xl font-black mb-1">
                {planChoisi === "boost" ? "Demande de promotion" : "Ouvrir ma cantine"}
              </h3>
              <p className="text-sm" style={{ color: "#7dcfaa" }}>
                {planChoisi === "starter" && "Plan STARTER — 5 000 F CFA / mois"}
                {planChoisi === "pro"     && "Plan PRO — 10 000 F CFA / mois"}
                {planChoisi === "boost"   && "Service PUB BOOST — tarif sur devis"}
              </p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nom du vendeur / responsable</label>
                <input type="text" placeholder="Votre nom complet" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nom de votre cantine</label>
                <input type="text" placeholder="Ex: Boutique Al Amine" className="input-field" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Téléphone (WhatsApp)</label>
                  <input type="tel" placeholder="+221 XX XXX XX XX" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Catégorie</label>
                  <select className="input-field">
                    {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.emoji} {c.label}</option>)}
                  </select>
                </div>
              </div>
              {planChoisi === "boost" && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Décrivez votre besoin</label>
                  <textarea rows={3} placeholder="Ex: promotion sur TikTok et WhatsApp pour ma boutique..." className="input-field resize-none" />
                </div>
              )}
              <div className="bg-vert-50 rounded-xl p-3 border border-vert-100">
                <p className="text-xs text-vert-700 font-semibold flex items-center gap-2">
                  <Shield size={13} /> Un conseiller vous contactera dans les 24h.
                </p>
              </div>
              <a href={`https://wa.me/221768001717?text=Bonjour%2C%20je%20veux%20ouvrir%20une%20cantine%20sur%20MARCH%C3%89%20OCASS%20(plan%20${planChoisi?.toUpperCase()})`}
                target="_blank"
                className="btn-primary w-full justify-center text-base py-3"
                onClick={() => setShowModal(false)}>
                <ArrowRight size={18} /> Envoyer ma demande via WhatsApp
              </a>
              <p className="text-center text-xs text-gray-400">Ou appelez le <strong>+221 76 800 17 17</strong></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
