'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AdminNav from '@/components/admin/AdminNav';
import CantineForm from '@/components/admin/CantineForm';
import { getCantine, isAuth, removeCantine, daysLeft, renewCantine, formatPrice } from '@/lib/store';
import { Cantine } from '@/types/cantine';
import { ArrowLeft, Trash2, RefreshCw, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function EditCantine() {
  const router  = useRouter();
  const { id }  = useParams<{ id: string }>();
  const [cantine, setCantine] = useState<Cantine | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (!isAuth()) { router.replace('/admin'); return; }
    const c = getCantine(id);
    if (!c) { router.replace('/admin/cantines'); return; }
    setCantine(c);
    setLoading(false);
  }, [id, router]);

  const handleDelete = () => {
    if (confirming) {
      removeCantine(id);
      router.push('/admin/cantines');
    } else {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000);
    }
  };

  const handleRenew = () => {
    renewCantine(id);
    const updated = getCantine(id);
    if (updated) setCantine(updated);
  };

  const whatsappMsg = () => {
    if (!cantine) return '#';
    const jours = daysLeft(cantine.dateFin);
    const prix  = cantine.plan === 'pro' ? '10 000 F' : cantine.plan === 'boost' ? '25 000 F' : '5 000 F';
    const txt = `Assalamu Alaikum ${cantine.vendeur.nom} 🙏\n\nVotre cantine *${cantine.nom}* sur MARCHÉ OCASS expire dans *${jours} jour(s)*.\n\nRenouvellement ${cantine.plan.toUpperCase()} : *${prix}/mois*.\n\nMerci de votre confiance ! 🌙✨\nMARCHÉ OCASS`;
    return `https://wa.me/${cantine.vendeur.whatsapp}?text=${encodeURIComponent(txt)}`;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen">
        <AdminNav />
        <main className="flex-1 lg:ml-60 flex items-center justify-center">
          <span className="w-8 h-8 border-2 border-[#ffc800]/30 border-t-[#ffc800] rounded-full animate-spin" />
        </main>
      </div>
    );
  }

  if (!cantine) return null;

  const jours = daysLeft(cantine.dateFin);
  const revenu = formatPrice(cantine.plan === 'pro' ? 10000 : cantine.plan === 'boost' ? 25000 : 5000);

  return (
    <div className="flex min-h-screen">
      <AdminNav />

      <main className="flex-1 lg:ml-60 p-6 lg:p-8">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-6 mt-10 lg:mt-0">
            <div className="flex items-center gap-4">
              <Link href="/admin/cantines" className="text-gray-500 hover:text-white transition-colors">
                <ArrowLeft size={20} />
              </Link>
              <div>
                <h1 className="text-2xl font-black text-white">{cantine.nom}</h1>
                <p className="text-gray-500 text-sm">{cantine.vendeur.nom} · {cantine.categorie}</p>
              </div>
            </div>
            {/* Quick actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <a
                href={whatsappMsg()}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-2 rounded-xl transition-colors font-medium"
              >
                <MessageCircle size={13} /> WA
              </a>
              <button
                onClick={handleRenew}
                className="flex items-center gap-1.5 text-xs bg-sky-700 hover:bg-sky-600 text-white px-3 py-2 rounded-xl transition-colors font-medium"
              >
                <RefreshCw size={13} /> +30j
              </button>
              <button
                onClick={handleDelete}
                className={`flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl transition-colors font-medium
                  ${confirming ? 'bg-red-600 text-white animate-pulse' : 'bg-red-500/10 text-red-400 hover:bg-red-500/20'}`}
              >
                <Trash2 size={13} />
                {confirming ? 'Confirmer?' : 'Supprimer'}
              </button>
            </div>
          </div>

          {/* Stats rapides */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className={`rounded-2xl p-4 border text-center
              ${jours <= 0 ? 'bg-red-500/10 border-red-500/20' : jours <= 7 ? 'bg-orange-500/10 border-orange-500/20' : 'bg-emerald-500/10 border-emerald-500/20'}`}>
              <div className={`text-2xl font-black ${jours <= 0 ? 'text-red-400' : jours <= 7 ? 'text-orange-400' : 'text-emerald-400'}`}>
                {jours > 0 ? `J-${jours}` : 'Expiré'}
              </div>
              <div className="text-gray-500 text-xs mt-1">Jours restants</div>
            </div>
            <div className="bg-[#141a22] border border-white/5 rounded-2xl p-4 text-center">
              <div className="text-2xl font-black text-[#ffc800]">{cantine.produits.length}</div>
              <div className="text-gray-500 text-xs mt-1">Produits</div>
            </div>
            <div className="bg-[#141a22] border border-white/5 rounded-2xl p-4 text-center">
              <div className="text-2xl font-black text-sky-400">{revenu}</div>
              <div className="text-gray-500 text-xs mt-1">Par mois</div>
            </div>
          </div>

          {/* Form */}
          <CantineForm initial={cantine} />
        </div>
      </main>
    </div>
  );
}
