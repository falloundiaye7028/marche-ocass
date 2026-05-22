'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { checkPassword, setAuth, isAuth } from '@/lib/store';
import { Lock, Eye, EyeOff, Store } from 'lucide-react';

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuth()) router.replace('/admin/dashboard');
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 500));
    if (checkPassword(password)) {
      setAuth();
      router.push('/admin/dashboard');
    } else {
      setError('Mot de passe incorrect. Réessayez.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Background déco */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#0a6342]/20 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#0a6342] rounded-3xl mb-5 shadow-lg shadow-[#0a6342]/30">
            <Store size={38} className="text-[#ffc800]" />
          </div>
          <h1 className="text-3xl font-black tracking-tight">
            MARCHÉ <span className="text-[#ffc800]">OCASS</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">Espace Administration</p>
        </div>

        {/* Card */}
        <div className="bg-[#141a22] border border-white/5 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
            <Lock size={18} className="text-[#ffc800]" />
            Connexion sécurisée
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-gray-400 text-sm font-medium block mb-2">
                Mot de passe admin
              </label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  className="w-full bg-[#0b0f14] text-white border border-white/10 rounded-xl px-4 py-3.5 pr-12
                             focus:outline-none focus:border-[#ffc800]/50 focus:ring-1 focus:ring-[#ffc800]/20
                             placeholder:text-gray-600 transition-all"
                  required
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShow(s => !s)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3">
                <span>⚠️</span> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full bg-[#0a6342] hover:bg-[#0e7d52] disabled:opacity-40 disabled:cursor-not-allowed
                         text-white font-bold py-3.5 rounded-xl transition-all duration-200
                         flex items-center justify-center gap-2 shadow-lg shadow-[#0a6342]/25"
            >
              {loading
                ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : 'Accéder au tableau de bord →'
              }
            </button>
          </form>
        </div>

        <p className="text-center text-gray-700 text-xs mt-6">
          Portail Commercial de Touba · MARCHÉ OCASS
        </p>
      </div>
    </div>
  );
}
