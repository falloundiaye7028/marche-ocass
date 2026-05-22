'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Cantine, Produit, CATEGORIES, PlanType, StatutType } from '@/types/cantine';
import { upsertCantine, genId, today, addDays } from '@/lib/store';
import { Plus, Trash2, Save, ArrowLeft, Star } from 'lucide-react';

interface Props {
  initial?: Cantine;
}

const emptyProduit = (): Produit => ({
  id: genId(), nom: '', prix: 0, description: '', disponible: true,
});

export default function CantineForm({ initial }: Props) {
  const router  = useRouter();
  const isEdit  = !!initial;

  const [form, setForm] = useState<Cantine>(initial ?? {
    id:          genId(),
    nom:         '',
    categorie:   CATEGORIES[0],
    plan:        'basique',
    statut:      'actif',
    enVedette:   false,
    vendeur:     { nom: '', whatsapp: '' },
    description: '',
    photo:       '',
    localisation:'',
    dateDebut:   today(),
    dateFin:     addDays(30),
    produits:    [],
    note:        5.0,
    createdAt:   new Date().toISOString(),
  });

  const [saving, setSaving] = useState(false);
  const [saved,  setSaved]  = useState(false);

  // ── Helpers ────────────────────────────────────────────
  const set = <K extends keyof Cantine>(k: K, v: Cantine[K]) =>
    setForm(f => ({ ...f, [k]: v }));

  const setVendeur = (k: 'nom' | 'whatsapp', v: string) =>
    setForm(f => ({ ...f, vendeur: { ...f.vendeur, [k]: v } }));

  const updateProduit = (id: string, k: keyof Produit, v: unknown) =>
    setForm(f => ({
      ...f,
      produits: f.produits.map(p => p.id === id ? { ...p, [k]: v } : p),
    }));

  const removeProduit = (id: string) =>
    setForm(f => ({ ...f, produits: f.produits.filter(p => p.id !== id) }));

  const addProduit = () =>
    setForm(f => ({ ...f, produits: [...f.produits, emptyProduit()] }));

  // Auto-set dateFin when plan changes
  const handlePlanChange = (plan: PlanType) => {
    setForm(f => ({
      ...f,
      plan,
      enVedette: plan === 'pro' || plan === 'boost' ? true : f.enVedette,
      dateFin: addDays(30),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise(r => setTimeout(r, 400));
    upsertCantine(form);
    setSaved(true);
    setSaving(false);
    setTimeout(() => router.push('/admin/cantines'), 800);
  };

  // ── Field styles ────────────────────────────────────────
  const input = 'w-full bg-[#0b0f14] text-white border border-white/8 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#ffc800]/40 placeholder:text-gray-600 transition-all';
  const label = 'block text-gray-400 text-sm font-medium mb-2';
  const section = 'bg-[#141a22] border border-white/5 rounded-2xl p-6';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* ── Identité ─────────────────────────────────── */}
      <div className={section}>
        <h2 className="text-white font-bold mb-5 flex items-center gap-2">
          🏪 Identité de la cantine
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className={label}>Nom de la cantine *</label>
            <input required className={input} value={form.nom}
              onChange={e => set('nom', e.target.value)}
              placeholder="Ex : Boutique Élite Touba" />
          </div>
          <div>
            <label className={label}>Catégorie *</label>
            <select required className={input} value={form.categorie}
              onChange={e => set('categorie', e.target.value)}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={label}>Localisation *</label>
            <input required className={input} value={form.localisation}
              onChange={e => set('localisation', e.target.value)}
              placeholder="Ex : Touba Darou Khoudoss" />
          </div>
          <div className="sm:col-span-2">
            <label className={label}>Description</label>
            <textarea rows={3} className={input} value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="Décrivez les produits et services proposés…" />
          </div>
          <div className="sm:col-span-2">
            <label className={label}>URL Photo (optionnel)</label>
            <input className={input} value={form.photo ?? ''}
              onChange={e => set('photo', e.target.value)}
              placeholder="https://…" type="url" />
          </div>
        </div>
      </div>

      {/* ── Vendeur ──────────────────────────────────── */}
      <div className={section}>
        <h2 className="text-white font-bold mb-5">👤 Informations vendeur</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={label}>Nom du vendeur *</label>
            <input required className={input} value={form.vendeur.nom}
              onChange={e => setVendeur('nom', e.target.value)}
              placeholder="Ex : Serigne Modou Ba" />
          </div>
          <div>
            <label className={label}>WhatsApp (avec indicatif) *</label>
            <input required className={input} value={form.vendeur.whatsapp}
              onChange={e => setVendeur('whatsapp', e.target.value)}
              placeholder="221771234567" type="tel" />
          </div>
        </div>
      </div>

      {/* ── Abonnement ───────────────────────────────── */}
      <div className={section}>
        <h2 className="text-white font-bold mb-5">💰 Abonnement</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Plan selector */}
          <div className="sm:col-span-3 grid grid-cols-3 gap-3">
            {(['basique', 'pro', 'boost'] as PlanType[]).map(p => (
              <button
                key={p} type="button"
                onClick={() => handlePlanChange(p)}
                className={`rounded-xl p-4 border text-center transition-all
                  ${form.plan === p
                    ? p === 'pro'   ? 'border-[#ffc800] bg-[#ffc800]/10 shadow-lg shadow-[#ffc800]/10'
                    : p === 'boost' ? 'border-orange-400 bg-orange-400/10'
                    : 'border-sky-400 bg-sky-400/10'
                    : 'border-white/8 hover:border-white/20'}`}
              >
                <div className={`text-lg font-black
                  ${form.plan === p ? (p === 'pro' ? 'text-[#ffc800]' : p === 'boost' ? 'text-orange-400' : 'text-sky-400') : 'text-gray-300'}`}>
                  {p === 'basique' ? '5 000 F' : p === 'pro' ? '10 000 F' : '25 000 F'}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {p === 'basique' ? 'Basique' : p === 'pro' ? 'PRO ⭐' : 'Pub Boost 🚀'}
                </div>
              </button>
            ))}
          </div>

          <div>
            <label className={label}>Statut</label>
            <select className={input} value={form.statut}
              onChange={e => set('statut', e.target.value as StatutType)}>
              <option value="actif">✅ Actif</option>
              <option value="inactif">⏸ Inactif</option>
              <option value="expire">❌ Expiré</option>
            </select>
          </div>
          <div>
            <label className={label}>Date de début</label>
            <input type="date" className={input} value={form.dateDebut}
              onChange={e => set('dateDebut', e.target.value)} />
          </div>
          <div>
            <label className={label}>Date de fin</label>
            <input type="date" className={input} value={form.dateFin}
              onChange={e => set('dateFin', e.target.value)} />
          </div>
          <div>
            <label className={label}>
              Note <Star size={12} className="inline text-[#ffc800]" />
            </label>
            <input type="number" min="1" max="5" step="0.1" className={input}
              value={form.note}
              onChange={e => set('note', parseFloat(e.target.value))} />
          </div>
          <div className="flex items-center gap-3 pt-7">
            <input
              id="vedette" type="checkbox"
              checked={form.enVedette}
              onChange={e => set('enVedette', e.target.checked)}
              className="w-5 h-5 accent-[#ffc800] rounded"
            />
            <label htmlFor="vedette" className="text-gray-300 text-sm cursor-pointer">
              ⭐ Mettre en vedette
            </label>
          </div>
        </div>
      </div>

      {/* ── Produits ─────────────────────────────────── */}
      <div className={section}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-bold">🛒 Produits ({form.produits.length})</h2>
          <button
            type="button" onClick={addProduit}
            className="flex items-center gap-2 text-sm bg-[#0a6342] hover:bg-[#0e7d52] text-white px-4 py-2 rounded-xl transition-colors font-medium"
          >
            <Plus size={14} /> Ajouter
          </button>
        </div>

        {form.produits.length === 0 && (
          <p className="text-gray-500 text-sm text-center py-4">
            Aucun produit — cliquez sur &quot;Ajouter&quot; pour commencer
          </p>
        )}

        <div className="space-y-3">
          {form.produits.map((p, i) => (
            <div key={p.id} className="bg-[#0b0f14] border border-white/5 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-400 text-xs font-medium">Produit {i + 1}</span>
                <button type="button" onClick={() => removeProduit(p.id)}
                  className="text-red-400 hover:text-red-300 transition-colors">
                  <Trash2 size={15} />
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="sm:col-span-2">
                  <input className={input} value={p.nom}
                    onChange={e => updateProduit(p.id, 'nom', e.target.value)}
                    placeholder="Nom du produit *" />
                </div>
                <div>
                  <input type="number" min="0" className={input} value={p.prix || ''}
                    onChange={e => updateProduit(p.id, 'prix', parseInt(e.target.value) || 0)}
                    placeholder="Prix (F CFA)" />
                </div>
                <div className="flex items-center gap-2">
                  <input id={`dispo-${p.id}`} type="checkbox"
                    checked={p.disponible}
                    onChange={e => updateProduit(p.id, 'disponible', e.target.checked)}
                    className="w-4 h-4 accent-[#ffc800]" />
                  <label htmlFor={`dispo-${p.id}`} className="text-gray-400 text-sm cursor-pointer whitespace-nowrap">
                    Disponible
                  </label>
                </div>
                <div className="sm:col-span-4">
                  <input className={input} value={p.description ?? ''}
                    onChange={e => updateProduit(p.id, 'description', e.target.value)}
                    placeholder="Description courte (optionnel)" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Boutons ──────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4 pb-8">
        <button
          type="button"
          onClick={() => router.push('/admin/cantines')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft size={16} /> Annuler
        </button>
        <button
          type="submit"
          disabled={saving || saved}
          className="flex items-center gap-2 bg-[#0a6342] hover:bg-[#0e7d52] disabled:opacity-60 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-[#0a6342]/25"
        >
          {saving ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : saved ? (
            '✅ Enregistré !'
          ) : (
            <><Save size={16} /> {isEdit ? 'Enregistrer les modifications' : 'Créer la cantine'}</>
          )}
        </button>
      </div>
    </form>
  );
}
