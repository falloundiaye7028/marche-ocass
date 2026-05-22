'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminNav from '@/components/admin/AdminNav';
import CantineForm from '@/components/admin/CantineForm';
import { isAuth } from '@/lib/store';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NouvelleCantine() {
  const router = useRouter();

  useEffect(() => {
    if (!isAuth()) router.replace('/admin');
  }, [router]);

  return (
    <div className="flex min-h-screen">
      <AdminNav />

      <main className="flex-1 lg:ml-60 p-6 lg:p-8">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="flex items-center gap-4 mb-8 mt-10 lg:mt-0">
            <Link
              href="/admin/cantines"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-2xl font-black text-white">Nouvelle cantine</h1>
              <p className="text-gray-500 text-sm">Créer un nouveau vendeur sur MARCHÉ OCASS</p>
            </div>
          </div>

          <CantineForm />
        </div>
      </main>
    </div>
  );
}
