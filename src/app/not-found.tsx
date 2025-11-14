// src/app/not-found.tsx

// 🛑 REMOVER: import Link from "next/link";
import { Metadata } from "next";
import NotFoundRedirectButton from "@/components/NotFoundRedirectButton"; // 🎯 NOVO IMPORT

export const metadata: Metadata = {
  title: "Página Não Encontrada | Squadra",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-8 text-white">
      <h1 className="text-7xl font-extrabold text-blue-500 mb-4">404</h1>

      <h2 className="text-3xl font-semibold mb-3">
        Ops! Esta página está em manutenção.
      </h2>

      <p className="text-gray-400 mb-6 max-w-lg text-center">
        O recurso solicitado não foi encontrado ou ainda está sendo construído.
      </p>

      {/* 🎯 CORREÇÃO: Usamos o componente dinâmico aqui */}
      <NotFoundRedirectButton />
    </div>
  );
}
