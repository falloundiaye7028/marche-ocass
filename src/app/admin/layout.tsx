import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin — MARCHÉ OCASS',
  robots: { index: false, follow: false },
};

/**
 * L'admin se pose en overlay fixe (z-9999) pour masquer
 * complètement le Header / Footer du site principal.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#0b0f14] overflow-y-auto text-white">
      {children}
    </div>
  );
}
