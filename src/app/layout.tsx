// src/app/layout.tsx

import type { Metadata } from "next";
import "./globals.css"; // Importa seu CSS global e as diretivas do Tailwind

import SessionProvider from "./providers/SessionProvider"; // Importe o provedor cliente

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-neutral-950 text-white antialiased min-h-screen">
        {/* 🎯 A CORREÇÃO: O SessionProvider deve envolver todo o conteúdo */}
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
