import AuthGuard from "@/components/AuthGuard";
import Sidebar from "@/components/Sidebar"; // O componente Sidebar que você irá criar

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 1. 🛡️ PROTEÇÃO: Envolve a área principal com o guarda de autenticação
    <AuthGuard>
      {/* 2. LAYOUT: Flexbox para Sidebar + Conteúdo */}
      <div className="flex min-h-screen">
        {/* Sidebar: Fixa e Larga (ex: w-64) */}
        <Sidebar />

        {/* Área Principal/Conteúdo: Ocupa o resto da tela (flex-1) */}
        <main className="flex-1 p-8 overflow-y-auto">
          {children} {/* Aqui entra o conteúdo da página dashboard/page.tsx */}
        </main>
      </div>
    </AuthGuard>
  );
}
