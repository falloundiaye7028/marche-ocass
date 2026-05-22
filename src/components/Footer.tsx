import Link from "next/link";
import { Store, Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ background: "#042c1d", color: "#7dcfaa" }}>
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Logo & desc */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#ffc800,#ff7a2a)" }}>
              <Store size={22} className="text-gray-900" />
            </div>
            <div>
              <div className="font-black text-white text-lg leading-none" style={{ fontFamily: "'Syne',sans-serif" }}>MARCHÉ</div>
              <div className="font-black text-xs tracking-widest" style={{ color: "#ffc800" }}>OCASS</div>
            </div>
          </div>
          <p className="text-sm leading-relaxed mb-5" style={{ color: "#45b485" }}>
            Le premier portail commercial de Touba — cantines en ligne, produits locaux et services pour la communauté mouride.
          </p>
          <div className="flex gap-3">
            {[
              { icon: <Facebook size={16} />, href: "https://web.facebook.com/agencetoubavisuel/" },
              { icon: <Instagram size={16} />, href: "#" },
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white transition-colors"
                style={{ background: "#0a6342" }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Marketplace */}
        <div>
          <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Marketplace</h3>
          <ul className="space-y-2.5 text-sm">
            {[
              { href: "/cantines", label: "Toutes les cantines" },
              { href: "/produits", label: "Tous les produits" },
              { href: "/categories", label: "Catégories" },
              { href: "/ouvrir-cantine", label: "Ouvrir ma cantine" },
              { href: "/#tarifs", label: "Tarifs & abonnements" },
              { href: "/#pub-boost", label: "Promotion PUB BOOST" },
            ].map(item => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-or-400 transition-colors" style={{ color: "#45b485" }}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Infos vendeur */}
        <div>
          <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Vendeurs</h3>
          <ul className="space-y-2.5 text-sm">
            {[
              { href: "/ouvrir-cantine", label: "Comment ouvrir une cantine" },
              { href: "/#tarifs", label: "Plan STARTER — 5 000F" },
              { href: "/#tarifs", label: "Plan PRO — 10 000F" },
              { href: "/#pub-boost", label: "Pub via réseaux ATV" },
              { href: "/faq", label: "FAQ vendeurs" },
            ].map(item => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-or-400 transition-colors" style={{ color: "#45b485" }}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={15} className="flex-shrink-0 mt-0.5" style={{ color: "#ffc800" }} />
              <span style={{ color: "#45b485" }}>Touba, Sénégal<br />Quartier Darou Khoudoss</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={15} style={{ color: "#ffc800" }} />
              <a href="tel:+221768001717" className="hover:text-or-400 transition-colors" style={{ color: "#45b485" }}>
                +221 76 800 17 17
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={15} style={{ color: "#ffc800" }} />
              <a href="https://wa.me/221768001717" target="_blank" className="hover:text-or-400 transition-colors" style={{ color: "#45b485" }}>
                WhatsApp
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={15} style={{ color: "#ffc800" }} />
              <a href="mailto:toubavisuel@gmail.com" className="hover:text-or-400 transition-colors" style={{ color: "#45b485" }}>
                toubavisuel@gmail.com
              </a>
            </li>
          </ul>

          <div className="mt-5">
            <p className="text-white text-xs font-semibold mb-2">Paiements acceptés</p>
            <div className="flex flex-wrap gap-2">
              {["Wave", "Orange Money", "Free Money", "Espèces"].map(m => (
                <span key={m} className="text-xs px-2 py-1 rounded" style={{ background: "#0a6342", color: "#7dcfaa" }}>
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t" style={{ borderColor: "#07402b" }}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs" style={{ color: "#0e7d52" }}>
          <span>© {new Date().getFullYear()} MARCHÉ OCASS — Propulsé par <a href="https://touba-visuel.vercel.app" className="hover:text-or-400" style={{ color: "#1d9c68" }}>Agence Touba Visuel</a></span>
          <span>Touba, Sénégal 🇸🇳</span>
        </div>
      </div>
    </footer>
  );
}
