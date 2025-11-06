// src/app/not-found.tsx

import Link from "next/link";
import { Metadata } from "next";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Página Não Encontrada | Squadra",
};

// 🎯 CORREÇÃO 1: Adicione 'async' ao componente
export default async function NotFound() {
  // 🎯 CORREÇÃO 2: A chamada à função 'headers()' deve ser resolvida com 'await'
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "rota desconhecida";

  return (
    // ... (restante do JSX) ...
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-8 text-white">
      <h1 className="text-7xl font-extrabold text-blue-500 mb-4">404</h1>

      <h2 className="text-3xl font-semibold mb-3">
        Ops! Esta página está em manutenção.
      </h2>

      <p className="text-gray-400 mb-6 max-w-lg text-center">
        O recurso solicitado ({pathname}) não foi encontrado ou ainda está sendo
        construído.
      </p>

      <Link href="/" passHref>
        <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-xl hover:bg-indigo-500 transition duration-300 mt-4">
          Voltar para a Home
        </button>
      </Link>
    </div>
  );
}
