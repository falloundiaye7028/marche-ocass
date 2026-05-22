"use client";

import { useState } from "react";
import Link from "next/link";
import { Store, Menu, X, ShoppingBag, Phone, Search, ChevronDown } from "lucide-react";

const NAV = [
  { href: "/", label: "Accueil" },
  { href: "/cantines", label: "Cantines" },
  { href: "/produits", label: "Produits" },
  { href: "/categories", label: "Catégories" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <header className="sticky top-0 z-50 shadow-lg" style={{ background: "#07402b" }}>
      {/* Barre supérieure */}
      <div className="hidden md:block" style={{ background: "#042c1d" }}>
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex justify-between items-center text-xs" style={{ color: "#7dcfaa" }}>
          <span className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Phone size={11} /> +221 76 800 17 17</span>
            <span>Paiement : Wave · Orange Money · Espèces</span>
          </span>
          <span style={{ color: "#ffc800" }}>🏪 240+ cantines actives · 3 800+ produits</span>
        </div>
      </div>

      {/* Nav principale */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm"
              style={{ background: "linear-gradient(135deg,#ffc800,#ff7a2a)" }}
            >
              <Store size={20} className="text-gray-900" />
            </div>
            <div className="leading-tight">
              <div className="font-black text-white text-base tracking-wide" style={{ fontFamily: "'Syne',sans-serif" }}>
                MARCHÉ
              </div>
              <div className="font-black text-xs tracking-widest" style={{ color: "#ffc800" }}>
                OCASS
              </div>
            </div>
          </Link>

          {/* Barre de recherche centrale */}
          <div className="hidden md:flex flex-1 max-w-lg relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher un produit, une cantine..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-or-400"
            />
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map(n => (
              <Link key={n.href} href={n.href}
                className="text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
                style={{ color: "#b3e5c8" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#ffc800")}
                onMouseLeave={e => (e.currentTarget.style.color = "#b3e5c8")}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/ouvrir-cantine"
              className="btn-gold text-sm px-4 py-2 whitespace-nowrap"
            >
              <Store size={15} />
              Ouvrir ma cantine
            </Link>
          </div>

          {/* Mobile menu btn */}
          <button onClick={() => setOpen(!open)} className="md:hidden text-white p-2">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {open && (
        <div className="md:hidden border-t px-4 py-4" style={{ background: "#07402b", borderColor: "#0a6342" }}>
          {/* Recherche mobile */}
          <div className="relative mb-4">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm text-gray-900 focus:outline-none"
            />
          </div>
          <nav className="flex flex-col gap-1 mb-4">
            {NAV.map(n => (
              <Link key={n.href} href={n.href}
                className="py-2.5 font-medium text-base border-b"
                style={{ color: "#b3e5c8", borderColor: "#0a6342" }}
                onClick={() => setOpen(false)}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <Link href="/ouvrir-cantine"
            className="btn-gold w-full justify-center py-3 text-base"
            onClick={() => setOpen(false)}
          >
            <Store size={18} />
            Ouvrir ma cantine — 5 000F/mois
          </Link>
        </div>
      )}
    </header>
  );
}
