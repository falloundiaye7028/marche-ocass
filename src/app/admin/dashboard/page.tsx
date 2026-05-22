'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminNav from '@/components/admin/AdminNav';
import {
  getCantines, isAuth, daysLeft, formatPrice, renewCantine,
} from '@/lib/store';
import { Cantine } from '@/types/cantine';
import {
  CheckCircle2, TrendingUp, AlertTriangle, Banknote,
  Plus, RefreshCw, MessageCircle,
} from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const [cantines, setCantines] = useState<Cantine[]>([]);

  const load = () => setCantines(getCantines());

  useEffect(() => {
    if (!isAuth()) { router.replace('/admin'); return; }
    load();
  }, [router]);

  const actives   = cantines.filter(c => c.statut === 'actif');
  const pro       = cantines.filter(c => c.plan === 'pro' || c.plan === 'boost');
  const expirant  = actives.filter(c => daysLeft(c.dateFin) <= 7);
  const revenus   = actives.reduce((sum, c) =>
    sum + (c.plan === 'pro' ? 10000 : c.plan === 'boost' ? 25000 : 5000), 0);

  const stats = [
    { label: 'Cantines actives',   value: actives.length,                   icon: CheckCircle2,   color: 'text-emerald-400', ring: 'bg-emerald-400/10' },
    { label: 'Plans PRO / Boost',  value: pro.length,                       icon: TrendingUp,     color: 'text-[#ffc800]',   ring: 'bg-[#ffc800]/10'  },
    { label: 'Expirent ≤ 7 jours', value: expirant.length,                  icon: AlertTriangle,  color: 'text-orange-400',  ring: 'bg-orange-400/10' },
    { label: 'Revenu mensuel',     value: formatPrice(revenus),             icon: Banknote,       color: 'text-sky-400',     ring: 'bg-sky-400/10'    },
  ];

  const handleRenew = (id: string) => { renewCantine(id); load(); };

  const whatsappMsg = (c: Cantine) => {
    const jours = daysLeft(c.dateFin);
    const txt = `Assalamu Alaikum ${c.vendeur.nom} 🙏\n\nVotre cantine *${c.nom}* sur MARCHÉ OCASS expire dans *${jours} jour(s)*.\n\nPour renouveler votre abonnement ${c.plan === 'pro' ? 'PRO à 10 000 F' : c.plan === 'boost' ? 'Pub Boost à 25 000 F' : 'Basique à 5 000 F'}, contactez-nous dès maintenant.\n\nMerci de votre confiance ! 🌙✨`;
    return `https://wa.me/${c.vendeur.whatsapp}?text=${encodeURIComponent(txt)}`;
  };

  return (
    <div className="flex min-h-screen">
      <AdminNav />

      <main className="flex-1 lg:ml-60 p-6 lg:p-8">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 mt-10 lg:mt-0">
            <div>
              <h1 className="text-2xl font-black text-white">Tableau de bord</h1>
              <p className="text-gray-500 text-sm mt-0.5">Vue d&apos;ensemble — MARCHÉ OCASS</p>
            </div>
            <Link
              href="/admin/cantines/nouvelle"
              className="inline-flex items-center gap-2 bg-[#0a6342] hover:bg-[#0e7d52] text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-[#0a6342]/25"
            >
              <Plus size={16} /> Nouvelle cantine
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map(({ label, value, icon: Icon, color, ring }) => (
              <div key={label} className="bg-[#141a22] border border-white/5 rounded-2xl p-5">
                <div className={`w-10 h-10 ${ring} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon size={20} className={color} />
                </div>
                <div className="text-2xl font-black text-white leading-none">{value}</div>
                <div className="text-gray-500 text-xs mt-1.5">{label}</div>
              </div>
            ))}
          </div>

          {/* Alerte renouvellements */}
          {expirant.length > 0 && (
            <div className="bg-orange-500/8 border border-orange-500/20 rounded-2xl p-6 mb-8">
              <h2 className="text-orange-400 font-bold flex items-center gap-2 mb-4">
                <AlertTriangle size={18} />
                {expirant.length} cantine{expirant.length > 1 ? 's' : ''} à renouveler
              </h2>
              <div className="space-y-3">
                {expirant.map(c => (
                  <div key={c.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#141a22] rounded-xl px-5 py-4">
                    <div>
                      <p className="text-white font-semibold text-sm">{c.nom}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{c.vendeur.nom} · {c.vendeur.whatsapp}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-orange-400 font-bold text-sm bg-orange-400/10 px-3 py-1 rounded-lg">
                        J-{daysLeft(c.dateFin)}
                      </span>
                      <a
                        href={whatsappMsg(c)}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg transition-colors font-medium"
                      >
                        <MessageCircle size={13} /> WhatsApp
                      </a>
                      <button
                        onClick={() => handleRenew(c.id)}
                        className="flex items-center gap-1.5 text-xs bg-[#0a6342] hover:bg-[#0e7d52] text-white px-3 py-1.5 rounded-lg transition-colors font-medium"
                      >
                        <RefreshCw size={13} /> +30 jours
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cantines récentes */}
          <div className="bg-[#141a22] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white font-bold">Cantines récentes</h2>
              <Link href="/admin/cantines" className="text-[#ffc800] text-sm hover:underline">
                Tout voir →
              </Link>
            </div>

            {cantines.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500 text-sm">
                  Aucune cantine.{' '}
                  <Link href="/admin/cantines/nouvelle" className="text-[#ffc800] hover:underline">
                    Créer la première
                  </Link>
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                {cantines.slice(0, 6).map(c => {
                  const jrs = daysLeft(c.dateFin);
                  return (
                    <Link
                      key={c.id}
                      href={`/admin/cantines/${c.id}`}
                      className="flex items-center justify-between py-3 px-2 rounded-xl hover:bg-white/3 transition-colors group"
                    >
                      <div className="min-w-0">
                        <span className="text-white text-sm font-medium group-hover:text-[#ffc800] transition-colors">{c.nom}</span>
                        <span className="text-gray-500 text-xs ml-2">{c.categorie}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <PlanBadge plan={c.plan} />
                        <StatutBadge statut={c.statut} jours={jrs} />
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

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
    <span className={`text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wide ${cfg}`}>
      {plan === 'pro' ? 'PRO' : plan === 'boost' ? 'BOOST' : 'Basique'}
    </span>
  );
}

function StatutBadge({ statut, jours }: { statut: string; jours: number }) {
  if (statut === 'actif') {
    const color = jours <= 3 ? 'text-red-400 bg-red-400/10' : jours <= 7 ? 'text-orange-400 bg-orange-400/10' : 'text-emerald-400 bg-emerald-400/10';
    return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${color}`}>J-{jours}</span>;
  }
  if (statut === 'expire') return <span className="text-xs px-2 py-0.5 rounded-full font-medium text-red-400 bg-red-400/10">Expiré</span>;
  return <span className="text-xs px-2 py-0.5 rounded-full font-medium text-gray-400 bg-gray-700">Inactif</span>;
}
