'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Store, LayoutDashboard, ShoppingBag, LogOut, Menu, X, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { clearAuth } from '@/lib/store';

const nav = [
  { href: '/admin/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
  { href: '/admin/cantines',  label: 'Cantines',         icon: ShoppingBag      },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router   = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = () => { clearAuth(); router.push('/admin'); };

  const Sidebar = () => (
    <aside className="h-full flex flex-col bg-[#0f151c] border-r border-white/5">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#0a6342] rounded-xl flex items-center justify-center flex-shrink-0">
            <Store size={18} className="text-[#ffc800]" />
          </div>
          <div>
            <div className="text-white font-black text-sm leading-none">MARCHÉ OCASS</div>
            <div className="text-gray-500 text-xs mt-0.5">Administration</div>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 p-3 space-y-1">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all
                ${active
                  ? 'bg-[#0a6342] text-white shadow-lg shadow-[#0a6342]/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <Icon size={17} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-white/5 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-all"
        >
          <ExternalLink size={17} />
          Voir le site
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-all w-full"
        >
          <LogOut size={17} />
          Déconnexion
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:block fixed top-0 left-0 h-full w-60 z-30">
        <Sidebar />
      </div>

      {/* Mobile toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#0f151c] border border-white/10 rounded-xl p-2.5 text-white"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile drawer */}
      {open && (
        <>
          <div className="lg:hidden fixed inset-0 bg-black/60 z-40" onClick={() => setOpen(false)} />
          <div className="lg:hidden fixed top-0 left-0 h-full w-64 z-50">
            <Sidebar />
          </div>
        </>
      )}
    </>
  );
}
