import AuthGuard from "@/components/AuthGuard";
import MobileDashboardNav from "@/components/MobileDashboardNav";
import Sidebar from "@/components/Sidebar"; // O componente Sidebar que você irá criar

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen">
        <Sidebar /> {/* Versão Desktop (lg:flex) */}
        <div className="flex-1 flex flex-col">
          {/* 1. Header Mobile (o componente que você criou) */}
          <MobileDashboardNav />

          {/* 2. CONTEÚDO PRINCIPAL (Aplique o padding-top aqui) */}
          <main className="flex-1 p-8 overflow-y-auto lg:p-8 pt-16">
            {/* 👆 Adicionei lg:p-8 para redefinir o padding no desktop e pt-16 para mobile */}
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
