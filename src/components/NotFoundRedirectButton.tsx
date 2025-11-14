// src/components/NotFoundRedirectButton.tsx

"use client"; // CRÍTICO: Indica que este é um Client Component

import { useSession } from "next-auth/react";
import Link from "next/link";

function NotFoundRedirectButton() {
  const { status } = useSession();

  // Define a rota: /dashboard se logado, / se deslogado
  const targetRoute = status === "authenticated" ? "/dashboard" : "/";

  // Texto do botão que muda
  const buttonText =
    status === "authenticated" ? "Ir para o Dashboard" : "Voltar para a Home";

  // O que renderizar enquanto o status está sendo verificado
  if (status === "loading") {
    return (
      <div className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-xl mt-4 cursor-wait">
        Aguarde...
      </div>
    );
  }

  return (
    <Link href={targetRoute} passHref>
      <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-xl hover:bg-indigo-500 transition duration-300 mt-4">
        {buttonText}
      </button>
    </Link>
  );
}

export default NotFoundRedirectButton;
