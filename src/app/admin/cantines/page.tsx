'use client';
import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminNav from '@/components/admin/AdminNav';
import { getCantines, isAuth, daysLeft, removeCantine, renewCantine, formatPrice } from '@/lib/store';
import { Cantine, PlanType, StatutType } from '@/types/cantine';
import { Plus, Search, Edit2, Trash2, RefreshCw, MessageCircle, Filter } from 'lucide-react';

type FilterPlan   = PlanType | 'tous';
type FilterStatut = StatutType | 'tous';

export default function CantinesPage() {
  const router = useRouter();
  const [cantines, setCantines] = useState<Cantine[]>([]);
  const [query,    setQuery]    = useState('');
  const [fPlan,    setFPlan]    = useState<FilterPlan>('tous');
  const [fStatut,  setFStatut]  = useState<FilterStatut>('tous');
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = () => setCantines(getCantines());

  useEffect(() => {
    if (!isAuth()) { router.replace('/admin'); return; }
    load();
  }, [router]);

  const filtered = useMemo(() => cantines.filter(c => {
    const q = query.toLowerCase();
    const matchQ = !q || c.nom.toLowerCase().includes(q) || c.vendeur.nom.toLowerCase().includes(q) || c.localisation.toLowerCase().includes(q);
    const matchP = fPlan   === 'tous' || c.plan   === fPlan;
    const matchS = fStatut === 'tous' || c.statut === fStatut;
    return matchQ && matchP && matchS;
  }), [cantines, query, fPlan, fStatut]);

  const handleDelete = (id: string) => {
    if (deleting === id) {
      removeCantine(id);
      setDeleting(null);
      load();
    } else {
      setDeleting(id);
      setTimeout(() => setDeleting(d => d === id ? null : d), 3000);
    }
  };

  const handleRenew = (id: string) => { renewCantine(id); load(); };

  const whatsappMsg = (c: Cantine) => {
    const jours = daysLeft(c.dateFin);
    const prix  = c.plan === 'pro' ? '10 000 F' : c.plan === 'boost' ? '25 000 F' : '5 000 F';
    const txt = `Assalamu Alaikum ${c.vendeur.nom} 🙏\n\nVotre cantine *${c.nom}* expire dans *${jours} jour(s)*. Renouvellement ${c.plan.toUpperCase()} : *${prix}*.\n\nMerci ! MARCHÉ OCASS 🌙`;
    return `https://wa.me/${c.vendeur.whatsapp}?text=${encodeURIComponent(txt)}`;
  };

  return (
    <div className="flex min-h-screen">
      <AdminNav />

      <main className="flex-1 lg:ml-60 p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 mt-10 lg:mt-0">
            <div>
              <h1 className="text-2xl font-black text-white">Cantines</h1>
              <p className="text-gray-500 text-sm">{cantines.length} cantine{cantines.length !== 1 ? 's' : ''} au total</p>
            </div>
            <Link
              href="/admin/cantines/nouvelle"
              className="inline-flex items-center gap-2 bg-[#0a6342] hover:bg-[#0e7d52] text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-[#0a6342]/25"
            >
              <Plus size={16} /> Nouvelle cantine
            </Link>
          </div>

          {/* Filtres */}
          <div className="bg-[#141a22] border border-white/5 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Rechercher (nom, vendeur, lieu…)"
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full bg-[#0b0f14] text-white border border-white/8 rounded-xl pl-10 pr-4 py-2.5 text-sm
                           focus:outline-none focus:border-[#ffc800]/40 placeholder:text-gray-600 transition-all"
              />
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Filter size={15} className="text-gray-500" />
              <select
                value={fPlan}
                onChange={e => setFPlan(e.target.value as FilterPlan)}
                className="bg-[#0b0f14] text-gray-300 border border-white/8 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#ffc800]/40"
              >
                <option value="tous">Tous les plans</option>
                <option value="basique">Basique</option>
                <option value="pro">PRO</option>
                <option value="boost">Pub Boost</option>
              </select>
              <select
                value={fStatut}
                onChange={e => setFStatut(e.target.value as FilterStatut)}
                className="bg-[#0b0f14] text-gray-300 border border-white/8 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#ffc800]/40"
              >
                <option value="tous">Tous les statuts</option>
                <option value="actif">Actif</option>
                <option value="inactif">Inactif</option>
                <option value="expire">Expiré</option>
              </select>
            </div>
          </div>

          {/* Table */}
          {filtered.length === 0 ? (
            <div className="bg-[#141a22] border border-white/5 rounded-2xl p-16 text-center">
              <p className="text-gray-500">Aucune cantine trouvée.</p>
              <Link href="/admin/cantines/nouvelle" className="text-[#ffc800] text-sm hover:underline mt-2 inline-block">
                + Créer une cantine
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map(c => {
                const jrs   = daysLeft(c.dateFin);
                const urgent = c.statut === 'actif' && jrs <= 7;
                return (
                  <div
                    key={c.id}
                    className={`bg-[#141a22] border rounded-2xl p-5 transition-all
                      ${urgent ? 'border-orange-500/30' : 'border-white/5'}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      {/* Infos principales */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-white font-bold text-base">{c.nom}</h3>
                          {c.enVedette && (
                            <span className="text-xs bg-[#ffc800]/15 text-[#ffc800] px-2 py-0.5 rounded-full font-bold">⭐ VEDETTE</span>
                          )}
                          <PlanBadge plan={c.plan} />
                          <StatutBadge statut={c.statut} jours={jrs} />
                        </div>

                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-400">
                          <span>📂 {c.categorie}</span>
                          <span>📍 {c.localisation}</span>
                          <span>👤 {c.vendeur.nom}</span>
                          <span className="text-emerald-400">📱 {c.vendeur.whatsapp}</span>
                        </div>

                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                          <span>🗓 {c.dateDebut} → {c.dateFin}</span>
                          <span>🛒 {c.produits.length} produit{c.produits.length !== 1 ? 's' : ''}</span>
                          <span>⭐ {c.note}/5</span>
                          <span className="text-[#ffc800] font-semibold">
                            💰 {formatPrice(c.plan === 'pro' ? 10000 : c.plan === 'boost' ? 25000 : 5000)}/mois
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
                        {c.statut === 'actif' && jrs <= 10 && (
                          <a
                            href={whatsappMsg(c)}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 text-xs bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-2 rounded-xl transition-colors font-medium"
                          >
                            <MessageCircle size={13} /> Rappel
                          </a>
                        )}
                        <button
                          onClick={() => handleRenew(c.id)}
                          title="Renouveler +30 jours"
                          className="flex items-center gap-1.5 text-xs bg-sky-700 hover:bg-sky-600 text-white px-3 py-2 rounded-xl transition-colors font-medium"
                        >
                          <RefreshCw size={13} /> +30j
                        </button>
                        <Link
                          href={`/admin/cantines/${c.id}`}
                          className="flex items-center gap-1.5 text-xs bg-[#0a6342] hover:bg-[#0e7d52] text-white px-3 py-2 rounded-xl transition-colors font-medium"
                        >
                          <Edit2 size={13} /> Éditer
                        </Link>
                        <button
                          onClick={() => handleDelete(c.id)}
                          className={`flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl transition-colors font-medium
                            ${deleting === c.id
                              ? 'bg-red-600 text-white animate-pulse'
                              : 'bg-red-500/10 text-red-400 hover:bg-red-500/20'}`}
                        >
                          <Trash2 size={13} />
                          {deleting === c.id ? 'Confirmer?' : 'Supprimer'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function PlanBadge({ plan }: { plan: string }) {
  const cfg = {
    pro:     'bg-[#ffc800]/15 text-[#ffc800]',
    boost:   'bg-orange-400/15 text-orange-400',
    basique: 'bg-sky-400/15 text-sky-400',
  }[plan] ?? 'bg-gray-700 text-gray-400';
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-bold uppercase ${cfg}`}>
      {plan === 'pro' ? 'PRO' : plan === 'boost' ? 'BOOST' : 'Basique'}
    </span>
  );
}

function StatutBadge({ statut, jours }: { statut: string; jours: number }) {
  if (statut === 'actif') {
    const c = jours <= 3 ? 'text-red-400 bg-red-400/10' : jours <= 7 ? 'text-orange-400 bg-orange-400/10' : 'text-emerald-400 bg-emerald-400/10';
    return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c}`}>{jours > 0 ? `J-${jours}` : 'Expire aujourd\'hui'}</span>;
  }
  if (statut === 'expire') return <span className="text-xs px-2 py-0.5 rounded-full font-medium text-red-400 bg-red-400/10">Expiré</span>;
  return <span className="text-xs px-2 py-0.5 rounded-full font-medium text-gray-400 bg-gray-700">Inactif</span>;
}
