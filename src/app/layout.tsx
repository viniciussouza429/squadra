// src/app/layout.tsx

import type { Metadata } from "next";
import "./globals.css"; // Importa seu CSS global e as diretivas do Tailwind
import Header from "@/components/Header"; // Importa o componente que acabamos de criar

export const metadata: Metadata = {
  title: "Squadra - Gerenciamento Inteligente de Equipes",
  description: "Organize, gerencie e impulsione sua produtividade.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      {/* Aplica o fundo escuro globalmente e o texto branco padrão */}
      <body className="bg-gray-900 text-white antialiased">
        {/* 1. O Header persiste em todas as páginas */}
        <Header />

        {/* 2. A tag main injeta o conteúdo da página (Home, Dashboard, etc.) */}
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
